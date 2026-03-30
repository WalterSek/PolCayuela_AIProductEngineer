import Link from 'next/link';
import Image from 'next/image';
import { Github, Linkedin, Mail, FileText, ExternalLink, Code2, PlayCircle, Smartphone, CheckCircle, Users, MapPin } from 'lucide-react';
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
              <div className="max-w-[240px]">
                <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-4">AI & Intelligence</h3>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Agentic AI', 
                    'Gemini Live API',
                    'Gemini API',
                    'OpenAI API',
                    'Claude / MCP',
                    'AI Automations'
                  ].map(skill => (
                    <span key={skill} className="px-2.5 py-1 bg-white border border-zinc-200 rounded-md text-[11px] font-medium text-zinc-600 shadow-sm hover:border-zinc-300 transition-all cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="max-w-[260px]">
                <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-4">Frontend & Mobile</h3>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Next.js', 
                    'React Native', 
                    'Expo',
                    'TypeScript',
                    'Tailwind CSS',
                    'TanStack Query'
                  ].map(skill => (
                    <span key={skill} className="px-2.5 py-1 bg-white border border-zinc-200 rounded-md text-[11px] font-medium text-zinc-600 shadow-sm hover:border-zinc-300 transition-all cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="max-w-[260px]">
                <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-4">Backend & Cloud</h3>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Node.js', 
                    'Python',
                    'Supabase', 
                    'PostgreSQL',
                    'Cloudflare R2', 
                    'GCP / Cloud Run'
                  ].map(skill => (
                    <span key={skill} className="px-2.5 py-1 bg-white border border-zinc-200 rounded-md text-[11px] font-medium text-zinc-600 shadow-sm hover:border-zinc-300 transition-all cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="max-w-[240px]">
                <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-4">Product & Payments</h3>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Stripe',
                    'RevenueCat',
                    'LiveKit',
                    'Google Play Store'
                  ].map(skill => (
                    <span key={skill} className="px-2.5 py-1 bg-white border border-zinc-200 rounded-md text-[11px] font-medium text-zinc-600 shadow-sm hover:border-zinc-300 transition-all cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="max-w-[240px]">
                <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-4">DevOps</h3>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Playwright',
                    'Jest',
                    'Git',
                    'CI/CD'
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
            <StaggerItem key={project.slug} className="h-full">
              <div 
                className="group flex flex-col bg-white rounded-2xl border border-zinc-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 hover:border-zinc-300 h-full shadow-sm"
              >
                {project.imageUrl && (
                  <Link href={`/projects/${project.slug}`}>
                    <div className="relative aspect-video w-full overflow-hidden border-b border-zinc-100 cursor-pointer">
                      <Image
                        src={project.imageUrl}
                        alt={project.name}
                        fill
                        unoptimized
                        loading={sortedProjects.findIndex(p => p.slug === project.slug) === 0 ? "eager" : "lazy"}
                        className="object-cover"
                      />
                    </div>
                  </Link>
                )}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <Link href={`/projects/${project.slug}`} className="font-display text-xl font-bold text-zinc-900 group-hover:text-zinc-700 transition-colors">
                      {project.name}
                    </Link>
                    {project.status && (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-zinc-100 text-zinc-800">
                        {project.status}
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-zinc-900 mb-2">{project.tagline}</p>
                  <p className="text-sm text-zinc-600 mb-4">{project.description}</p>
                  
                  {/* Production Features */}
                  {project.productionFeatures && project.productionFeatures.length > 0 && (
                    <div className="mb-4 p-3 bg-zinc-50 rounded-lg border border-zinc-100">
                      <p className="text-xs font-semibold text-zinc-900 mb-2">Production Features:</p>
                      <ul className="space-y-1">
                        {project.productionFeatures.map((feature, idx) => (
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
                      {project.stack.map(tech => (
                        <span key={tech} className="inline-flex items-center px-2 py-1 rounded-md bg-zinc-50 border border-zinc-200 text-xs font-medium text-zinc-600">
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {project.links.demo && (
                        <a 
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 text-white rounded-md text-sm font-medium hover:bg-zinc-700 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" /> Live Web App
                        </a>
                      )}
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-3">
                        {project.links.testerGroup && (
                          <a 
                            href={project.links.testerGroup}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-zinc-200 text-zinc-900 rounded-md text-sm font-medium hover:bg-zinc-50 transition-colors"
                          >
                            <Users className="w-4 h-4" /> Become a Tester
                          </a>
                        )}
                        {project.links.playStore && (
                          <a 
                            href={project.links.playStore}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 text-white rounded-md text-sm font-medium hover:bg-zinc-700 transition-colors"
                          >
                            <Smartphone className="w-4 h-4" /> Google Play Testing
                          </a>
                        )}
                      </div>
                      {project.links.testerGroup && (
                        <p className="text-xs text-zinc-400">
                          (Android only)<br />
                          1. Click Become a Tester → Click Join group<br />
                          2. Click Google Play Testing → Click Become a Tester<br />
                          3. Click the link: Download it on Google Play<br />
                          4. Leave your feedback and give a 5-star rating if you enjoy it!<br />
                        </p>
                      )}
                    </div>
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
              </div>
            </StaggerItem>
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
