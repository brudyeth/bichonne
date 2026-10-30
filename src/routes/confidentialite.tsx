import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/Layout";

export const Route = createFileRoute("/confidentialite")({
  head: () => ({
    meta: [
      { title: "Politique de confidentialité — Bichonne ta Caisse" },
      { name: "description", content: "Politique de confidentialité du site Bichonne ta Caisse." },
      { property: "og:site_name", content: "Bichonne ta Caisse" },
      { property: "og:title", content: "Politique de confidentialité — Bichonne ta Caisse" },
      {
        property: "og:description",
        content: "Comment vos données sont traitées sur le site Bichonne ta Caisse.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://bichonnetacaisse.fr/confidentialite" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "https://bichonnetacaisse.fr/confidentialite" }],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Informations" title="Confidentialité" />
      <section className="container-site max-w-3xl py-14">
        <div className="rounded-2xl border border-white/10 bg-white p-8 text-[#11114E] shadow-2xl space-y-4 text-sm leading-relaxed">
          <p>
            Le formulaire de demande de devis ne stocke et n'envoie aucune donnée : il prépare un
            message que vous transmettez vous-même par WhatsApp ou par copier-coller.
          </p>
          <p>
            Les informations que vous nous envoyez servent uniquement à répondre à votre demande.
          </p>
          <p>
            [Responsable du traitement, durée de conservation et contact pour exercer vos droits : à
            compléter.]
          </p>
        </div>
      </section>
    </>
  ),
});
