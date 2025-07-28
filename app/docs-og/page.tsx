import { redirect } from "next/navigation";

export default function DocsOGFallback() {
  // Redirect to the docs page if someone tries to access /docs-og directly
  redirect("/docs");

  // This won't render, but TypeScript requires a return
  return null;
}
