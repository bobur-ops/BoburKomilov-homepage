export default function PersonSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Muxammadbobur Komiljonov",
    alternateName: [
      "Bobur Komiljonov",
      "Muxammad Bobur",
      "Muhammad Bobur Komiljonov",
      "Muhammadbobur Komiljonov",
      "Muxammad Bobur Komiljonov",
      "Muxammadbobur",
      "Muhammadbobur",
    ],
    url: "https://bobur.me",
    jobTitle: "Frontend Developer",
    address: {
      "@type": "Place",
      addressLocality: "Tashkent",
      addressCountry: "UZ",
    },
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
