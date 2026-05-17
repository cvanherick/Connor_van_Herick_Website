export interface Project {
  title: string;
  description: string;
  tech: string[];
  impact: string;
  github?: string;
  demo?: string;
  logo?: string;
  logoAlt?: string;
}

export interface Experience {
  title: string;
  company: string;
  duration: string;
  description: string;
}
