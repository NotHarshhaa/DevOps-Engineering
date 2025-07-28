import { redirect } from "next/navigation";

export default function DocsOGNotFound() {
  // Redirect to the docs page if a docs OG route is not found
  redirect("/docs");

  // This won't render, but TypeScript requires a return
  return null;
}
