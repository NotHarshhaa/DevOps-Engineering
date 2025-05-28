import { blog } from "@/lib/source";
import Link from "next/link";

export default function Page(): React.ReactElement {
  const posts = [...blog.getPages()].sort(
    (a, b) =>
      new Date(b.data.date ?? b.file.name).getTime() -
      new Date(a.data.date ?? a.file.name).getTime()
  );

  return (
    <main className="container mx-auto px-4 py-6 md:py-12">
      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.url}
            href={post.url}
            className="bg-fd-card hover:text-fd-accent-foreground group flex h-full flex-col gap-3 rounded-xl border p-4 transition-all duration-200 hover:border-primary hover:bg-primary/10"
          >
            <div className="flex-1">
              <h2 className="mb-2 font-medium tracking-tight transition-colors group-hover:text-primary">
                {post.data.title}
              </h2>
              <p className="text-fd-muted-foreground line-clamp-2 text-sm">
                {post.data.description}
              </p>
            </div>

            <div className="mt-auto space-y-3">
              <p className="text-fd-muted-foreground text-xs">
                {new Date(post.data.date ?? post.file.name).toDateString()}
              </p>

              <div className="flex flex-wrap gap-2">
                {post.data.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="bg-fd-accent text-fd-accent-foreground text-xs rounded-full px-2 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
