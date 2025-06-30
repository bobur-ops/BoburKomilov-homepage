import type { NextConfig } from "next";
import mdx from "@next/mdx";

const withMdx = mdx({
  extension: /\.mdx?$/,
});

const nextConfig: NextConfig = {
  /* config options here */
  pageExtensions: ["ts", "tsx", "mdx"],
  images: {
    domains: [
      "images.unsplash.com",
      "www.notion.so",
      "notion.so",
      "s3.us-west-2.amazonaws.com",
    ],
  },
};

export default withMdx(nextConfig);
