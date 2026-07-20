import { createFileRoute } from "@tanstack/react-router";
import Landing from "@/components/site/Landing";

export const Route = createFileRoute("/")({
  head: () => ({
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Visionary AI Automations",
          description:
            "Enterprise AI automation agency building custom workflows, WhatsApp chatbots, voice agents, and premium websites.",
          url: "/",
        }),
      },
    ],
  }),
  component: Landing,
});
