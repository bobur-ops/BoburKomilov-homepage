export default function PersonSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Muxammadbobur Komiljonov",
    alternateName: [
      "Bobur Komiljonov",
      "Muxammad Bobur",
      "Muhammad Bobur",
      "Muhammad Bobur Komiljonov",
      "Muhammadbobur Komiljonov",
      "Muxammad Bobur Komiljonov",
      "Muxammadbobur",
      "Muhammadbobur",
      "Bobur",
    ],
    url: "https://bobur.me",
    jobTitle: "Frontend Developer",
    description:
      "Frontend developer from Tashkent specializing in React, Vue, and scalable web applications.",
    email: "mailto:boburkomilovv@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tashkent",
      addressCountry: "UZ",
    },
    sameAs: [
      "https://github.com/bobur-ops",
      "https://www.linkedin.com/in/boburkomiljonov",
      "https://bobur.me/cv_en.pdf",
      "https://bobur.me/cv_ru.pdf",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}
