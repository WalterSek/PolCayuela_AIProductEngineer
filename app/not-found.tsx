import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { FadeIn } from '@/components/animations';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 px-4">
      <FadeIn>
        <div className="text-center">
          <h1 className="font-display text-6xl md:text-8xl font-bold text-zinc-900 mb-4">
            404
          </h1>
          <p className="text-xl text-zinc-600 mb-8">
            Page not found
          </p>
          <p className="text-zinc-500 mb-8 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </FadeIn>
    </div>
  );
}
