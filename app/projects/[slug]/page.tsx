import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ExternalLink, Code2, PlayCircle, BookOpen, CheckCircle2, Smartphone, Users } from 'lucide-react';
import { projects } from '@/data/projects';
import { Metadata } from 'next';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FadeIn } from '@/components/animations';
import { ContactTrigger } from '@/components/contact';
import { siteConfig } from '@/lib/site';

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return { title: 'Project Not Found' };
  }

  const projectUrl = `${siteConfig.url}/projects/${project.slug}`;
  const images = project.imageUrl
    ? [{ url: project.imageUrl, alt: project.name }]
    : undefined;

  return {
    title: project.name,
    description: project.description,
    alternates: {
      canonical: projectUrl,
    },
    openGraph: {
      title: `${project.name} | ${siteConfig.author}`,
      description: project.description,
      url: projectUrl,
      siteName: siteConfig.name,
      locale: 'en_US',
      type: 'article',
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: project.name,
      description: project.description,
      creator: siteConfig.twitterHandle,
      images,
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50">
      <FadeIn>
        <header className="w-full max-w-5xl mx-auto px-4 md:px-6 py-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors mb-8 cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
            Back to projects
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-zinc-900">
              {project.name}
            </h1>
            {project.status && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-zinc-200 text-zinc-800">
                {project.status}
              </span>
            )}
          </div>
          <p className="text-xl text-zinc-600 mb-8">{project.tagline}</p>

          {project.imageUrl && (
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-zinc-200 mb-8 shadow-sm">
              <Image
                src={project.imageUrl}
                alt={project.name}
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                unoptimized
                priority
                className="object-cover"
              />
            </div>
          )}

          <div className="flex flex-wrap items-center gap-4">
            {project.links.demo && (
              <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors text-sm font-medium cursor-pointer">
                <ExternalLink className="w-4 h-4" />
                Visit Live Demo
              </a>
            )}
            {project.links.testerGroup && (
              <a href={project.links.testerGroup} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 text-zinc-900 rounded-lg hover:bg-zinc-50 transition-colors text-sm font-medium shadow-sm cursor-pointer">
                <Users className="w-4 h-4" />
                1. Become a Tester
              </a>
            )}
            {project.links.playStore && (
              <a href={project.links.playStore} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors text-sm font-medium cursor-pointer">
                <Smartphone className="w-4 h-4" />
                2. Get Android App
              </a>
            )}
            {project.links.repo && (
              <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 text-zinc-900 rounded-lg hover:bg-zinc-50 transition-colors text-sm font-medium shadow-sm cursor-pointer">
                <Code2 className="w-4 h-4" />
                View Source
              </a>
            )}
            {project.links.video && (
              <a href={project.links.video} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 text-zinc-900 rounded-lg hover:bg-zinc-50 transition-colors text-sm font-medium shadow-sm cursor-pointer">
                <PlayCircle className="w-4 h-4" />
                Watch Video
              </a>
            )}
            {project.links.caseStudy && (
              <a href={project.links.caseStudy} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 text-zinc-900 rounded-lg hover:bg-zinc-50 transition-colors text-sm font-medium shadow-sm cursor-pointer">
                <BookOpen className="w-4 h-4" />
                Read Case Study
              </a>
            )}
          </div>

          {project.links.testerGroup && (
            <div className="mt-6 p-4 bg-zinc-50 rounded-xl border border-zinc-200">
              <h3 className="font-display text-sm font-bold text-zinc-900 mb-3 flex items-center gap-2">
                <Smartphone className="w-4 h-4" /> Beta Testing Instructions
              </h3>
              <p className="text-xs text-zinc-500 mb-3">(Android only)</p>
              <ol className="space-y-2 text-sm text-zinc-700">
                <li className="flex items-start gap-2">
                  <span className="font-medium text-zinc-900">1.</span>
                  Click <strong>1. Become a Tester</strong> → Click <strong>Join group</strong> → Click <strong>Become a member</strong>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-medium text-zinc-900">2.</span>
                  Click <strong>2. Get Android App</strong> → In Play Store, click <strong>Become a Tester</strong> → Download the app
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-medium text-zinc-900">3.</span>
                  Leave your feedback and give a 5-star rating if you enjoy it!
                </li>
              </ol>
            </div>
          )}
        </header>
      </FadeIn>

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 md:px-6">
        <FadeIn delay={0.1}>
          
          {/* Screenshot gallery - shown if project has screenshots */}
          {project.screenshots && project.screenshots.length > 0 && (
            <section className="mb-10">
              <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${Math.min(project.screenshots.length, 5)}, minmax(0, 1fr))` }}>
                {project.screenshots.map((screenshot, index) => (
                  <div key={index} className="relative aspect-[1/2] overflow-hidden rounded-xl border border-zinc-200 shadow-sm bg-zinc-100">
                    <Image
                      src={screenshot.src}
                      alt={screenshot.alt}
                      fill
                      sizes="(max-width: 768px) 50vw, 20vw"
                      loading="lazy"
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="mb-10">
            <h2 className="font-display text-xl font-bold text-zinc-900 mb-4">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.stack.map(tech => (
                <span key={tech} className="inline-flex items-center px-3 py-1.5 rounded-lg bg-zinc-50 border border-zinc-200 text-sm font-medium text-zinc-700">
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {project.content ? (
            <div className="prose prose-zinc prose-headings:font-display prose-h2:text-2xl prose-h2:mt-12 prose-h3:text-xl prose-a:text-blue-600 max-w-none">
              <Markdown remarkPlugins={[remarkGfm]}>{project.content}</Markdown>
            </div>
          ) : (
            <>
              <section className="mb-10">
                <h2 className="font-display text-xl font-bold text-zinc-900 mb-4">Overview</h2>
                <p className="text-zinc-600 leading-relaxed whitespace-pre-wrap">
                  {project.description}
                </p>
              </section>

              <section className="mb-10">
                <h2 className="font-display text-xl font-bold text-zinc-900 mb-4">Key Highlights</h2>
                <ul className="space-y-3">
                  {project.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-3 text-zinc-600">
                      <CheckCircle2 className="w-5 h-5 text-zinc-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </>
          )}
        </FadeIn>
      </main>

      <FadeIn delay={0.2} className="mt-auto">
        <footer className="w-full max-w-5xl mx-auto px-4 md:px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between border-t border-zinc-200 pt-8 gap-4">
            <p className="text-sm text-zinc-500">
              © {new Date().getFullYear()} Pol Cayuela. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm font-medium text-zinc-500">
              <a href="https://github.com/waltersek" className="hover:text-zinc-900 transition-colors cursor-pointer">GitHub</a>
              <a href="https://www.linkedin.com/in/polcayuela/" className="hover:text-zinc-900 transition-colors cursor-pointer">LinkedIn</a>
              <ContactTrigger className="hover:text-zinc-900 transition-colors cursor-pointer">Email</ContactTrigger>
              <Link href="/" className="hover:text-zinc-900 transition-colors cursor-pointer">
                Home
              </Link>
            </div>
          </div>
        </footer>
      </FadeIn>
    </div>
  );
}
