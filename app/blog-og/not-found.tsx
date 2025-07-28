import { redirect } from "next/navigation";

export default function BlogOGNotFound() {
  // Redirect to the blog page if a blog OG route is not found
  redirect("/blog");

  // This won't render, but TypeScript requires a return
  return null;
}
