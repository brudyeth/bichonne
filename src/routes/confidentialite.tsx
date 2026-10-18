import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/Layout";

export const Route = createFileRoute("/confidentialite")({
  head: () => ({
    meta: [
      { title: "Politique de confidentialité — Bichonne ta Caisse" },
      { name: "description", content: "Politique de confidentialité du site Bichonne ta Caisse." },
      { property: "og:title", content: "Politique de confidentialité — Bichonne ta Caisse" },
      {
        property: "og:description",
        content: "Comment vos données sont traitées sur le site Bichonne ta Caisse.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Informations" title="Confidentialité" />
      <section className="container-site max-w-3xl space-y-4 py-14 text-sm leading-relaxed">
        <p>
          Le formulaire de demande de devis ne stocke et n'envoie aucune donnée : il prépare un
          message que vous transmettez vous-même par WhatsApp ou par copier-coller.
        </p>
        <p>Les informations que vous nous envoyez servent uniquement à répondre à votre demande.</p>
        <p>
          [Responsable du traitement, durée de conservation et contact pour exercer vos droits : à
          compléter.]
        </p>
      </section>
    </>
  ),
});
