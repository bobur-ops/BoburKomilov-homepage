/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://bobur.me",
  generateRobotsTxt: true,
  sitemapSize: 50000,
  trailingSlash: false,
  generateIndexSitemap: false,

  transform: async (config, path) => {
    // Set homepage priority to 1.0
    const priority = path === "/" || path === "" ? 1.0 : 0.7;

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
};
