import { getPortfolio } from "@/lib/portfolio";

/**
 * Server-rendered JSON-LD (schema.org) so search engines understand this site
 * is the canonical page for the *person* Mugamba Bruno — the main lever for
 * ranking on his name and qualifying for a Google knowledge panel.
 *
 * A @graph bundles a Person node and a WebSite node that reference each other.
 */
export async function PersonStructuredData() {
  const { profile, skills, experience } = await getPortfolio();
  const knowsAbout = skills.flatMap((group) => group.items);
  const current = experience.find((e) => e.period === "Current") ?? experience[0];

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${profile.site}/#person`,
        name: profile.name,
        alternateName: [profile.shortName, "Mugamba Bruno", "Bruno Mugamba"],
        jobTitle: "Software Engineer & Technical Lead",
        description: profile.summary,
        url: profile.site,
        email: `mailto:${profile.email}`,
        telephone: profile.phone,
        image: `${profile.site}/opengraph-image`,
        knowsAbout,
        sameAs: [profile.github, profile.site],
        worksFor: {
          "@type": "Organization",
          name: current.company,
        },
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "Makerere University",
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Kampala",
          addressCountry: "UG",
        },
        nationality: { "@type": "Country", name: "Uganda" },
      },
      {
        "@type": "WebSite",
        "@id": `${profile.site}/#website`,
        url: profile.site,
        name: `${profile.name} — Portfolio`,
        description: profile.summary,
        inLanguage: "en",
        publisher: { "@id": `${profile.site}/#person` },
        about: { "@id": `${profile.site}/#person` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe to inject; no user input is interpolated.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
