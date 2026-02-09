export const SITE_URL = "https://bobur.me";

export const PRIMARY_NAME = "Muxammadbobur Komiljonov";

export const NAME_VARIATIONS = [
  "Muhammadbobur Komiljonov",
  "Muxammadbobur Komiljonov",
  "Muhammad bobur Komiljonov",
  "Muxammad bobur Komiljonov",
];

export const SAME_AS_PROFILES = [
  "https://github.com/bobur-ops",
  "https://www.linkedin.com/in/boburkomiljonov",
];

export const DEFAULT_DESCRIPTION =
  "Frontend developer portfolio and blog of Muxammadbobur Komiljonov, sharing practical notes on React, TypeScript, architecture, and modern web development.";

export const DEFAULT_KEYWORDS = [
  PRIMARY_NAME,
  ...NAME_VARIATIONS,
  "frontend developer",
  "React developer",
  "TypeScript developer",
  "Tashkent frontend engineer",
];

export function toAbsoluteUrl(pathOrUrl: string): string {
  return new URL(pathOrUrl, SITE_URL).toString();
}

export function getPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PRIMARY_NAME,
    alternateName: NAME_VARIATIONS,
    url: SITE_URL,
    jobTitle: "Frontend Developer",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tashkent",
      addressCountry: "UZ",
    },
    sameAs: SAME_AS_PROFILES,
  };
}

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: PRIMARY_NAME,
    alternateName: NAME_VARIATIONS,
    url: SITE_URL,
  };
}
