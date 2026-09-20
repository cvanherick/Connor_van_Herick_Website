export type KnowledgeNodeType = 'root' | 'theme' | 'project' | 'course' | 'work' | 'technology' | 'concept'

export interface KnowledgeNode {
  id: string
  label: string
  type: KnowledgeNodeType
  summary: string
  connections: string[]
  href?: string
}

// The graph is intentionally an adjacency-list hashmap: shared concepts such as Python,
// SQL, and machine learning are referenced by several branches instead of duplicated.
export const knowledgeGraph: Record<string, KnowledgeNode> = {
  connor: { id: 'connor', label: 'Connor', type: 'root', summary: 'ML engineering, data systems, robotics, and curious problem solving.', connections: ['ml-ai', 'robotics-theme', 'systems-theme', 'data-theme', 'agentic-ai'] },
  'ml-ai': { id: 'ml-ai', label: 'ML / AI', type: 'theme', summary: 'Models, evaluation, and decisions that turn data into measurable outcomes.', connections: ['machine-learning', 'model-evaluation', 'optimization', 'xgboost', 'cs189', 'happen-bank', 'arc-teryx'] },
  'robotics-theme': { id: 'robotics-theme', label: 'Robotics', type: 'theme', summary: 'Perception, planning, and control that connect intelligence to the physical world.', connections: ['robotics', 'computer-vision', 'ros2', 'robot-player', 'cs106a'] },
  'systems-theme': { id: 'systems-theme', label: 'Systems', type: 'theme', summary: 'Reliable software, interfaces, and human checkpoints across a whole system.', connections: ['systems-design', 'react', 'human-control', 'orchestration'] },
  'data-theme': { id: 'data-theme', label: 'Data', type: 'theme', summary: 'Pipelines, warehouses, and features that make analysis and modeling production-ready.', connections: ['python', 'sql', 'pyspark', 'databricks', 'decisioning', 'forecasting', 'happen-bank', 'arc-teryx'] },
  'agentic-ai': { id: 'agentic-ai', label: 'Agentic AI', type: 'theme', summary: 'Specialized agents coordinating around shared objectives with review and human control.', connections: ['cadre', 'multi-agent', 'orchestration', 'human-control', 'typescript'] },
  cadre: { id: 'cadre', label: 'Cadre', type: 'project', summary: 'Role-based agent teams with orchestration, review gates, and human control.', connections: ['connor', 'multi-agent', 'orchestration', 'human-control', 'typescript', 'python'], href: './case-studies/cadre.html' },
  'robot-player': { id: 'robot-player', label: 'Vision-Guided Robot', type: 'project', summary: 'ROS 2 autonomy stack for perception, planning, and physical game play.', connections: ['connor', 'robotics', 'computer-vision', 'ros2', 'python', 'cs106a'], href: 'https://sites.google.com/berkeley.edu/blokushumanvsrobot/intro?authuser=0' },
  'happen-bank': { id: 'happen-bank', label: 'Happen Bank', type: 'work', summary: 'Collections strategy and uplift modeling across large-scale financial records.', connections: ['connor', 'xgboost', 'sql', 'pyspark', 'decisioning', 'machine-learning'], href: './case-studies/happen-bank.html' },
  'arc-teryx': { id: 'arc-teryx', label: "Arc'teryx", type: 'work', summary: 'Retail labor allocation models built with a data science project team.', connections: ['connor', 'forecasting', 'databricks', 'python', 'machine-learning'], href: './experience/' },
  cs189: { id: 'cs189', label: 'CS 189 · ML', type: 'course', summary: 'Machine learning, model evaluation, optimization, and probability.', connections: ['connor', 'machine-learning', 'python', 'model-evaluation', 'optimization'] },
  cs106a: { id: 'cs106a', label: 'EECS C106A · Robotics', type: 'course', summary: 'Robot kinematics, motion planning, control, and perception.', connections: ['connor', 'robotics', 'ros2', 'computer-vision', 'python', 'robot-player'] },
  python: { id: 'python', label: 'Python', type: 'technology', summary: 'Modeling, data products, experimentation, and robotics workflows.', connections: ['connor', 'pyspark', 'machine-learning', 'robotics', 'cadre', 'robot-player', 'arc-teryx', 'cs189', 'cs106a'] },
  typescript: { id: 'typescript', label: 'TypeScript', type: 'technology', summary: 'Typed frontend systems and interactive portfolio experiences.', connections: ['react', 'cadre'] },
  sql: { id: 'sql', label: 'SQL', type: 'technology', summary: 'Decisioning workflows, analytics, and data transformation.', connections: ['pyspark', 'decisioning', 'happen-bank'] },
  pyspark: { id: 'pyspark', label: 'PySpark', type: 'technology', summary: 'Distributed processing and feature pipelines.', connections: ['databricks', 'sql', 'happen-bank', 'python'] },
  databricks: { id: 'databricks', label: 'Databricks', type: 'technology', summary: 'Large-scale modeling, experimentation, and analytics.', connections: ['pyspark', 'xgboost', 'arc-teryx'] },
  xgboost: { id: 'xgboost', label: 'XGBoost', type: 'technology', summary: 'High-performing structured prediction and uplift modeling.', connections: ['machine-learning', 'model-evaluation', 'happen-bank', 'databricks'] },
  ros2: { id: 'ros2', label: 'ROS 2', type: 'technology', summary: 'Robotics middleware connecting perception, planning, and control.', connections: ['robotics', 'computer-vision', 'robot-player', 'cs106a'] },
  react: { id: 'react', label: 'React', type: 'technology', summary: 'Component architecture for this interactive portfolio.', connections: ['typescript', 'systems-design'] },
  'machine-learning': { id: 'machine-learning', label: 'Machine Learning', type: 'concept', summary: 'Turning data into predictions, decisions, and measurable outcomes.', connections: ['connor', 'model-evaluation', 'optimization', 'xgboost', 'python', 'cs189', 'happen-bank', 'arc-teryx', 'decisioning', 'forecasting'] },
  robotics: { id: 'robotics', label: 'Robotics', type: 'concept', summary: 'Systems that connect models to sensors, motion, and the physical world.', connections: ['ros2', 'computer-vision', 'cs106a', 'robot-player', 'python'] },
  'computer-vision': { id: 'computer-vision', label: 'Computer Vision', type: 'concept', summary: 'Perception pipelines that turn images and sensors into state.', connections: ['robotics', 'ros2', 'cs106a', 'robot-player'] },
  'multi-agent': { id: 'multi-agent', label: 'Multi-Agent Workflows', type: 'concept', summary: 'Specialized agents coordinating around a shared objective.', connections: ['orchestration', 'human-control', 'cadre'] },
  orchestration: { id: 'orchestration', label: 'Orchestration', type: 'concept', summary: 'Delegation, dependency management, and coherent delivery.', connections: ['multi-agent', 'systems-design', 'cadre', 'human-control'] },
  'human-control': { id: 'human-control', label: 'Human-in-the-Loop', type: 'concept', summary: 'Review checkpoints that keep decisions inspectable and accountable.', connections: ['orchestration', 'model-evaluation', 'cadre', 'multi-agent'] },
  decisioning: { id: 'decisioning', label: 'Decisioning', type: 'concept', summary: 'Constraints and predictions translated into real-world actions.', connections: ['sql', 'machine-learning', 'happen-bank'] },
  forecasting: { id: 'forecasting', label: 'Forecasting', type: 'concept', summary: 'Predicting demand and planning resources under uncertainty.', connections: ['machine-learning', 'arc-teryx'] },
  'model-evaluation': { id: 'model-evaluation', label: 'Model Evaluation', type: 'concept', summary: 'Testing quality, tradeoffs, and generalization before deployment.', connections: ['machine-learning', 'xgboost', 'human-control', 'cs189'] },
  optimization: { id: 'optimization', label: 'Optimization', type: 'concept', summary: 'Finding better decisions under constraints and competing objectives.', connections: ['machine-learning', 'cs189', 'systems-design'] },
  'systems-design': { id: 'systems-design', label: 'Systems Design', type: 'concept', summary: 'Reliable interfaces and maintainable architectures across a whole system.', connections: ['connor', 'orchestration', 'react', 'optimization'] },
}
