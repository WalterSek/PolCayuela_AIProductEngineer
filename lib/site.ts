export const siteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://polcayuela.com',
  name: 'Pol Cayuela | AI Product Engineer',
  description: 'Portfolio of Pol Cayuela, an AI Product Engineer specializing in React, TypeScript, and the Gemini API.',
  author: 'Pol Cayuela',
  twitterHandle: '@polcayuela',
};

export function getSiteUrl(path = ''): string {
  return `${siteConfig.url}${path.startsWith('/') ? path : `/${path}`}`;
}
