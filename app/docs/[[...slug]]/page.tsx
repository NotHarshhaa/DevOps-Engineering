import { getMDXComponents } from "@/components/docs/mdx-components";
import { metadataImage } from "@/lib/metadata";
import { source } from "@/lib/source";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/page";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  // If no slug is provided (i.e., /docs), use 'index'
  const slugToUse = !params.slug || params.slug.length === 0 ? ['index'] : params.slug;
  const page = source.getPage(slugToUse);

  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <DocsPage
      tableOfContent={{
        footer: <StackzeroApiCta />,
        single: false,
        style: "clerk",
      }}
      toc={page.data.toc}
      full={page.data.full}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody className="">
        <MDX components={getMDXComponents({})} />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  const paths = source.generateParams();
  // Include the root path (empty slug array) in the static paths
  return [{ slug: [] }, ...paths];
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const slugToUse = !params.slug || params.slug.length === 0 ? ['index'] : params.slug;
  const page = source.getPage(slugToUse);
  if (!page) notFound();

  return metadataImage.withImage(page.slugs, {
    description: page.data.description,
    title: page.data.title,
  });
}

const StackzeroApiCta = () => {
  return (
    <div className="mt-6 flex flex-col gap-4 rounded-md border p-2">
      <h1 className="text-lg font-bold">Check out my GitHub repositories</h1>
      <p className="text-sm">
        Check out my GitHub repositories and projects where I share various DevOps tools, infrastructure automation scripts, CI/CD pipelines, and cloud-native applications. You&apos;ll find implementations using technologies like Docker, Kubernetes, Terraform, Jenkins, and more.
      </p>

      <Link
        className="flex items-center gap-2"
        href="https://github.com/NotHarshhaa"
        target="_blank"
      >
        <div className="group relative inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-3 py-1 text-sm transition-colors dark:bg-zinc-100">
          <div className="absolute inset-0 rounded-lg bg-linear-to-r from-indigo-500 via-purple-500 to-teal-500 opacity-60 blur-sm transition-opacity duration-500 group-hover:opacity-80" />
          <div className="relative">
            <span className="text-nowrap text-white dark:text-zinc-900">
              GitHub
            </span>
          </div>
          <ArrowUpRight className="relative h-3.5 w-3.5 text-white/90 dark:text-zinc-900/90" />
        </div>
      </Link>
    </div>
  );
};
