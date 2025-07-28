import { blog, source } from "@/lib/source";
import { Metadata } from "next";
import { ImageResponse } from "next/og";

type OGImageGenerator = (page: NonNullable<ReturnType<typeof source.getPage>>) => Promise<ImageResponse>;

/**
 * Create and return metadata for pages with proper OpenGraph images
 */
export const metadataImage = {
  createAPI: (generator: OGImageGenerator) => {
    return async function GET(req: Request) {
      const url = new URL(req.url);
      const slug = url.searchParams.get('slug')?.split('/') ?? [];
      const page = source.getPage(slug);

      if (!page) {
        return new Response('Not Found', { status: 404 });
      }

      return generator(page);
    };
  },

  generateParams: () => {
    return source.getPages().map((page) => ({
      slug: page.slugs,
    }));
  },

  withImage: (slugs: string[], options: { title: string; description: string }): Metadata => {
    const { description, title } = options;

    return {
      description,
      openGraph: {
        description,
        images: [
          {
            alt: title,
            height: 630,
            url: `/docs-og?slug=${encodeURIComponent(slugs.join('/'))}`,
            width: 1200,
          },
        ],
        title,
        type: 'article',
        url: `https://devops-engineering.xyz/docs/${slugs.join('/')}`,
      },
      title,
      twitter: {
        card: 'summary_large_image',
        description,
        images: [`/docs-og?slug=${encodeURIComponent(slugs.join('/'))}`],
        title,
      },
    };
  }
};

type BlogOGImageGenerator = (page: NonNullable<ReturnType<typeof blog.getPage>>) => Promise<ImageResponse>;

/**
 * Create and return metadata for blog posts with proper OpenGraph images
 */
export const metadataImageBlog = {
  createAPI: (generator: BlogOGImageGenerator) => {
    return async function GET(req: Request) {
      const url = new URL(req.url);
      const slug = url.searchParams.get('slug')?.split('/') ?? [];
      const page = blog.getPage(slug);

      if (!page) {
        return new Response('Not Found', { status: 404 });
      }

      return generator(page);
    };
  },

  generateParams: () => {
    return blog.getPages().map((page) => ({
      slug: page.slugs,
    }));
  },

  withImage: (slugs: string[], options: { title: string; description: string }): Metadata => {
    const { description, title } = options;

    return {
      description,
      openGraph: {
        description,
        images: [
          {
            alt: title,
            height: 630,
            url: `/blog-og?slug=${encodeURIComponent(slugs.join('/'))}`,
            width: 1200,
          },
        ],
        title,
        type: 'article',
        url: `https://devops-engineering.xyz/blog/${slugs.join('/')}`,
      },
      title,
      twitter: {
        card: 'summary_large_image',
        description,
        images: [`/blog-og?slug=${encodeURIComponent(slugs.join('/'))}`],
        title,
      },
    };
  }
};
