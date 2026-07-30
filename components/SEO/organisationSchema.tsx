export default function OrganizationSchema() {
  const data = {
    "@context": "https://schema.org",

    "@type": "CollegeOrUniversity",

    name: "Integrated Oasis Institute of Technology",

    url: "https://oasisintech.com",

    logo: "https://oasisintech.com/logo.png",

    image: "https://oasisintech.com/images/seo-banner.jpg",

    telephone: "+2349114243025",

    email: "info@oasisintech.com",

    address: {
      "@type": "PostalAddress",

      streetAddress: "23 portharcourt road owerri",

      addressLocality: "Owerri",

      addressRegion: "Imo",

      postalCode: "460110",

      addressCountry: "NG",
    },

    sameAs: [
      "https://facebook.com/yourpage",
      "https://linkedin.com/company/yourpage",
      "https://instagram.com/yourpage",
      "https://x.com/yourpage",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}
