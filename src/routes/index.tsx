import { createFileRoute } from "@tanstack/react-router";
import Landing from "@/components/site/Landing";

export const Route = createFileRoute("/")({
  head: () => ({
    links: [{ rel: "canonical", href: "https://www.visionaryaiautomations.com/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "@id": "https://www.visionaryaiautomations.com/#business",
          name: "Visionary AI Automations",
          description:
            "Hyderabad-based AI automation agency: WhatsApp & website AI chatbots, AI voice agents, appointment booking automation, CRM, n8n workflows, websites and video.",
          url: "https://www.visionaryaiautomations.com/",
          telephone: "+91-9491071248",
          priceRange: "₹₹",
          address: {
            "@type": "PostalAddress",
            streetAddress: "MBD Complex, HMT Nagar, Nacharam",
            addressLocality: "Hyderabad",
            addressRegion: "Telangana",
            postalCode: "500076",
            addressCountry: "IN",
          },
          areaServed: [
            { "@type": "State", name: "Telangana" },
            { "@type": "State", name: "Andhra Pradesh" },
          ],
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
              opens: "09:00",
              closes: "22:00",
            },
          ],
          sameAs: ["https://www.linkedin.com/company/145492277/"],
        }),
      },
    ],
  }),
  component: Landing,
});
