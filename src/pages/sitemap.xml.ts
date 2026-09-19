import type { APIRoute } from "astro";
import { brand } from "../data/brand";

export const prerender = true;

const indexableRoutes = [
  "",
  "/services",
  "/services/crm",
  "/services/workflow-automation",
  "/services/integrations",
  "/services/ai-assisted-automation",
  "/services/reporting-visibility",
  "/use-cases",
  "/how-we-work",
  "/capabilities",
  "/about",
  "/contact",
  "/privacy",
  "/terms"
];

export const GET: APIRoute = async () => {
  const currentDate = new Date().toISOString().split("T")[0];

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexableRoutes
  .map(
    (route) => `  <url>
    <loc>${brand.canonicalOrigin}${route}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route === "" ? "weekly" : "monthly"}</changefreq>
    <priority>${route === "" ? "1.0" : route.startsWith("/services") ? "0.8" : "0.7"}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(xmlContent, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400"
    }
  });
};
