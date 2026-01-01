/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://bobur.me/",
  generateRobotsTxt: true,
  sitemapSize: 50000,
  trailingSlash: true,
  generateIndexSitemap: false,
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: path === "/" ? 1.0 : 0.7,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
};
