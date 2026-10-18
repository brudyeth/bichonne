import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/Layout";
import { BUSINESS } from "@/lib/business";

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({
    meta: [
      { title: "Mentions légales — Bichonne ta Caisse" },
      { name: "description", content: "Mentions légales du site Bichonne ta Caisse." },
      { property: "og:title", content: "Mentions légales — Bichonne ta Caisse" },
      { property: "og:description", content: "Mentions légales du site Bichonne ta Caisse." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Informations" title="Mentions légales" />
      <section className="container-site max-w-3xl space-y-4 py-14 text-sm leading-relaxed">
        <p>
          <strong>Éditeur :</strong> {BUSINESS.name} — [forme juridique, SIRET et adresse à
          compléter]
        </p>
        <p>
          <strong>Téléphone :</strong> {BUSINESS.phoneDisplay}
        </p>
        <p>
          <strong>Directeur de la publication :</strong> [à compléter]
        </p>
        <p>
          <strong>Hébergement :</strong> [à compléter]
        </p>
      </section>
    </>
  ),
});
