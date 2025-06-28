import type { NextConfig } from "next";
import mdx from "@next/mdx";

const withMdx = mdx({
  extension: /\.mdx?$/,
});

const nextConfig: NextConfig = {
  /* config options here */
  pageExtensions: ["ts", "tsx", "mdx"],
  images: {
    domains: ["images.unsplash.com"],
  },
};

export default withMdx(nextConfig);
