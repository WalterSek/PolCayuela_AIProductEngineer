import Link from 'next/link';
import Image from 'next/image';
import { Github, Linkedin, Mail, FileText, ExternalLink, Code2, PlayCircle, Smartphone } from 'lucide-react';
import { projects } from '@/data/projects';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations';
import { ContactTrigger } from '@/components/contact';

export default function Home() {
  const sortedProjects = [...projects].sort((a, b) => {
    if (a.featured === b.featured) return 0;
    return a.featured ? -1 : 1;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full max-w-7xl mx-auto px-6 pt-16 pb-8 md:pt-24 md:pb-12">
        <FadeIn className="max-w-4xl">
          <div className="mb-8">
            <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-zinc-900 mb-4">
              Hi, I&apos;m Pol Cayuela. <br className="hidden md:block" />
              <span className="text-zinc-500">AI Product Developer.</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-600 leading-relaxed max-w-2xl">
              Full-stack developer from Barcelona with a deep focus on AI integration. 
              I craft production-ready, intelligent applications by leveraging modern AI workflows to build scalable, end-to-end solutions.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mb-12">
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
            <a href="/cv.pdf" className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 text-zinc-900 rounded-lg hover:bg-zinc-50 transition-colors text-sm font-medium shadow-sm">
              <FileText className="w-4 h-4" />
              Download CV
            </a>
          </div>

          <div className="pt-8 border-t border-zinc-200">
            <p className="text-sm font-medium text-zinc-500 mb-4 uppercase tracking-wider">Core Technologies</p>
            <div className="flex flex-wrap gap-2">
              {[
                'Agentic AI', 
                'AI Automations', 
                'LLM Integration', 
                'Python', 
                'TypeScript', 
                'JavaScript', 
                'Next.js', 
                'React Native', 
                'React', 
                'Node.js', 
                'Supabase', 
                'Cloudflare R2', 
                'Google Cloud', 
                'Vercel', 
                'Zustand', 
                'TanStack Query', 
                'Tailwind CSS', 
                'Git'
              ].map(skill => (
                <span key={skill} className="px-4 py-2 bg-white border border-zinc-200 rounded-full text-sm font-medium text-zinc-700 shadow-sm hover:border-zinc-300 hover:shadow-md transition-all cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 pt-4 pb-12">
        <FadeIn delay={0.2} className="mb-12">
          <h2 className="font-display text-2xl font-bold text-zinc-900 mb-2">Selected Projects</h2>
          <p className="text-zinc-500">A collection of my recent work in AI and software engineering.</p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedProjects.map((project) => (
            <StaggerItem key={project.slug} className="h-full">
              <Link 
                href={`/projects/${project.slug}`} 
                className="group flex flex-col bg-white rounded-2xl border border-zinc-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 hover:border-zinc-300 h-full shadow-sm"
              >
                {project.imageUrl && (
                    <div className="relative aspect-video w-full overflow-hidden border-b border-zinc-100">
                      <Image
                        src={project.imageUrl}
                        alt={project.name}
                        fill
                        unoptimized
                        loading={sortedProjects.findIndex(p => p.slug === project.slug) === 0 ? "eager" : "lazy"}
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="font-display text-xl font-bold text-zinc-900 group-hover:text-zinc-700 transition-colors">
                        {project.name}
                      </h3>
                      {project.status && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 text-zinc-800">
                          {project.status}
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-medium text-zinc-900 mb-2">{project.tagline}</p>
                    <p className="text-sm text-zinc-600 mb-6">{project.description}</p>
                    
                    <div className="mt-auto">
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.stack.map(tech => (
                          <span key={tech} className="inline-flex items-center px-2 py-1 rounded-md bg-zinc-50 border border-zinc-200 text-xs font-medium text-zinc-600">
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm font-medium text-zinc-500">
                        {project.links.demo && (
                          <span className="flex items-center gap-1.5 hover:text-zinc-900 transition-colors">
                            <ExternalLink className="w-4 h-4" /> Demo
                          </span>
                        )}
                        {project.links.playStore && (
                          <span className="flex items-center gap-1.5 hover:text-zinc-900 transition-colors">
                            <Smartphone className="w-4 h-4" /> App
                          </span>
                        )}
                        {project.links.repo && (
                          <span className="flex items-center gap-1.5 hover:text-zinc-900 transition-colors">
                            <Code2 className="w-4 h-4" /> Repo
                          </span>
                        )}
                        {project.links.video && (
                          <span className="flex items-center gap-1.5 hover:text-zinc-900 transition-colors">
                            <PlayCircle className="w-4 h-4" /> Video
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </main>

      <FadeIn delay={0.4}>
        <footer className="w-full max-w-7xl mx-auto px-6 py-8 border-t border-zinc-200 mt-12">
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
