export interface SkillCategory {
  id: string;
  title: string;
  maxWidth?: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'ai',
    title: 'AI',
    maxWidth: '280px',
    skills: [
      'Voice Agents (Gemini Live, LiveKit, Deepgram)',
      'Gemini API',
      'OpenAI API',
      'Google Agent ADK',
      'Vertex AI',
      'Agentic AI & Automations',
      'LLM Integration',
      'RAG',
      'Structured Outputs',
      'Tool Calling',
      'Generative AI Workflows',
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend & Mobile',
    maxWidth: '280px',
    skills: [
      'TypeScript',
      'Next.js',
      'React',
      'React Native',
      'Expo',
      'Tailwind CSS',
      'TanStack Query',
      'Zustand',
      'Zod',
    ],
  },
  {
    id: 'backend',
    title: 'Backend & Cloud',
    maxWidth: '280px',
    skills: [
      'Node.js',
      'Python',
      'Supabase (Auth, PostgreSQL)',
      'GCP / Cloud Run',
      'R2 Storage',
      'Docker',
      'REST APIs',
      'WebSockets',
      'Webhooks',
    ],
  },
  {
    id: 'payments',
    title: 'Payments',
    maxWidth: '200px',
    skills: ['Stripe', 'RevenueCat', 'Google Play Store'],
  },
  {
    id: 'devops',
    title: 'DevOps',
    maxWidth: '200px',
    skills: ['Git', 'CI/CD', 'Playwright', 'Jest'],
  },
  {
    id: 'ai-dev',
    title: 'AI-Native Development',
    maxWidth: '240px',
    skills: ['VS Code + GitHub Copilot', 'Windsurf IDE', 'Gemini CLI', 'Claude Code', 'MCPs + Skills'],
  },
];
