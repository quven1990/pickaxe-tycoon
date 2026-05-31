import { Metadata } from 'next';
import { getGameConfig } from './data';

const config = getGameConfig();
const baseUrl = config.seo.baseUrl;

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  path: string;
  ogImage?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
}

export function generateSEOMetadata(props: SEOProps): Metadata {
  const {
    title,
    description,
    keywords,
    path,
    ogImage = '/og-default.jpg',
    type = 'website',
    publishedTime,
    modifiedTime,
  } = props;

  const url = `${baseUrl}${path}`;
  const imageUrl = `${baseUrl}${ogImage}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: config.game.name,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
      type,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  };
}

export function generateFAQSchema(questions: { question: string; answer: string }[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };
}

export function generateWebSiteSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: config.seo.siteTitle,
    url: `${baseUrl}/`,
    description: config.seo.siteDescription,
    publisher: {
      '@type': 'Organization',
      name: `${config.game.name} Guide`,
      url: `${baseUrl}/`,
    },
  };
}

export function generateVideoGameSchema(): object {
  const gameImage = config.assets?.thumbnail ?? config.seo.defaultOgImage;
  const description = config.game.description ?? config.seo.siteDescription;
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: config.game.robloxName ?? config.game.name,
    description,
    genre: config.game.genre,
    url: `https://www.roblox.com/games/${config.game.robloxId}`,
    image: `${baseUrl}${gameImage}`,
    datePublished: config.game.created,
    dateModified: config.game.lastUpdated,
    operatingSystem: config.game.platforms.join(', '),
    author: {
      '@type': 'Organization',
      name: config.game.developer,
    },
  };
}

export function generateArticleSchema(props: {
  title: string;
  description: string;
  path: string;
  publishedTime: string;
  modifiedTime?: string;
}): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: props.title,
    description: props.description,
    url: `${baseUrl}${props.path}`,
    datePublished: props.publishedTime,
    dateModified: props.modifiedTime ?? props.publishedTime,
    author: {
      '@type': 'Organization',
      name: `${config.game.name} Guide`,
    },
    image: `${baseUrl}${config.seo.defaultOgImage}`,
  };
}

export function getCurrentDateString(): string {
  return new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}
