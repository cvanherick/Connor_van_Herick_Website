// A small, illustrative scenario grounded in Desktop/cadre-bootstrap/team.yaml.
// This is presentation data; it does not load that local folder or dispatch agents.
export type CadreMode = 'product-development' | 'advisory'

export interface CadreStage {
  name: string
  title: string
  summary: string
  artifact: string
  agents: string[]
  parallel: boolean
  reviewGate?: string
}

export interface CadreWorkflow {
  label: string
  orchestrator: string
  goal: string
  outcome: string
  humanGate: string
  stages: CadreStage[]
}

export const cadreWorkflows: Record<CadreMode, CadreWorkflow> = {
  'product-development': {
    label: 'Product development',
    orchestrator: 'Product Owner',
    goal: 'Build an accessible analytics feature from a user need.',
    outcome: 'A reviewed change and validation findings, ready for a human decision.',
    humanGate: 'Human review remains required before a change is treated as approved or shipped.',
    stages: [
      { name: 'discovery', title: 'Discover', summary: 'Frame the user need and gather evidence before committing to a solution.', artifact: 'Opportunity brief', agents: ['Product Owner', 'Market Research Analyst', 'User Researcher', 'Enterprise Customer', 'Indie Developer', 'UX Designer'], parallel: false },
      { name: 'requirements', title: 'Define', summary: 'Turn the brief into requirements, acceptance criteria, and delivery scope.', artifact: 'Acceptance criteria', agents: ['Product Owner', 'Technical Writer', 'User Researcher', 'Enterprise Customer', 'Indie Developer', 'QA Engineer', 'Delivery Manager'], parallel: false },
      { name: 'architecture', title: 'Architect', summary: 'Resolve system boundaries, data needs, and technical tradeoffs.', artifact: 'System plan', agents: ['Technical Architect', 'Product Owner', 'ML Engineer', 'Data Platform Engineer', 'SRE Platform Engineer', 'Database Engineer'], parallel: false },
      { name: 'design', title: 'Design', summary: 'Specify the interaction and make the experience testable.', artifact: 'Interaction spec', agents: ['UX Designer', 'Product Owner'], parallel: false },
      { name: 'implementation', title: 'Build', summary: 'Specialists implement independent parts of the agreed plan.', artifact: 'Working change', agents: ['Backend Engineer', 'Frontend Engineer', 'AI Dev Expert', 'ML Engineer', 'Data Platform Engineer', 'Mobile Engineer', 'TypeScript Engineer', 'Systems Engineer'], parallel: true },
      { name: 'review', title: 'Review', summary: 'Challenge the change for correctness, quality, security, and operability.', artifact: 'Review findings', agents: ['Security Engineer', 'DevOps Engineer', 'AI Dev Expert', 'QA Engineer', 'Technical Writer', 'SRE Platform Engineer', 'Database Engineer', 'Mobile Engineer', 'TypeScript Engineer', 'Systems Engineer'], parallel: true, reviewGate: 'Technical Architect and QA review every PR. Other specialists join when the change calls for them.' },
      { name: 'validation', title: 'Validate', summary: 'Check the result against user and product expectations.', artifact: 'Acceptance findings', agents: ['Enterprise Customer', 'Indie Developer', 'Product Owner'], parallel: true },
      { name: 'retrospective', title: 'Learn', summary: 'Capture what worked, what failed, and what should change next.', artifact: 'Retrospective', agents: ['Engineering Team Coach', 'Product Owner', 'Delivery Manager'], parallel: false },
    ],
  },
  advisory: {
    label: 'Team advisory',
    orchestrator: 'Team Architect',
    goal: 'Recommend an AI–human team for a complex client project.',
    outcome: 'A team recommendation with coverage gaps and human checkpoints.',
    humanGate: 'A human expert must review the recommendation before it is delivered to a client.',
    stages: [
      { name: 'task-intake', title: 'Intake', summary: 'Characterize the task before choosing a team shape.', artifact: 'Task profile', agents: ['Team Architect', 'AI SDLC Client'], parallel: false },
      { name: 'specialist-advisory', title: 'Consult', summary: 'Get independent views on AI suitability, team topology, and risk.', artifact: 'Specialist assessments', agents: ['AI Dev Expert', 'Engineering Team Coach', 'Security Engineer'], parallel: true },
      { name: 'composition-synthesis', title: 'Compose', summary: 'Use task fit and templates to draft the team configuration.', artifact: 'Team composition', agents: ['Team Architect'], parallel: false },
      { name: 'composition-review', title: 'Evaluate', summary: 'Check role coverage, cognitive load, delegation, and skill gaps.', artifact: 'Composition verdict', agents: ['AI SDLC Client', 'Engineering Team Coach'], parallel: true, reviewGate: 'The composition must be evaluated before recommendation delivery.' },
      { name: 'recommendation-delivery', title: 'Prepare', summary: 'Package the recommendation and surface unresolved decisions for human review.', artifact: 'Review-ready recommendation', agents: ['Team Architect'], parallel: false },
    ],
  },
}
