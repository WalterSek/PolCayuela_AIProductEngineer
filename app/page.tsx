'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Github, Linkedin, Mail, FileText, ExternalLink, Smartphone, CheckCircle, Users, MapPin } from 'lucide-react';
import { projects } from '@/data/projects';
import { skillCategories } from '@/data/skills';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations';
import { ContactTrigger } from '@/components/contact';
import { DotGrid } from '@/components/dot-grid';
import { useRouter } from 'next/navigation';
import type { Project } from '@/data/types/project';
import { siteConfig } from '@/lib/site';

function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
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
              priority={priority}
              loading={priority ? "eager" : "lazy"}
              className="object-cover"
            />
          </div>
        )}
        <div className="p-4 md:p-6 flex-1 flex flex-col">
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
                {project.productionFeatures.slice(0, 4).map((feature: string, idx: number) => (
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
              {project.stack.slice(0, 6).map((tech: string) => (
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
            
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 flex-wrap">
                {project.links.demo && (
                  <a 
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-zinc-900 text-white rounded-md text-xs font-medium hover:bg-zinc-700 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Live
                  </a>
                )}
                {project.links.testerGroup && (
                  <a 
                    href={project.links.testerGroup}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-white border border-zinc-200 text-zinc-900 rounded-md text-xs font-medium hover:bg-zinc-50 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Users className="w-3.5 h-3.5" /> 1. Become a Tester
                  </a>
                )}
                {project.links.playStore && (
                  <a 
                    href={project.links.playStore}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-zinc-900 text-white rounded-md text-xs font-medium hover:bg-zinc-700 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Smartphone className="w-3.5 h-3.5" /> 2. Get Android App
                  </a>
                )}
              </div>
              
              <span className="text-xs font-medium text-zinc-400 group-hover:text-zinc-600 transition-colors flex items-center gap-1 whitespace-nowrap">
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
  const sortedProjects = [...projects].sort((a, b) => Number(b.featured) - Number(a.featured));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Pol Cayuela',
    jobTitle: 'AI Product Engineer',
    description: siteConfig.description,
    url: siteConfig.url,
    sameAs: [
      'https://github.com/waltersek',
      'https://www.linkedin.com/in/polcayuela/',
    ],
    knowsAbout: [
      'React',
      'TypeScript',
      'Gemini API',
      'LiveKit',
      'React Native',
      'Next.js',
      'Node.js',
      'AI/ML',
    ],
  };

  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="w-full max-w-7xl lg:max-w-[1400px] xl:max-w-[1600px] 2xl:max-w-[1800px] 3xl:max-w-[1920px] mx-auto px-4 md:px-6 pt-12 pb-8 md:pt-12 md:pb-12">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-16 mb-8">
            <div className="flex-1">
              <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-zinc-900 mb-2">
                Hi, I&apos;m Pol Cayuela. <br />
                <span className="text-zinc-500">AI Product Engineer.</span>
              </h1>
              <p className="text-sm text-zinc-400 mb-4 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> Barcelona, Spain
              </p>
              <p className="text-lg md:text-xl text-zinc-600 leading-relaxed max-w-5xl">
                Building production-ready AI-native applications. I design and ship end-to-end full-stack products across web and mobile, integrating LLMs, real-time voice, image generation, and agentic workflows.
              </p>
            </div>
            <div className="hidden md:block flex-shrink-0 order-first md:order-last flex-1 md:flex-none md:min-w-[320px] lg:min-w-[440px] xl:min-w-[520px] 2xl:min-w-[600px]">
              <div className="h-40 md:h-56 lg:h-64 xl:h-72 2xl:h-80 rounded-2xl overflow-hidden bg-transparent">
                <DotGrid />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-12 max-w-5xl">
            <a href="https://github.com/waltersek" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors text-sm font-medium cursor-pointer">
              <Github className="w-4 h-4" />
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/polcayuela/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 text-zinc-900 rounded-lg hover:bg-zinc-50 transition-colors text-sm font-medium shadow-sm cursor-pointer">
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
            <ContactTrigger className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 text-zinc-900 rounded-lg hover:bg-zinc-50 transition-colors text-sm font-medium shadow-sm cursor-pointer">
              <Mail className="w-4 h-4" />
              Email
            </ContactTrigger>
            <a href="/CV_PolCayuela_AI.pdf" download className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 text-zinc-900 rounded-lg hover:bg-zinc-50 transition-colors text-sm font-medium shadow-sm cursor-pointer">
              <FileText className="w-4 h-4" />
              Download CV
            </a>
          </div>

          <div className="pt-8 border-t border-zinc-200 w-full">
            <div className="flex flex-wrap gap-x-12 gap-y-10">
              {skillCategories.map((category) => (
                <div key={category.id} className={category.maxWidth ? `max-w-[${category.maxWidth}]` : ''}>
                  <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-4">{category.title}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {category.skills.map((skill) => (
                      <span key={skill} className="px-2.5 py-1 bg-white border border-zinc-200 rounded-md text-[11px] font-medium text-zinc-600 shadow-sm hover:border-zinc-300 transition-all cursor-default">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </header>

      <main className="flex-1 w-full max-w-7xl lg:max-w-[1400px] xl:max-w-[1600px] 2xl:max-w-[1800px] 3xl:max-w-[1920px] mx-auto px-4 md:px-6 pt-4 pb-12">
        <FadeIn delay={0.2} className="mb-12">
          <h2 className="font-display text-2xl font-bold text-zinc-900 mb-2">Selected Projects</h2>
          <p className="text-zinc-500">A collection of my recent SaaS products in AI and software engineering.</p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} priority={index === 0} />
          ))}
        </StaggerContainer>
      </main>

      <FadeIn delay={0.4}>
        <footer className="w-full max-w-7xl lg:max-w-[1400px] xl:max-w-[1600px] 2xl:max-w-[1800px] 3xl:max-w-[1920px] mx-auto px-4 md:px-6 py-8 border-t border-zinc-200 mt-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-zinc-500">
              © {new Date().getFullYear()} Pol Cayuela. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm font-medium text-zinc-500">
              <a href="https://github.com/waltersek" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 transition-colors cursor-pointer">GitHub</a>
              <a href="https://www.linkedin.com/in/polcayuela/" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 transition-colors cursor-pointer">LinkedIn</a>
              <ContactTrigger className="hover:text-zinc-900 transition-colors cursor-pointer">Email</ContactTrigger>
            </div>
          </div>
        </footer>
      </FadeIn>
    </div>
  );
}
