export default function sitemap() {
  const baseUrl = "https://www.chinmayakumarmishra.sbs";

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
