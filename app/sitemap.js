export default function sitemap() {
  const baseUrl = "https://chinmayakumarmishra.sbs";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
  ];
}

