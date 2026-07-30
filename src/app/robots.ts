import type { MetadataRoute } from "next";

import { SITE_URL } from "@/shared/constants";

const robots = (): MetadataRoute.Robots => {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/*/admin",
      },
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: "/*/admin",
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: "/*/admin",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
};

export default robots;
