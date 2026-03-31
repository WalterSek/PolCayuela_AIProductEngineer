'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Github, Linkedin, Mail, FileText, ExternalLink, Smartphone, CheckCircle, Users, MapPin } from 'lucide-react';
import { projects } from '@/data/projects';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations';
import { ContactTrigger } from '@/components/contact';
import { useRouter } from 'next/navigation';
import { Project } from '@/data/projects';

function ProjectCard({ project }: { project: Project }) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/projects/${project.slug}`);
  };

  return (
    <StaggerItem className="h-full">
      <div 
        onClick={handleCardClick}
        className="group flex flex-col bg-white rounded-2xl border border-zinc-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 hover:border-zinc-300 h-full shadow-sm cursor-pointer"
      >
        {project.imageUrl && (
          <div className="relative aspect-video w-full overflow-hidden border-b border-zinc-100">
            <Image
              src={project.imageUrl}
              alt={project.name}
              fill
              unoptimized
              loading="lazy"
              className="object-cover"
            />
          </div>
        )}
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-start justify-between mb-3">
            <span className="font-display text-xl font-bold text-zinc-900 group-hover:text-zinc-700 transition-colors">
              {project.name}
            </span>
            {project.status && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-zinc-100 text-zinc-800">
                {project.status}
              </span>
            )}
          </div>
          <p className="text-sm font-medium text-zinc-900 mb-2">{project.tagline}</p>
          <p className="text-sm text-zinc-600 mb-4">{project.description}</p>
          
          {project.productionFeatures && project.productionFeatures.length > 0 && (
            <div className="mb-4 p-3 bg-zinc-50 rounded-lg border border-zinc-100">
              <p className="text-xs font-semibold text-zinc-900 mb-2">Production Features:</p>
              <ul className="space-y-1">
                {project.productionFeatures.slice(0, 4).map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-zinc-600">
                    <CheckCircle className="w-3 h-3 mt-0.5 text-zinc-400 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="mt-auto">
            <div className="flex flex-wrap gap-2 mb-4">
              {project.stack.slice(0, 6).map(tech => (
                <span key={tech} className="inline-flex items-center px-2 py-1 rounded-md bg-zinc-50 border border-zinc-200 text-xs font-medium text-zinc-600">
                  {tech}
                </span>
              ))}
              {project.stack.length > 6 && (
                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium text-zinc-400">
                  +{project.stack.length - 6} more
                </span>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 flex-wrap">
                {project.links.demo && (
                  <a 
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 text-white rounded-md text-sm font-medium hover:bg-zinc-700 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="w-4 h-4" /> Live
                  </a>
                )}
                {project.links.playStore && (
                  <a 
                    href={project.links.playStore}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 text-white rounded-md text-sm font-medium hover:bg-zinc-700 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Smartphone className="w-4 h-4" /> Play Store
                  </a>
                )}
              </div>
              
              <span className="text-sm font-medium text-zinc-400 group-hover:text-zinc-600 transition-colors flex items-center gap-1">
                View Details <span className="group-hover:translate-x-0.5 transition-transform">→</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </StaggerItem>
  );
}

export default function Home() {
  const sortedProjects = [...projects].sort((a, b) => {
    if (a.featured === b.featured) return 0;
    return a.featured ? -1 : 1;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full max-w-7xl lg:max-w-[1400px] xl:max-w-[1600px] 2xl:max-w-[1800px] 3xl:max-w-[1920px] mx-auto px-6 pt-16 pb-8 md:pt-24 md:pb-12">
        <FadeIn>
          <div className="mb-8 max-w-5xl">
            <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-zinc-900 mb-2">
              Hi, I&apos;m Pol Cayuela. <br className="hidden md:block" />
              <span className="text-zinc-500">AI Product Engineer.</span>
            </h1>
            <p className="text-sm text-zinc-400 mb-4 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" /> Barcelona, Spain
            </p>
            <p className="text-lg md:text-xl text-zinc-600 leading-relaxed max-w-5xl">
              Building production-ready AI-native applications. I design and ship end-to-end full-stack products across web and mobile, integrating LLMs, real-time voice, image generation, and agentic workflows.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mb-12 max-w-5xl">
            <a href="https://github.com/waltersek" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors text-sm font-medium">
              <Github className="w-4 h-4" />
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/polcayuela/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 text-zinc-900 rounded-lg hover:bg-zinc-50 transition-colors text-sm font-medium shadow-sm">
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
            <ContactTrigger className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 text-zinc-900 rounded-lg hover:bg-zinc-50 transition-colors text-sm font-medium shadow-sm">
              <Mail className="w-4 h-4" />
              Email
            </ContactTrigger>
            <a href="/CV_PolCayuela_AI.pdf" download className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 text-zinc-900 rounded-lg hover:bg-zinc-50 transition-colors text-sm font-medium shadow-sm">
              <FileText className="w-4 h-4" />
              Download CV
            </a>
          </div>

          <div className="pt-8 border-t border-zinc-200 w-full">
            <div className="flex flex-wrap gap-x-12 gap-y-10">
              <div className="max-w-[280px]">
                <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-4">AI</h3>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Gemini API & Gemini Live',
                    'OpenAI API',
                    'Google Agent ADK',
                    'Vertex AI',
                    'Agentic AI & Automations',
                    'LLM Integration',
                    'Structured Outputs',
                    'Tool Calling',
                    'Generative AI Workflows'
                  ].map(skill => (
                    <span key={skill} className="px-2.5 py-1 bg-white border border-zinc-200 rounded-md text-[11px] font-medium text-zinc-600 shadow-sm hover:border-zinc-300 transition-all cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="max-w-[280px]">
                <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-4">Frontend & Mobile</h3>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'TypeScript',
                    'Next.js',
                    'React',
                    'React Native',
                    'Expo',
                    'Tailwind CSS',
                    'TanStack Query',
                    'Zustand',
                    'Zod'
                  ].map(skill => (
                    <span key={skill} className="px-2.5 py-1 bg-white border border-zinc-200 rounded-md text-[11px] font-medium text-zinc-600 shadow-sm hover:border-zinc-300 transition-all cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="max-w-[280px]">
                <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-4">Backend & Cloud</h3>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Node.js',
                    'Python',
                    'Supabase (Auth, PostgreSQL)',
                    'GCP / Cloud Run',
                    'R2 Storage',
                    'Docker',
                    'REST APIs',
                    'LiveKit',
                    'WebSockets',
                    'Webhooks'
                  ].map(skill => (
                    <span key={skill} className="px-2.5 py-1 bg-white border border-zinc-200 rounded-md text-[11px] font-medium text-zinc-600 shadow-sm hover:border-zinc-300 transition-all cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="max-w-[200px]">
                <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-4">Payments</h3>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Stripe',
                    'RevenueCat',
                    'Google Play Store'
                  ].map(skill => (
                    <span key={skill} className="px-2.5 py-1 bg-white border border-zinc-200 rounded-md text-[11px] font-medium text-zinc-600 shadow-sm hover:border-zinc-300 transition-all cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="max-w-[200px]">
                <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-4">DevOps</h3>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Git',
                    'CI/CD',
                    'Playwright',
                    'Jest'
                  ].map(skill => (
                    <span key={skill} className="px-2.5 py-1 bg-white border border-zinc-200 rounded-md text-[11px] font-medium text-zinc-600 shadow-sm hover:border-zinc-300 transition-all cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="max-w-[240px]">
                <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-4">AI-Augmented Development</h3>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'GitHub Copilot',
                    'Gemini CLI',
                    'Claude Code',
                    'MCPs + Skills'
                  ].map(skill => (
                    <span key={skill} className="px-2.5 py-1 bg-white border border-zinc-200 rounded-md text-[11px] font-medium text-zinc-600 shadow-sm hover:border-zinc-300 transition-all cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </header>

      <main className="flex-1 w-full max-w-7xl lg:max-w-[1400px] xl:max-w-[1600px] 2xl:max-w-[1800px] 3xl:max-w-[1920px] mx-auto px-6 pt-4 pb-12">
        <FadeIn delay={0.2} className="mb-12">
          <h2 className="font-display text-2xl font-bold text-zinc-900 mb-2">Selected Projects</h2>
          <p className="text-zinc-500">A collection of my recent work in AI and software engineering.</p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </StaggerContainer>
      </main>

      <FadeIn delay={0.4}>
        <footer className="w-full max-w-7xl lg:max-w-[1400px] xl:max-w-[1600px] 2xl:max-w-[1800px] 3xl:max-w-[1920px] mx-auto px-6 py-8 border-t border-zinc-200 mt-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-zinc-500">
              © {new Date().getFullYear()} Pol Cayuela. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm font-medium text-zinc-500">
              <a href="https://github.com/waltersek" className="hover:text-zinc-900 transition-colors">GitHub</a>
              <a href="https://www.linkedin.com/in/polcayuela/" className="hover:text-zinc-900 transition-colors">LinkedIn</a>
              <ContactTrigger className="hover:text-zinc-900 transition-colors">Email</ContactTrigger>
            </div>
          </div>
        </footer>
      </FadeIn>
    </div>
  );
}
