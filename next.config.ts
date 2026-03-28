import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gadgetarium-b16.s3.eu-central-1.amazonaws.com",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
