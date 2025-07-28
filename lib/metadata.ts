import { source, blog } from "@/lib/source";
import { Metadata } from "next";

/**
 * Create and return metadata for pages with proper OpenGraph images
 */
export const metadataImage = {
  withImage: (slugs: string[], options: { title: string; description: string }): Metadata => {
    const { title, description } = options;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: 'article',
        url: `https://devops-engineering.xyz/docs/${slugs.join('/')}`,
        images: [
          {
            url: `/docs-og?slug=${encodeURIComponent(slugs.join('/'))}`,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [`/docs-og?slug=${encodeURIComponent(slugs.join('/'))}`],
      },
    };
  }
};

/**
 * Create and return metadata for blog posts with proper OpenGraph images
 */
export const metadataImageBlog = {
  withImage: (slugs: string[], options: { title: string; description: string }): Metadata => {
    const { title, description } = options;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: 'article',
        url: `https://devops-engineering.xyz/blog/${slugs.join('/')}`,
        images: [
          {
            url: `/blog-og?slug=${encodeURIComponent(slugs.join('/'))}`,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [`/blog-og?slug=${encodeURIComponent(slugs.join('/'))}`],
      },
    };
  }
};
