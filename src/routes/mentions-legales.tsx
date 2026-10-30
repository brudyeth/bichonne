import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/Layout";
import { BUSINESS } from "@/lib/business";

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({
    meta: [
      { title: "Mentions légales — Bichonne ta Caisse" },
      { name: "description", content: "Mentions légales du site Bichonne ta Caisse." },
      { property: "og:site_name", content: "Bichonne ta Caisse" },
      { property: "og:title", content: "Mentions légales — Bichonne ta Caisse" },
      { property: "og:description", content: "Mentions légales du site Bichonne ta Caisse." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://bichonnetacaisse.fr/mentions-legales" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "https://bichonnetacaisse.fr/mentions-legales" }],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Informations" title="Mentions légales" />
      <section className="container-site max-w-3xl py-14">
        <div className="rounded-2xl border border-white/10 bg-white p-8 text-[#11114E] shadow-2xl space-y-4 text-sm leading-relaxed">
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
        </div>
      </section>
    </>
  ),
});
