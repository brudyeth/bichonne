import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  Droplets,
  Info,
  MapPin,
  MessageCircle,
  Phone,
  Sofa,
  Zap,
} from "lucide-react";
import { PageHero } from "@/components/site/Layout";
import { TextileLineIcon, TextileSteamIcon } from "@/components/site/TextileIcons";
import { BUSINESS, LOCAL_COMMUNES, TRAVEL_CONDITIONS } from "@/lib/business";
import {
  TEXTILE_FIXED_PRESTATIONS,
  TEXTILE_HONEST_NOTICE,
  TEXTILE_PROCESS_STEPS,
  TEXTILE_QUOTE_PRESTATIONS,
  TEXTILE_STEAM_OPTION,
  getTextileWhatsappLink,
} from "@/lib/textiles";

export const Route = createFileRoute("/canapes-textiles")({
  head: () => ({
    meta: [
      {
        title: "Canapés, matelas & textiles à domicile Lille | Bichonne ta Caisse",
      },
      {
        name: "description",
        content:
          "Nettoyage de canapés (dès 69 €), fauteuils (39 €), matelas (dès 39 €), tapis et chaises à domicile à Lille et métropole lilloise par Bichonne ta Caisse. Déplacement offert jusqu'à 20 km.",
      },
      { property: "og:site_name", content: "Bichonne ta Caisse" },
      {
        property: "og:title",
        content: "Canapés, matelas & textiles à domicile Lille | Bichonne ta Caisse",
      },
      {
        property: "og:description",
        content:
          "Intervention à domicile à Lille : canapé 2–3 places 69 €, 4–5 places 89 €, fauteuil 39 €, matelas 1 place 39 €, matelas 2 places 59 €. Tapis, chaises et canapé d'angle sur devis.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://bichonnetacaisse.fr/canapes-textiles" },
      {
        property: "og:image",
        content: "https://bichonnetacaisse.fr/brand/partage-reseaux-1200x630.png",
      },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:type", content: "image/png" },
      {
        property: "og:image:alt",
        content: "Nettoyage de canapés, matelas et textiles à domicile - Bichonne ta Caisse Lille",
      },
      { property: "og:locale", content: "fr_FR" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Canapés, matelas & textiles à domicile Lille | Bichonne ta Caisse",
      },
      {
        name: "twitter:description",
        content:
          "Nettoyage par injection-extraction de canapés, matelas, fauteuils et tapis à domicile à Lille dès 39 €.",
      },
      {
        name: "twitter:image",
        content: "https://bichonnetacaisse.fr/brand/partage-reseaux-1200x630.png",
      },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "https://bichonnetacaisse.fr/canapes-textiles" }],
  }),
  component: CanapesTextilesPage,
});

const SHARED_INCLUSIONS = [
  "Aspiration minutieuse des fibres",
  "Pré-détachage ciblé",
  "Injection-extraction en profondeur",
  "Extraction maximale de l'humidité",
] as const;

const COMPACT_CARD_DESCRIPTIONS: Record<string, string> = {
  "canape-2-3": "Assises, dossiers, accoudoirs et coussins en tissu.",
  "canape-4-5": "Grand canapé droit familial, méridienne incluse.",
  fauteuil: "Fauteuil individuel en tissu ou microfibre.",
  "matelas-1": "Face de couchage 90×190 ou 90×200 cm.",
  "matelas-2": "Face de couchage 140×190 à 180×200 cm.",
};

function CanapesTextilesPage() {
  return (
    <>
      <div className="relative overflow-hidden bg-[#11114E] text-white">
        {/* Halos continus cohérents avec l'identité Bichonne ta Caisse */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-20 size-[640px] lg:size-[840px] rounded-full bg-[#243888]/22 blur-[150px] lg:blur-[175px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 -left-20 size-[580px] lg:size-[780px] rounded-full bg-[#282A74]/22 blur-[145px] lg:blur-[170px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[45%] right-[12%] size-[320px] rounded-full bg-[#F47721]/[0.06] blur-[115px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-noise opacity-12 mix-blend-overlay"
        />

        <PageHero
          transparent
          eyebrow="Service complémentaire à domicile"
          title="Canapés & textiles à domicile"
        >
          <p>
            Le savoir-faire d'injection-extraction de{" "}
            <strong className="text-white font-semibold">Bichonne ta Caisse</strong> directement
            dans votre salon ou votre chambre : canapés, fauteuils, matelas, tapis, moquettes et
            chaises en tissu, sans déplacer vos meubles.
          </p>

          <div className="mt-4 inline-flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2.5 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-xs sm:text-sm text-white/95">
            <div className="flex items-center gap-2 font-semibold text-primary">
              <MapPin className="size-4 shrink-0" />
              <span>{TRAVEL_CONDITIONS.headline}</span>
            </div>
            <span className="hidden sm:inline text-white/40">•</span>
            <span className="text-white/80 text-xs">{TRAVEL_CONDITIONS.subline}</span>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              to="/contact"
              search={{ activite: "textiles" }}
              className="btn btn-primary text-xs sm:text-sm px-5 py-3 font-bold uppercase tracking-wider shadow-lg"
            >
              <span>Demander un devis / Réserver</span>
              <ArrowRight className="size-4" />
            </Link>
            <a
              href={getTextileWhatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp text-xs sm:text-sm px-4 py-3 font-bold uppercase tracking-wider shadow-md"
            >
              <MessageCircle className="size-4" />
              <span>Devis rapide sur WhatsApp</span>
            </a>
          </div>
        </PageHero>

        {/* ========================================================================= */}
        {/* 1. GRILLE TARIFAIRE REPENSÉE (5 CARTES SUR 1 LIGNE SUR ORDINATEUR)        */}
        {/* ========================================================================= */}
        <section
          id="tarifs-textiles"
          className="relative z-10 pt-6 pb-12 md:pt-8 md:pb-14"
          aria-labelledby="textile-pricing-heading"
        >
          <div className="container-site space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-1.5">
                  <span className="w-6 h-[2px] bg-primary" />
                  <span>Grille tarifaire claire</span>
                </div>
                <h2
                  id="textile-pricing-heading"
                  className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold uppercase tracking-tight text-white"
                >
                  Tarifs canapés, fauteuils &amp; matelas
                </h2>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/85">
                <CheckCircle2 className="size-4 text-primary shrink-0" />
                <span>Intervention à domicile • Règlement après prestation</span>
              </div>
            </div>

            {/* 5 prestations tarifaires sur 1 seule ligne sur ordinateur (lg:grid-cols-5) */}
            <div className="grid gap-3.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 items-stretch">
              {TEXTILE_FIXED_PRESTATIONS.map((item) => {
                const compactDescription = COMPACT_CARD_DESCRIPTIONS[item.id] ?? item.short;
                return (
                  <article
                    key={item.id}
                    id={item.id}
                    className={`group flex flex-col justify-between rounded-2xl p-4 shadow-lg transition-all duration-200 hover:-translate-y-0.5 ${
                      item.popular
                        ? "bg-white text-[#11114E] border-2 border-primary ring-2 ring-primary/15"
                        : "bg-[#E9EDF1] text-[#11114E] border border-slate-300/80"
                    }`}
                  >
                    <div className="flex flex-col items-center text-center">
                      {/* Illustration minimaliste line art */}
                      <div
                        className={`w-full flex items-center justify-center rounded-xl py-2.5 px-2 mb-3 border ${
                          item.popular
                            ? "bg-[#FFF8F3] border-primary/20"
                            : "bg-white/90 border-slate-200/80"
                        }`}
                      >
                        <TextileLineIcon id={item.id} className="w-[78px] h-[46px]" />
                      </div>

                      {/* Nom de la prestation */}
                      <h3 className="font-display text-[19px] font-bold uppercase tracking-wide text-[#11114E] leading-tight min-h-[2.4rem] flex items-center justify-center">
                        {item.name}
                      </h3>

                      {/* Prix mis en évidence */}
                      <div className="mt-2 mb-1.5">
                        <span className="font-display text-[40px] font-bold text-primary leading-none tracking-tight tabular-nums">
                          {item.priceLabel}
                        </span>
                      </div>

                      {/* Durée indicative (visuellement secondaire par rapport au prix) */}
                      <div className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 mb-2.5">
                        <Clock className="size-3 text-slate-400 shrink-0" />
                        <span>{item.duration}</span>
                      </div>

                      {/* Description courte et lisible */}
                      <p className="text-xs text-slate-600 leading-snug">{compactDescription}</p>
                    </div>

                    {/* Action directe */}
                    <div className="mt-4 pt-3 border-t border-slate-300/50">
                      <Link
                        to="/contact"
                        search={{ activite: "textiles", prestation: item.id }}
                        className={`btn w-full min-h-10 py-2 px-3 text-xs font-bold uppercase tracking-wider ${
                          item.popular
                            ? "btn-primary shadow-md"
                            : "bg-[#11114E] text-white hover:bg-[#11114E]/90 shadow-sm"
                        }`}
                      >
                        <span>Choisir</span>
                        <ArrowRight className="size-3.5" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Option complémentaire : Traitement vapeur (bandeau élégant sous les 5 cartes) */}
            <div className="rounded-2xl bg-white/95 text-[#11114E] border border-primary/30 shadow-md px-4 py-3.5 sm:px-6 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 sm:gap-5">
              <div className="flex items-start sm:items-center gap-3.5">
                <div className="grid size-11 sm:size-12 shrink-0 place-items-center rounded-xl bg-[#FFF8F3] border border-primary/20">
                  <TextileSteamIcon className="size-8" />
                </div>
                <div className="space-y-1">
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-primary">
                    Option complémentaire
                  </span>
                  <h3 className="font-display text-lg sm:text-xl font-bold uppercase tracking-wide text-[#11114E] leading-tight">
                    {TEXTILE_STEAM_OPTION.name}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed max-w-2xl">
                    {TEXTILE_STEAM_OPTION.short}
                  </p>
                </div>
              </div>

              <div className="flex sm:flex-col items-baseline sm:items-end justify-between sm:justify-center gap-1.5 shrink-0 border-t sm:border-t-0 border-slate-200/80 pt-2.5 sm:pt-0 sm:pl-5 sm:border-l">
                <span className="font-display text-3xl sm:text-[34px] font-bold text-primary leading-none tabular-nums">
                  {TEXTILE_STEAM_OPTION.priceLabel}
                </span>
                <span className="text-xs font-semibold text-[#11114E] sm:text-right">
                  {TEXTILE_STEAM_OPTION.unitLabel}
                </span>
              </div>
            </div>

            {/* Rappel compact des étapes incluses dans chaque tarif */}
            <div className="rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 flex flex-wrap items-center justify-between gap-x-5 gap-y-2 text-xs text-white/90">
              <span className="font-bold uppercase tracking-wider text-primary text-[11px]">
                Inclus dans chaque formule :
              </span>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
                {SHARED_INCLUSIONS.map((step) => (
                  <span key={step} className="inline-flex items-center gap-1.5 font-medium">
                    <Check className="size-3.5 text-primary shrink-0" strokeWidth={2.5} />
                    <span>{step}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Prestations sur devis (Canapé d'angle/U + Tapis, moquette, chaises) */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                <span className="w-6 h-[2px] bg-primary" />
                <span>Formats spécifiques &amp; grandes surfaces</span>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {TEXTILE_QUOTE_PRESTATIONS.map((item) => (
                  <article
                    key={item.id}
                    id={item.id}
                    className="flex flex-col justify-between rounded-2xl bg-white text-[#11114E] border border-slate-200 p-5 shadow-lg space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="font-display text-xl font-bold uppercase tracking-wide text-[#11114E]">
                          {item.name}
                        </h3>
                        <span className="font-display text-lg sm:text-xl font-bold uppercase text-primary">
                          Sur devis
                        </span>
                      </div>
                      {item.unitNote && (
                        <p className="text-xs font-semibold text-slate-600">
                          Tarif établi <span className="text-[#11114E]">{item.unitNote}</span>
                        </p>
                      )}
                      <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                        {item.short}
                      </p>
                      <ul className="space-y-1.5 pt-1 text-xs text-[#11114E]">
                        {item.includes.map((inc) => (
                          <li key={inc} className="flex items-start gap-2 leading-snug">
                            <Check
                              className="size-3.5 text-primary shrink-0 mt-0.5"
                              strokeWidth={2.5}
                            />
                            <span className="font-medium">{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                      <Link
                        to="/contact"
                        search={{ activite: "textiles", prestation: item.id }}
                        className="btn btn-primary flex-1 text-xs font-bold uppercase tracking-wider py-2.5"
                      >
                        <span>Demander un devis</span>
                        <ArrowRight className="size-4" />
                      </Link>
                      <a
                        href={getTextileWhatsappLink(
                          `${item.name} (${item.unitNote ?? "sur devis"})`,
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline border-slate-300 text-[#11114E] hover:bg-slate-100 text-xs font-bold uppercase tracking-wider py-2.5 px-4"
                      >
                        <MessageCircle className="size-4 text-emerald-600" />
                        <span>Envoyer une photo</span>
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Mention honnête sur les résultats */}
            <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-4 sm:p-5 flex items-start gap-3 text-xs sm:text-[13px] text-white/85 leading-relaxed">
              <Info className="size-4 text-primary shrink-0 mt-0.5" />
              <p>{TEXTILE_HONEST_NOTICE}</p>
            </div>
          </div>
        </section>
      </div>

      {/* ========================================================================= */}
      {/* 2. MÉTHODE D'INTERVENTION EN 4 ÉTAPES                                     */}
      {/* ========================================================================= */}
      <section
        className="relative bg-gradient-to-b from-[#FAFBFD] via-[#F4F6FB] to-[#EDF1F7] text-[#11114E] py-12 md:py-14"
        aria-labelledby="textile-method-heading"
      >
        <div className="container-site space-y-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-2">
              <span className="w-6 h-[2px] bg-primary" />
              <span>Méthode professionnelle</span>
            </div>
            <h2
              id="textile-method-heading"
              className="text-2xl sm:text-3xl md:text-4xl font-display font-bold uppercase tracking-tight text-[#11114E]"
            >
              Comment nous nettoyons vos textiles à domicile
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              Chaque intervention suit un protocole en 4 étapes adapté aux tissus d'ameublement et
              aux matelas, pour un résultat net sans détremper les mousses internes.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TEXTILE_PROCESS_STEPS.map((s) => (
              <div
                key={s.step}
                className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-sm space-y-2"
              >
                <span className="font-display text-2xl font-bold text-primary block">
                  {s.step}.
                </span>
                <h3 className="font-display text-lg font-bold uppercase tracking-wide text-[#11114E]">
                  {s.title}
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. ZONE DESSERVIE & CONDITIONS PRATIQUES + CTA                            */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden bg-[#11114E] text-white py-12 md:py-14 border-t border-white/10">
        <div className="container-site">
          <div className="grid gap-6 lg:grid-cols-12 items-start">
            <div className="lg:col-span-7 rounded-2xl border border-white/15 bg-white/[0.05] p-6 space-y-4">
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                <MapPin className="size-4 shrink-0" />
                <span>Zone d'intervention</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-white">
                À domicile à Lille et dans toute la métropole lilloise
              </h2>
              <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                {TRAVEL_CONDITIONS.notice}
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {LOCAL_COMMUNES.map((c) => (
                  <span
                    key={c.name}
                    className="rounded-lg border border-white/15 bg-white/[0.06] px-2.5 py-1 text-xs font-medium text-white/90"
                  >
                    {c.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 rounded-2xl border border-white/15 bg-[#E9EDF1] text-[#11114E] p-6 space-y-4 shadow-xl">
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                <Sofa className="size-4 shrink-0" />
                <span>Infos pratiques sur place</span>
              </div>
              <h3 className="font-display text-2xl font-bold uppercase tracking-wide text-[#11114E]">
                De quoi avons-nous besoin chez vous ?
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <Zap className="size-4 text-primary shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#11114E]">Une prise électrique classique</strong> à
                    proximité du canapé, matelas ou tapis.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Droplets className="size-4 text-primary shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#11114E]">Un point d'eau accessible</strong> (robinet
                    d'évier, salle de bain ou extérieur) pour remplir l'appareil.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Clock className="size-4 text-primary shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#11114E]">3 à 6 h de séchage</strong> : pensez à aérer
                    la pièce après l'intervention.
                  </span>
                </li>
              </ul>

              <div className="pt-2 flex flex-col gap-2.5">
                <Link
                  to="/contact"
                  search={{ activite: "textiles" }}
                  className="btn btn-primary w-full py-3 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-md"
                >
                  <span>Demander un devis ou réserver</span>
                  <ArrowRight className="size-4" />
                </Link>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={BUSINESS.phoneTel}
                    className="btn bg-[#11114E] text-white hover:bg-[#11114E]/90 py-2.5 text-xs font-bold uppercase tracking-wider"
                  >
                    <Phone className="size-3.5 text-primary" />
                    <span>{BUSINESS.phoneDisplay}</span>
                  </a>
                  <a
                    href={getTextileWhatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp py-2.5 text-xs font-bold uppercase tracking-wider"
                  >
                    <MessageCircle className="size-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
