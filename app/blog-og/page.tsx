import { redirect } from "next/navigation";

export default function BlogOGFallback() {
  // Redirect to the blog page if someone tries to access /blog-og directly
  redirect("/blog");

  // This won't render, but TypeScript requires a return
  return null;
}
