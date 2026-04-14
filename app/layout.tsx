import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });

export const metadata: Metadata = {
  title: 'Pol Cayuela | AI Product Engineer',
  description: 'Portfolio of Pol Cayuela, an AI Product Engineer specializing in React, TypeScript, and the Gemini API.',
  openGraph: {
    title: 'Pol Cayuela | AI Product Engineer',
    description: 'Portfolio of Pol Cayuela, an AI Product Engineer specializing in React, TypeScript, and the Gemini API.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pol Cayuela | AI Product Engineer',
    description: 'Portfolio of Pol Cayuela, an AI Product Engineer specializing in React, TypeScript, and the Gemini API.',
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans bg-zinc-50 text-zinc-900 antialiased select-none" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
