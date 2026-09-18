#!/usr/bin/env python3
"""Runtime team-of-teams orchestration for a local Ollama server.

Each Cadre role receives three independent Ollama workers: an analyst, a critic,
and an implementation-minded reviewer. Their outputs are synthesized into one
role handoff, then all role handoffs can be synthesized into a final report.

This file uses Ollama's local HTTP API and only Python's standard library.
"""

from __future__ import annotations

import argparse
import json
import os
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed
from dataclasses import asdict, dataclass
from typing import Iterable
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen


DEFAULT_HOST = os.environ.get("OLLAMA_HOST", "http://127.0.0.1:11434")
DEFAULT_WORKER_MODEL = os.environ.get("OLLAMA_WORKER_MODEL", "llama3.2:1b")
DEFAULT_SYNTHESIS_MODEL = os.environ.get("OLLAMA_SYNTHESIS_MODEL", "qwen3:8b")
DEFAULT_TEAM_CONCURRENCY = 3

CADRE_ROLES = (
    "Product Lead",
    "Research Lead",
    "Architecture Lead",
    "Design Lead",
    "Plan / Delivery Lead",
    "Builder A",
    "Builder B",
    "Critic",
    "QA",
    "Integrator",
)

PERSPECTIVES = (
    ("analyst", "Gather evidence, identify assumptions, and explain the strongest options."),
    ("critic", "Challenge weak reasoning, surface risks, and identify what could fail."),
    ("implementer", "Turn the role's mission into concrete, testable actions and deliverables."),
)


@dataclass(frozen=True)
class WorkerResult:
    role: str
    perspective: str
    response: str


def call_ollama(host: str, model: str, prompt: str, temperature: float = 0.2, num_ctx: int = 2048) -> str:
    """Call one non-streaming Ollama chat completion."""
    payload = json.dumps(
        {
            "model": model,
            "messages": [{"role": "user", "content": prompt}],
            "stream": False,
            "options": {"temperature": temperature, "num_ctx": num_ctx},
            "keep_alive": "10m",
        }
    ).encode("utf-8")
    request = Request(
        f"{host.rstrip('/')}/api/chat",
        data=payload,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urlopen(request, timeout=600) as response:
            body = json.loads(response.read().decode("utf-8"))
    except (HTTPError, URLError, TimeoutError) as error:
        raise RuntimeError(
            f"Could not reach Ollama at {host}. Start Ollama and verify the model "
            f"'{model}' is installed. Details: {error}"
        ) from error
    return body.get("message", {}).get("content", "").strip()


def worker_prompt(goal: str, role: str, perspective: str, guidance: str) -> str:
    return f"""You are the {perspective} member of the {role} team in a Cadre delivery pipeline.

Shared goal:
{goal}

Your role mission:
{guidance}

Work independently. Do not claim to have performed actions you cannot perform. Return:
1. Evidence or assumptions
2. Findings
3. Concrete recommendations
4. Open questions or risks
Keep the handoff concise and useful to a senior integrator."""


def team_prompt(goal: str, role: str, results: Iterable[WorkerResult]) -> str:
    evidence = "\n\n".join(
        f"--- {item.perspective} ---\n{item.response}" for item in results
    )
    return f"""You are the lead synthesizer for the {role} team.

Shared goal:
{goal}

Three team members reported:
{evidence}

Synthesize one handoff with:
- agreed findings
- disagreements and uncertainty
- prioritized recommendations
- acceptance criteria for the integrator
Do not invent evidence that is absent from the reports."""


def run_team(
    goal: str,
    role: str,
    host: str,
    worker_model: str,
    synthesis_model: str,
) -> tuple[list[WorkerResult], str]:
    results: list[WorkerResult] = []
    with ThreadPoolExecutor(max_workers=3) as pool:
        futures = {
            pool.submit(
                call_ollama,
                host,
                worker_model,
                worker_prompt(goal, role, perspective, guidance),
            ): (perspective, guidance)
            for perspective, guidance in PERSPECTIVES
        }
        for future in as_completed(futures):
            perspective, _ = futures[future]
            results.append(WorkerResult(role, perspective, future.result()))
    results.sort(key=lambda item: item.perspective)
    handoff = call_ollama(host, synthesis_model, team_prompt(goal, role, results))
    return results, handoff


def run_teams(
    goal: str,
    roles: Iterable[str],
    host: str,
    worker_model: str,
    synthesis_model: str,
    team_concurrency: int = DEFAULT_TEAM_CONCURRENCY,
) -> tuple[dict[str, dict[str, object]], dict[str, str]]:
    """Run multiple role teams in parallel with a configurable concurrency limit."""
    role_list = list(roles)
    if not role_list:
        raise ValueError("At least one role is required.")
    if team_concurrency < 1:
        raise ValueError("team_concurrency must be at least 1.")

    team_outputs: dict[str, dict[str, object]] = {}
    handoffs: dict[str, str] = {}
    with ThreadPoolExecutor(max_workers=min(team_concurrency, len(role_list))) as pool:
        futures = {
            pool.submit(run_team, goal, role, host, worker_model, synthesis_model): role
            for role in role_list
        }
        for future in as_completed(futures):
            role = futures[future]
            workers, handoff = future.result()
            team_outputs[role] = {
                "workers": [asdict(worker) for worker in workers],
                "handoff": handoff,
            }
            handoffs[role] = handoff
    return (
        {role: team_outputs[role] for role in role_list},
        {role: handoffs[role] for role in role_list},
    )


def final_prompt(goal: str, handoffs: dict[str, str]) -> str:
    reports = "\n\n".join(f"--- {role} ---\n{handoff}" for role, handoff in handoffs.items())
    return f"""You are the Cadre Integrator.

Shared goal:
{goal}

Role-team handoffs:
{reports}

Produce the final integrated plan. Preserve important disagreement and uncertainty.
Include:
1. Outcome and definition of done
2. Prioritized work items
3. Dependencies and stage gates
4. Risks and mitigations
5. Verification plan
6. Immediate next actions
"""


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--goal", required=True, help="Shared goal for every team.")
    parser.add_argument("--worker-model", default=DEFAULT_WORKER_MODEL, help=f"Fast model for the 3 workers per role (default: {DEFAULT_WORKER_MODEL})")
    parser.add_argument("--synthesis-model", default=DEFAULT_SYNTHESIS_MODEL, help=f"Model for team/final synthesis (default: {DEFAULT_SYNTHESIS_MODEL})")
    parser.add_argument("--host", default=DEFAULT_HOST, help=f"Ollama host (default: {DEFAULT_HOST})")
    parser.add_argument("--roles", nargs="+", choices=CADRE_ROLES, default=list(CADRE_ROLES))
    parser.add_argument("--team-concurrency", type=int, default=DEFAULT_TEAM_CONCURRENCY, help=f"Number of role teams to run concurrently (default: {DEFAULT_TEAM_CONCURRENCY})")
    parser.add_argument("--output", help="Optional JSON output path.")
    parser.add_argument("--no-final", action="store_true", help="Skip the final cross-team synthesis.")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    print(f"Running {len(args.roles)} teams × 3 Ollama workers ({args.worker_model}), with {args.team_concurrency} teams concurrently.", file=sys.stderr)
    team_outputs, handoffs = run_teams(
        args.goal,
        args.roles,
        args.host,
        args.worker_model,
        args.synthesis_model,
        args.team_concurrency,
    )

    final = None if args.no_final else call_ollama(args.host, args.synthesis_model, final_prompt(args.goal, handoffs))
    output = {"goal": args.goal, "worker_model": args.worker_model, "synthesis_model": args.synthesis_model, "teams": team_outputs, "final": final}
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
