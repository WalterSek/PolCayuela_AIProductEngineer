export interface Project {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  content?: string;
  stack: string[];
  highlights: string[];
  links: {
    demo?: string;
    repo?: string;
    caseStudy?: string;
    video?: string;
    playStore?: string;
    testerGroup?: string;
  };
  status?: "Production" | "Prototype" | "Beta" | "Launch Soon" | "Google Play Internal Testing" | "Live Web App";
  featured?: boolean;
  imageUrl?: string;
  demoCredentials?: {
    email: string;
    password: string;
  };
  productionFeatures?: string[];
}
