import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Copy, MessageCircle, Phone, Check } from "lucide-react";
import { PageHero, Facebook3DIcon, Instagram3DIcon } from "@/components/site/Layout";
import { BUSINESS, CARES, FORMULAS, euro, whatsappLink } from "@/lib/business";

type Search = { formule?: string | undefined };

export const Route = createFileRoute("/contact")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    formule:
      typeof s["formule"] === "string" && FORMULAS.some((f) => f.id === s["formule"])
        ? s["formule"]
        : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Devis Nettoyage Voiture à Domicile Lille | Bichonne ta Caisse" },
      {
        name: "description",
        content:
          "Demandez votre devis gratuit de nettoyage auto à domicile à Lille, Wambrechies et métropole lilloise : téléphone 06 59 14 09 39, WhatsApp ou formulaire rapide.",
      },
      { property: "og:site_name", content: "Bichonne ta Caisse" },
      {
        property: "og:title",
        content: "Devis Nettoyage Voiture à Domicile Lille | Bichonne ta Caisse",
      },
      {
        property: "og:description",
        content:
          "Appelez le 06 59 14 09 39, écrivez-nous sur WhatsApp ou préparez votre demande en ligne pour une intervention rapide à domicile.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://bichonnetacaisse.fr/contact" },
      { property: "og:image", content: "https://bichonnetacaisse.fr/og-image.jpg" },
      { property: "og:image:width", content: "1280" },
      { property: "og:image:height", content: "960" },
      {
        property: "og:image:alt",
        content: "Devis nettoyage voiture à domicile - Bichonne ta Caisse Lille",
      },
      { property: "og:locale", content: "fr_FR" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Devis Nettoyage Voiture à Domicile Lille | Bichonne ta Caisse",
      },
      {
        name: "twitter:description",
        content:
          "Demandez votre devis gratuit de nettoyage auto à domicile à Lille, Wambrechies et métropole lilloise : téléphone 06 59 14 09 39, WhatsApp ou formulaire rapide.",
      },
      { name: "twitter:image", content: "https://bichonnetacaisse.fr/og-image.jpg" },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "https://bichonnetacaisse.fr/contact" }],
  }),
  component: Page,
});

const field =
  "w-full rounded-xl border border-input bg-background px-4 py-3 text-base outline-none focus:ring-2 focus:ring-ring";

function Page() {
  const { formule } = Route.useSearch();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [formula, setFormula] = useState(formule ?? "");
  const [cares, setCares] = useState<string[]>([]);
  const [area, setArea] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const f = FORMULAS.find((x) => x.id === formula);
  const selectedCares = CARES.filter((c) => cares.includes(c.id));
  const total = (f?.price ?? 0) + selectedCares.reduce((s, c) => s + c.price, 0);

  const summary = useMemo(() => {
    const lines = [
      "Bonjour, je souhaite un devis Bichonne ta Caisse.",
      `Nom : ${name || "-"}`,
      `Contact : ${contact || "-"}`,
      `Formule : ${f ? `${f.name} (${euro(f.price)})` : "à définir"}`,
      `Soins ciblés : ${selectedCares.length ? selectedCares.map((c) => `${c.name} (${euro(c.price)})`).join(", ") : "aucun"}`,
      `Commune / secteur : ${area || "-"}`,
    ];
    if (total) lines.push(`Total indicatif : ${euro(total)}`);
    if (message) lines.push(`Message : ${message}`);
    return lines.join("\n");
  }, [name, contact, f, selectedCares, area, message, total]);

  const valid = () => {
    if (!name.trim() || !contact.trim() || !area.trim()) {
      setError("Merci d'indiquer votre nom, un moyen de contact et votre commune.");
      return false;
    }
    setError("");
    return true;
  };

  const sendWhatsApp = () => {
    if (valid()) window.open(whatsappLink(summary), "_blank", "noopener");
  };
  const copy = async () => {
    if (!valid()) return;
    await navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <PageHero eyebrow="Contact & Devis gratuit" title="Devis nettoyage auto à domicile à Lille">
        Intervention directement à votre domicile ou sur votre lieu de travail à Lille, Wambrechies,
        Marcq-en-Barœul, Lambersart et communes voisines. Appelez-nous au 06 59 14 09 39,
        écrivez-nous sur WhatsApp ou préparez votre demande ci-dessous.
      </PageHero>
      <section className="container-site grid gap-10 py-14 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-4">
          <a
            href={BUSINESS.phoneTel}
            className="flex items-center gap-4 rounded-2xl bg-night p-6 text-night-foreground"
          >
            <Phone className="size-8 text-primary" />
            <div>
              <p className="text-sm opacity-70">Par téléphone</p>
              <p className="font-display text-3xl font-bold">{BUSINESS.phoneDisplay}</p>
            </div>
          </a>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-2xl btn-whatsapp p-6"
          >
            <MessageCircle className="size-8" />
            <div>
              <p className="text-sm opacity-80">Message rapide</p>
              <p className="font-display text-3xl font-bold">WhatsApp</p>
            </div>
          </a>
          <a
            href={BUSINESS.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Suivez-nous sur Facebook (ouvre un nouvel onglet)"
            className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-secondary/40"
          >
            <Facebook3DIcon className="size-8" />
            <div>
              <p className="text-xs text-muted-foreground">Réseaux sociaux</p>
              <p className="text-sm font-semibold text-foreground">Suivez-nous sur Facebook</p>
            </div>
          </a>
          <a
            href={BUSINESS.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Suivez-nous sur Instagram (ouvre un nouvel onglet)"
            className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-secondary/40"
          >
            <Instagram3DIcon className="size-8" />
            <div>
              <p className="text-xs text-muted-foreground">Réseaux sociaux</p>
              <p className="text-sm font-semibold text-foreground">Suivez-nous sur Instagram</p>
            </div>
          </a>
          <p className="text-sm text-muted-foreground">
            Intervention dans la métropole lilloise. Nous vous recontactons pour convenir ensemble
            de l'intervention.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendWhatsApp();
          }}
          className="space-y-5 rounded-2xl border bg-card p-6 md:p-8"
          noValidate
        >
          <h2 className="text-4xl">Préparer ma demande</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-1.5">
              <span className="text-sm font-semibold">Nom *</span>
              <input
                className={field}
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
            </label>
            <label className="space-y-1.5">
              <span className="text-sm font-semibold">Téléphone ou e-mail *</span>
              <input
                className={field}
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </label>
          </div>
          <label className="block space-y-1.5">
            <span className="text-sm font-semibold">Formule souhaitée</span>
            <select className={field} value={formula} onChange={(e) => setFormula(e.target.value)}>
              <option value="">À définir ensemble</option>
              {FORMULAS.map((x) => (
                <option key={x.id} value={x.id}>
                  {x.name} — {euro(x.price)}
                </option>
              ))}
            </select>
          </label>
          <fieldset className="space-y-2">
            <legend className="text-sm font-semibold">Soins ciblés (facultatif)</legend>
            {CARES.map((c) => (
              <label
                key={c.id}
                className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border px-4 py-3 has-[:checked]:border-primary has-[:checked]:bg-secondary"
              >
                <span className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="size-4 accent-primary"
                    checked={cares.includes(c.id)}
                    onChange={(e) =>
                      setCares(
                        e.target.checked ? [...cares, c.id] : cares.filter((x) => x !== c.id),
                      )
                    }
                  />
                  {c.name}
                </span>
                <span className="font-bold text-primary">{euro(c.price)}</span>
              </label>
            ))}
          </fieldset>
          <label className="block space-y-1.5">
            <span className="text-sm font-semibold">Commune / secteur *</span>
            <input
              className={field}
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="Ex. : Wambrechies"
            />
          </label>
          <label className="block space-y-1.5">
            <span className="text-sm font-semibold">Message complémentaire</span>
            <textarea
              className={field}
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </label>

          <div className="flex items-center justify-between rounded-xl bg-secondary px-5 py-4">
            <span className="font-semibold">Total indicatif</span>
            <span className="font-display text-4xl font-bold text-primary">
              {total ? euro(total) : "—"}
            </span>
          </div>
          {error && (
            <p role="alert" className="text-sm font-semibold text-destructive">
              {error}
            </p>
          )}
          <div className="flex flex-wrap gap-3">
            <button type="submit" className="btn btn-whatsapp">
              <MessageCircle className="size-4" />
              Envoyer via WhatsApp
            </button>
            <button type="button" onClick={copy} className="btn btn-outline">
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
              {copied ? "Copié !" : "Copier ma demande"}
            </button>
          </div>
          <p className="text-xs text-muted-foreground">
            Ce formulaire n'envoie rien automatiquement : il prépare votre message à transmettre par
            WhatsApp, ou à copier pour l'envoyer par SMS.
          </p>
        </form>
      </section>
    </>
  );
}
