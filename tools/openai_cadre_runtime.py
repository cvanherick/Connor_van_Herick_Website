#!/usr/bin/env python3
"""Low-cost Cadre team-of-teams runtime using the OpenAI Responses API.

Each Cadre role receives a configurable swarm of cheap independent workers.
Workers propose answers, critique peer reports in debate rounds, and hand a
reconciled result to a team head. Team heads can then report to a final lead.

The runner uses only Python's standard library. Set OPENAI_API_KEY before use.
"""

from __future__ import annotations

import argparse
import json
import os
import sys
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from dataclasses import asdict, dataclass
from typing import Iterable
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen


DEFAULT_BASE_URL = os.environ.get("OPENAI_BASE_URL", "https://api.openai.com/v1")
DEFAULT_WORKER_MODEL = os.environ.get("OPENAI_WORKER_MODEL", "gpt-5-mini")
DEFAULT_HEAD_MODEL = os.environ.get("OPENAI_HEAD_MODEL", DEFAULT_WORKER_MODEL)
DEFAULT_FINAL_MODEL = os.environ.get("OPENAI_FINAL_MODEL", DEFAULT_HEAD_MODEL)
DEFAULT_TEAM_CONCURRENCY = 5
DEFAULT_WORKERS_PER_TEAM = 3
DEFAULT_DEBATE_ROUNDS = 1
PERSPECTIVES = (
    ("analyst", "Gather evidence, identify assumptions, and explain the strongest options."),
    ("critic", "Challenge weak reasoning, surface risks, and identify what could fail."),
    ("implementer", "Turn the role mission into concrete, testable actions and deliverables."),
)
WORKER_MODES = ("analyst", "skeptic", "alternative", "evidence", "implementer", "red-team", "synthesizer", "edge-case")
CADRE_ROLES = (
    "Product Lead", "Research Lead", "Architecture Lead", "Design Lead",
    "Plan / Delivery Lead", "Builder A", "Builder B", "Critic", "QA", "Integrator",
)


@dataclass(frozen=True)
class WorkerResult:
    role: str
    perspective: str
    response: str


def response_text(payload: dict) -> str:
    """Extract text from a Responses API payload without requiring the SDK."""
    if payload.get("output_text"):
        return payload["output_text"].strip()
    chunks: list[str] = []
    for item in payload.get("output", []):
        for content in item.get("content", []):
            if content.get("type") in {"output_text", "text"} and content.get("text"):
                chunks.append(content["text"])
    return "\n".join(chunks).strip()


def call_openai(api_key: str, base_url: str, model: str, prompt: str, max_output_tokens: int = 700) -> str:
    payload = json.dumps({
        "model": model,
        "input": prompt,
        "max_output_tokens": max_output_tokens,
        "store": False,
    }).encode("utf-8")
    request = Request(
        f"{base_url.rstrip('/')}/responses",
        data=payload,
        headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"},
        method="POST",
    )
    for attempt in range(4):
        try:
            with urlopen(request, timeout=180) as response:
                body = json.loads(response.read().decode("utf-8"))
            text = response_text(body)
            if not text:
                raise RuntimeError("OpenAI returned no text output.")
            return text
        except HTTPError as error:
            if error.code not in {429, 500, 502, 503, 504} or attempt == 3:
                details = error.read().decode("utf-8", errors="replace")
                raise RuntimeError(f"OpenAI request failed ({error.code}): {details[:500]}") from error
        except (URLError, TimeoutError) as error:
            if attempt == 3:
                raise RuntimeError(f"Could not reach OpenAI: {error}") from error
        time.sleep(2 ** attempt)
    raise RuntimeError("OpenAI request failed after retries.")


def worker_prompt(goal: str, role: str, worker_id: int, mode: str, guidance: str) -> str:
    return f"""You are worker {worker_id} ({mode}) on the {role} team in a Cadre delivery pipeline.

Shared goal:
{goal}

Role mission:
{guidance}

Work independently. Do not claim actions or evidence you do not have. Return:
1. Evidence or assumptions
2. Findings
3. Concrete recommendations
4. Open questions or risks
Keep the handoff concise."""


def debate_prompt(goal: str, role: str, worker: WorkerResult, peers: Iterable[WorkerResult]) -> str:
    reports = "\n\n".join(f"--- worker {item.perspective} ---\n{item.response}" for item in peers)
    return f"""You are {worker.perspective} on the {role} team.

Shared goal:
{goal}

Your first proposal:
{worker.response}

Peer proposals:
{reports}

Argue with the peers: identify one agreement, one disagreement, and one concrete
revision. Return a revised recommendation that preserves uncertainty and does not
invent evidence."""


def team_prompt(goal: str, role: str, results: Iterable[WorkerResult]) -> str:
    evidence = "\n\n".join(f"--- {item.perspective} ---\n{item.response}" for item in results)
    return f"""You are the lead synthesizer for the {role} team.

Shared goal:
{goal}

Three team members reported:
{evidence}

Synthesize one handoff with agreed findings, disagreements, uncertainty,
prioritized recommendations, and acceptance criteria for the integrator.
Do not invent evidence absent from the reports."""


def run_team(
    goal: str,
    role: str,
    api_key: str,
    base_url: str,
    worker_model: str,
    head_model: str,
    workers_per_team: int,
    debate_rounds: int,
) -> tuple[list[WorkerResult], str]:
    if workers_per_team < 1 or debate_rounds < 0:
        raise ValueError("workers_per_team must be positive and debate_rounds cannot be negative.")
    results: list[WorkerResult] = []
    with ThreadPoolExecutor(max_workers=workers_per_team) as pool:
        futures = {
            pool.submit(
                call_openai,
                api_key,
                base_url,
                worker_model,
                worker_prompt(goal, role, worker_id, mode, PERSPECTIVES[worker_id % len(PERSPECTIVES)][1]),
            ): f"{worker_id}:{mode}"
            for worker_id, mode in enumerate((WORKER_MODES[i % len(WORKER_MODES)] for i in range(workers_per_team)), start=1)
        }
        for future in as_completed(futures):
            results.append(WorkerResult(role, futures[future], future.result()))
    results.sort(key=lambda item: item.perspective)
    for _ in range(debate_rounds):
        with ThreadPoolExecutor(max_workers=workers_per_team) as pool:
            futures = {
                pool.submit(call_openai, api_key, base_url, worker_model, debate_prompt(goal, role, worker, [peer for peer in results if peer != worker])): worker
                for worker in results
            }
            results = [WorkerResult(role, worker.perspective, future.result()) for future, worker in ((future, futures[future]) for future in as_completed(futures))]
        results.sort(key=lambda item: item.perspective)
    handoff = call_openai(api_key, base_url, head_model, team_prompt(goal, role, results), max_output_tokens=900)
    return results, handoff


def run_teams(
    goal: str,
    roles: Iterable[str],
    api_key: str,
    base_url: str,
    worker_model: str,
    head_model: str,
    team_concurrency: int,
    workers_per_team: int,
    debate_rounds: int,
) -> tuple[dict, dict[str, str]]:
    role_list = list(roles)
    if not role_list:
        raise ValueError("At least one role is required.")
    if team_concurrency < 1:
        raise ValueError("team_concurrency must be at least 1.")
    outputs: dict[str, dict] = {}
    handoffs: dict[str, str] = {}
    with ThreadPoolExecutor(max_workers=min(team_concurrency, len(role_list))) as pool:
        futures = {
            pool.submit(run_team, goal, role, api_key, base_url, worker_model, head_model, workers_per_team, debate_rounds): role
            for role in role_list
        }
        for future in as_completed(futures):
            role = futures[future]
            workers, handoff = future.result()
            outputs[role] = {"workers": [asdict(worker) for worker in workers], "handoff": handoff}
            handoffs[role] = handoff
    return {role: outputs[role] for role in role_list}, {role: handoffs[role] for role in role_list}


def final_prompt(goal: str, handoffs: dict[str, str]) -> str:
    reports = "\n\n".join(f"--- {role} ---\n{handoff}" for role, handoff in handoffs.items())
    return f"""You are the Cadre Integrator.

Shared goal:
{goal}

Role-team handoffs:
{reports}

Produce the final integrated plan with outcome, prioritized work, dependencies,
risks, verification, and immediate next actions. Preserve disagreement and uncertainty."""


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--goal", required=True)
    parser.add_argument("--worker-model", default=DEFAULT_WORKER_MODEL, help=f"Low-cost worker model (default: {DEFAULT_WORKER_MODEL})")
    parser.add_argument("--head-model", default=DEFAULT_HEAD_MODEL, help=f"Team-head model (default: {DEFAULT_HEAD_MODEL})")
    parser.add_argument("--final-model", default=DEFAULT_FINAL_MODEL, help=f"Final-lead model (default: {DEFAULT_FINAL_MODEL})")
    parser.add_argument("--base-url", default=DEFAULT_BASE_URL)
    parser.add_argument("--roles", nargs="+", choices=CADRE_ROLES, default=list(CADRE_ROLES))
    parser.add_argument("--team-concurrency", type=int, default=DEFAULT_TEAM_CONCURRENCY)
    parser.add_argument("--workers-per-team", type=int, default=DEFAULT_WORKERS_PER_TEAM)
    parser.add_argument("--debate-rounds", type=int, default=DEFAULT_DEBATE_ROUNDS)
    parser.add_argument("--output")
    parser.add_argument("--no-final", action="store_true")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        raise SystemExit("OPENAI_API_KEY is required; it is never written to output files.")
    print(f"Running {len(args.roles)} teams × {args.workers_per_team} workers with {args.debate_rounds} debate rounds and {args.team_concurrency} teams concurrently.", file=sys.stderr)
    teams, handoffs = run_teams(args.goal, args.roles, api_key, args.base_url, args.worker_model, args.head_model, args.team_concurrency, args.workers_per_team, args.debate_rounds)
    final = None if args.no_final else call_openai(api_key, args.base_url, args.final_model, final_prompt(args.goal, handoffs), max_output_tokens=1200)
    output = {"goal": args.goal, "worker_model": args.worker_model, "head_model": args.head_model, "final_model": args.final_model, "workers_per_team": args.workers_per_team, "debate_rounds": args.debate_rounds, "teams": teams, "final": final}
    rendered = json.dumps(output, indent=2, ensure_ascii=False)
    if args.output:
        with open(args.output, "w", encoding="utf-8") as file:
            file.write(rendered + "\n")
        print(f"Wrote {args.output}", file=sys.stderr)
    else:
        print(rendered)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
