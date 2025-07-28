import { generateOGImage } from "@/lib/generateOGImage";
import { source } from "@/lib/source";
import { Page } from "fumadocs-core/source";

// Use force-static to ensure all paths are generated at build time
export const dynamic = 'force-static';

export async function GET(
  request: Request,
  { params }: { params: { slug: string[] } }
): Promise<Response> {
  const slug = params.slug;

  if (!Array.isArray(slug) || slug.length === 0) {
    return new Response('Not Found - Invalid Slug', { status: 404 });
  }

  const page = source.getPage(slug);

  if (!page) {
    return new Response('Not Found - Page Not Found', { status: 404 });
  }

  return generateOGImage({
    description: page.data.description,
    primaryColor: "#8940ff34",
    primaryTextColor: "rgb(240, 228, 247)",
    site: "devops-engineering.site",
    title: page.data.title,
  }) as unknown as Response;
}

// Generate static paths for all docs pages
export function generateStaticParams() {
  const pages = source.getPages();
  // Make sure we return an empty array if there are no pages
  // This prevents the export path mismatch issue
  if (!pages || pages.length === 0) {
    return [{ slug: ['index'] }];
  }

  return pages.map((page: Page) => ({
    slug: page.slugs && page.slugs.length > 0 ? page.slugs : ['index'],
  }));
}
