import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { PageHero, ContactBand } from "@/components/site/Layout";
import { BUSINESS, whatsappLink } from "@/lib/business";
import {
  Building2,
  Car,
  CheckCircle2,
  Phone,
  MessageCircle,
  FileText,
  Clock,
  Sparkles,
  ArrowRight,
  User,
  Mail,
  AlertCircle,
  Send,
  Loader2,
} from "lucide-react";

export const Route = createFileRoute("/entreprises")({
  head: () => ({
    meta: [
      {
        title: "Nettoyage Flottes & Véhicules Pro Lille | Bichonne ta Caisse",
      },
      {
        name: "description",
        content:
          "Service de nettoyage automobile sur site pour entreprises, flottes pro et comités d'entreprise à Lille et métropole. Devis rapide et facturation conforme.",
      },
      { property: "og:site_name", content: "Bichonne ta Caisse" },
      {
        property: "og:title",
        content: "Nettoyage Flottes & Véhicules Pro Lille | Bichonne ta Caisse",
      },
      {
        property: "og:description",
        content:
          "Entreprises & Flottes : nettoyage automobile professionnel sur votre parking d'entreprise dans toute la métropole lilloise.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://bichonnetacaisse.fr/entreprises" },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "https://bichonnetacaisse.fr/entreprises" }],
  }),
  component: EntreprisesPage,
});

const B2B_ADVANTAGES = [
  {
    icon: Building2,
    title: "Sur votre parking",
    subtitle: "ZÉRO DÉPLACEMENT DE COLLABORATEURS",
    text: "Nous intervenons directement sur le parking de votre société ou sur votre site d'activité sans immobiliser vos équipes.",
  },
  {
    icon: Clock,
    title: "Optimisation du temps",
    subtitle: "RENDEZ-VOUS GROUPÉS",
    text: "Possibilité de traiter plusieurs véhicules dans la même demi-journée ou journée selon votre planning d'entreprise.",
  },
  {
    icon: FileText,
    title: "Facturation pro claire",
    subtitle: "DEVIS & FACTURATION CONFORME",
    text: "Devis préalable détaillé, facturation centralisée pour votre comptabilité et suivi sur mesure.",
  },
  {
    icon: Sparkles,
    title: "Image de marque soignée",
    subtitle: "VÉHICULES PRO IRRÉPROCHABLES",
    text: "Des véhicules commerciaux, de direction ou de fonction impeccables pour valoriser l'image de votre société auprès de vos clients.",
  },
];

const B2B_OFFERS = [
  {
    title: "Nettoyage de flottes commerciales",
    desc: "Entretien régulier ou ponctuel de vos citadines et utilitaires d'entreprise. Dépoussiérage, désinfection de l'habitacle et lavage soigné.",
    highlight: "Pour 2 à 15+ véhicules",
  },
  {
    title: "Véhicules de direction & fonction",
    desc: "Formule esthétique approfondie avec shampoing des selleries, soin des cuirs et finition minutieuse pour vos cadres et dirigeants.",
    highlight: "Prestation haut de gamme",
  },
  {
    title: "Remise en état avant restitution leasing (LOA/LLD)",
    desc: "Nettoyage en profondeur intérieur et extérieur pour éviter les pénalités et frais de dépréciation exorbitants lors de la restitution.",
    highlight: "Économies substantielles",
  },
  {
    title: "Avantage salarié & Comité d'Entreprise (CSE)",
    desc: "Journée « Bichonnage » organisée sur site : vos salariés profitent du nettoyage de leur véhicule personnel pendant leurs heures de bureau.",
    highlight: "Avantage bien-être au travail",
  },
];

const VEHICLE_COUNT_OPTIONS = [
  "1 véhicule",
  "2 à 5 véhicules",
  "6 à 10 véhicules",
  "Plus de 10 véhicules",
] as const;

function isValidFrenchPhoneNumber(input: string): boolean {
  if (!input) return false;
  let cleaned = input.trim().replace(/[\s\u00A0.\-_/()]/g, "");

  if (cleaned.startsWith("+330")) {
    cleaned = "+33" + cleaned.slice(4);
  } else if (cleaned.startsWith("00330")) {
    cleaned = "0033" + cleaned.slice(5);
  }

  if (cleaned.startsWith("+33")) {
    cleaned = "0" + cleaned.slice(3);
  } else if (cleaned.startsWith("0033")) {
    cleaned = "0" + cleaned.slice(4);
  }

  return /^0[1-9]\d{8}$/.test(cleaned);
}

function isValidEmail(input: string): boolean {
  const trimmed = input.trim();
  if (!trimmed) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(trimmed);
}

function scrollToDevisSection(e?: React.MouseEvent) {
  if (e) e.preventDefault();
  const el = document.getElementById("devis") || document.getElementById("devis-pro");
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

function ProQuoteForm() {
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [vehicleCount, setVehicleCount] = useState<string>("2 à 5 véhicules");
  const [description, setDescription] = useState("");
  const [hp, setHp] = useState("");

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Validation côté client
    if (!companyName.trim()) {
      setErrorMessage("Veuillez renseigner le nom de votre entreprise.");
      return;
    }
    if (!contactName.trim()) {
      setErrorMessage("Veuillez renseigner le nom et prénom du contact.");
      return;
    }
    if (!phone.trim()) {
      setErrorMessage("Veuillez renseigner un numéro de téléphone.");
      return;
    }
    if (!isValidFrenchPhoneNumber(phone)) {
      setErrorMessage(
        "Veuillez renseigner un numéro de téléphone valide à 10 chiffres (ex. : 06 12 34 56 78).",
      );
      return;
    }
    if (!email.trim()) {
      setErrorMessage("Veuillez renseigner votre adresse e-mail professionnelle.");
      return;
    }
    if (!isValidEmail(email)) {
      setErrorMessage("Veuillez renseigner une adresse e-mail professionnelle valide.");
      return;
    }
    if (!vehicleCount.trim()) {
      setErrorMessage("Veuillez sélectionner le nombre de véhicules concernés.");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/contact-pro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyName: companyName.trim(),
          contactName: contactName.trim(),
          phone: phone.trim(),
          email: email.trim(),
          vehicleCount: vehicleCount.trim(),
          description: description.trim(),
          hp: hp.trim(),
        }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        success?: boolean;
        message?: string;
        error?: string;
      };

      if (!res.ok || !data.success) {
        setStatus("error");
        setErrorMessage(
          data.error ||
            data.message ||
            "Une erreur est survenue lors de l'envoi. Veuillez nous contacter directement au 06 59 14 09 39 ou via WhatsApp.",
        );
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage(
        "Une erreur réseau est survenue. Veuillez vérifier votre connexion ou nous contacter directement au 06 59 14 09 39.",
      );
    }
  };

  const handleReset = () => {
    setCompanyName("");
    setContactName("");
    setPhone("");
    setEmail("");
    setVehicleCount("2 à 5 véhicules");
    setDescription("");
    setStatus("idle");
    setErrorMessage("");
  };

  const fieldClass =
    "w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 sm:px-4 sm:py-3 text-sm text-[#11114E] placeholder:text-slate-400 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all";

  return (
    <section
      id="devis"
      className="relative overflow-hidden bg-[#11114E] text-white py-12 sm:py-16 md:py-20 scroll-mt-16"
      aria-labelledby="devis-pro-heading"
    >
      <div id="devis-pro" className="scroll-mt-16" aria-hidden="true" />
      {/* Halos subtils */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-20 size-[600px] rounded-full bg-[#243888]/22 blur-[150px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -right-20 size-[550px] rounded-full bg-[#282A74]/20 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-noise opacity-10 mix-blend-overlay"
      />

      <div className="container-site relative z-10 max-w-3xl">
        {/* En-tête de section */}
        <div className="text-center space-y-2 mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
            <span className="w-6 h-[2px] bg-primary"></span>
            <span>Devis sur mesure • Flottes & Entreprises</span>
            <span className="w-6 h-[2px] bg-primary"></span>
          </div>
          <h2
            id="devis-pro-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-display font-bold uppercase tracking-tight text-white"
          >
            Demandez votre devis professionnel
          </h2>
          <p className="text-xs sm:text-sm text-white/80 max-w-xl mx-auto leading-relaxed">
            Décrivez votre besoin en quelques instants. Nous vous recontacterons pour établir une
            proposition adaptée à votre flotte.
          </p>
        </div>

        {/* Carte formulaire blanche sobre et premium */}
        <div className="rounded-2xl sm:rounded-3xl bg-white text-[#11114E] p-6 sm:p-8 md:p-10 shadow-2xl border border-slate-200/80">
          {status === "success" ? (
            <div className="text-center py-6 sm:py-8 space-y-4 animate-in fade-in duration-300">
              <div className="grid size-14 sm:size-16 place-items-center rounded-full bg-emerald-100 text-emerald-600 mx-auto">
                <CheckCircle2 className="size-8 sm:size-10" />
              </div>
              <div className="space-y-1.5 max-w-md mx-auto">
                <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-wide text-[#11114E]">
                  Demande transmise avec succès !
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Merci pour votre demande ! Nous reviendrons vers vous pour échanger sur vos
                  besoins et vous proposer une solution adaptée.
                </p>
              </div>

              {/* Récapitulatif envoyé */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-left text-xs max-w-md mx-auto space-y-1.5 text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">Entreprise :</span>
                  <span className="font-bold text-[#11114E]">{companyName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">Contact :</span>
                  <span>{contactName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">Téléphone :</span>
                  <span>{phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">E-mail :</span>
                  <span>{email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">Flotte :</span>
                  <span className="font-bold text-primary">{vehicleCount}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="btn btn-outline text-xs sm:text-sm py-2.5 px-5 font-bold uppercase tracking-wider mx-auto"
                >
                  Envoyer une autre demande
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" noValidate>
              {/* Piège antispam honeypot invisible */}
              <input
                type="text"
                name="b_hp"
                value={hp}
                onChange={(e) => setHp(e.target.value)}
                tabIndex={-1}
                aria-hidden="true"
                className="sr-only hidden"
                autoComplete="off"
              />

              {/* Champ 1 : Nom de l'entreprise (pleine largeur) */}
              <div>
                <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-[#11114E] mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Building2 className="size-3.5 text-primary shrink-0" />
                    <span>Nom de l'entreprise *</span>
                  </span>
                </label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => {
                    setCompanyName(e.target.value);
                    if (errorMessage) setErrorMessage("");
                  }}
                  placeholder="Ex. : SAS Dupont, Cabinet Martin, Agence Lilloise..."
                  autoComplete="organization"
                  className={fieldClass}
                />
              </div>

              {/* Champs 2 & 3 : Nom contact & Téléphone (côte à côte desktop) */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-[#11114E] mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <User className="size-3.5 text-primary shrink-0" />
                      <span>Nom et prénom du contact *</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => {
                      setContactName(e.target.value);
                      if (errorMessage) setErrorMessage("");
                    }}
                    placeholder="Ex. : Jean Dupont"
                    autoComplete="name"
                    className={fieldClass}
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-[#11114E] mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <Phone className="size-3.5 text-primary shrink-0" />
                      <span>Téléphone *</span>
                    </span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errorMessage) setErrorMessage("");
                    }}
                    placeholder="Ex. : 06 12 34 56 78"
                    autoComplete="tel"
                    className={fieldClass}
                  />
                </div>
              </div>

              {/* Champs 4 & 5 : E-mail pro & Nombre de véhicules (côte à côte desktop) */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-[#11114E] mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <Mail className="size-3.5 text-primary shrink-0" />
                      <span>Adresse e-mail professionnelle *</span>
                    </span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errorMessage) setErrorMessage("");
                    }}
                    placeholder="Ex. : contact@entreprise.fr"
                    autoComplete="email"
                    className={fieldClass}
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-[#11114E] mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <Car className="size-3.5 text-primary shrink-0" />
                      <span>Nombre de véhicules concernés *</span>
                    </span>
                  </label>
                  <select
                    required
                    value={vehicleCount}
                    onChange={(e) => {
                      setVehicleCount(e.target.value);
                      if (errorMessage) setErrorMessage("");
                    }}
                    className={fieldClass}
                  >
                    {VEHICLE_COUNT_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Champ 6 : Description libre du besoin (pleine largeur) */}
              <div>
                <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-[#11114E] mb-1.5">
                  <span className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <FileText className="size-3.5 text-primary shrink-0" />
                      <span>Description de votre besoin</span>
                    </span>
                    <span className="text-[11px] font-normal text-slate-500 lowercase">
                      (facultative)
                    </span>
                  </span>
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Type de véhicules, fréquence souhaitée, lieu d'intervention, besoins particuliers..."
                  className={`${fieldClass} resize-y min-h-[80px]`}
                />
              </div>

              {/* Message d'erreur clair si validation échouée */}
              {errorMessage && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-300 bg-red-50 p-3.5 text-xs sm:text-sm text-red-700 flex items-start gap-2.5 animate-in fade-in duration-200"
                >
                  <AlertCircle className="size-4.5 text-red-600 shrink-0 mt-0.5" />
                  <span className="leading-snug">{errorMessage}</span>
                </div>
              )}

              {/* Notice confidentialité RGPD */}
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Vos données personnelles sont traitées de manière strictement confidentielle et
                utilisées uniquement pour vous contacter au sujet de votre demande de devis. Pour en
                savoir plus, consultez notre{" "}
                <Link to="/confidentialite" className="text-primary hover:underline font-semibold">
                  Politique de confidentialité
                </Link>
                .
              </p>

              {/* Bouton d'envoi principal */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn btn-primary w-full py-3 sm:py-3.5 text-sm sm:text-base font-bold uppercase tracking-wider justify-center shadow-md disabled:opacity-60 cursor-pointer"
                >
                  {status === "loading" ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="size-4.5 animate-spin" />
                      <span>Envoi en cours...</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2">
                      <Send className="size-4" />
                      <span>Envoyer ma demande</span>
                    </span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Coordonnées de contact direct complémentaires */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-white/80 text-center">
          <span>Vous préférez un échange immédiat ?</span>
          <a
            href={BUSINESS.phoneTel}
            className="font-bold text-white hover:text-primary transition-colors inline-flex items-center gap-1.5"
          >
            <Phone className="size-3.5 text-primary" />
            <span>{BUSINESS.phoneDisplay}</span>
          </a>
          <span className="hidden sm:inline text-white/40">•</span>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-white hover:text-primary transition-colors inline-flex items-center gap-1.5"
          >
            <MessageCircle className="size-3.5 text-whatsapp" />
            <span>Écrivez-nous sur WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function EntreprisesPage() {
  return (
    <>
      <div className="relative overflow-hidden bg-[#11114E] text-white">
        {/* Halos subtils */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-20 size-[650px] rounded-full bg-[#243888]/22 blur-[150px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 -left-20 size-[600px] rounded-full bg-[#282A74]/22 blur-[145px]"
        />

        <PageHero
          transparent
          eyebrow="Solutions B2B & Professionnels"
          title="Nettoyage automobile sur site pour entreprises & flottes à Lille"
        >
          <p className="text-base sm:text-lg text-white/85 max-w-2xl leading-relaxed">
            Valorisez l'image de votre entreprise sans perte de temps. Nous nous déplaçons
            directement sur le parking de votre société à Lille, Wambrechies et dans toute la
            métropole avec tout notre équipement professionnel.
          </p>
          <div className="pt-4">
            <a
              href="#devis-pro"
              onClick={scrollToDevisSection}
              className="btn btn-primary text-xs sm:text-sm font-bold uppercase tracking-wider py-2.5 px-5 inline-flex items-center gap-2 cursor-pointer shadow-md"
            >
              <span>Demander un devis flotte</span>
              <ArrowRight className="size-4" />
            </a>
          </div>
        </PageHero>

        {/* 4 Avantages B2B */}
        <section className="relative z-10 py-12 md:py-16 border-t border-white/10">
          <div className="container-site">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {B2B_ADVANTAGES.map((a) => (
                <div
                  key={a.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="grid size-11 place-items-center rounded-xl bg-white/10 text-primary mb-4">
                      <a.icon className="size-5" />
                    </div>
                    <h2 className="font-display text-lg font-bold uppercase tracking-tight text-white">
                      {a.title}
                    </h2>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-primary mt-1 mb-2.5">
                      {a.subtitle}
                    </p>
                    <p className="text-xs sm:text-sm text-white/75 leading-relaxed">{a.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Offres détaillées B2B */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FAFBFD] via-[#F4F6FB] to-[#EDF1F7] text-[#11114E] py-10 sm:py-12 md:py-14">
        <div className="container-site">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-2">
              <span className="w-6 h-[2px] bg-primary"></span>
              <span>Nos prestations pour professionnels</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold uppercase tracking-tight text-[#11114E]">
              Des solutions adaptées à vos besoins d'entreprise
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Chaque parc automobile a ses spécificités. Nous établissons un devis clair et
              personnalisé sous 24 à 48 heures.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {B2B_OFFERS.map((o) => (
              <div
                key={o.title}
                className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-7 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div>
                  <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary mb-3">
                    {o.highlight}
                  </span>
                  <h3 className="font-display text-xl font-bold uppercase text-[#11114E]">
                    {o.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2">{o.desc}</p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">
                    Tarification sur devis
                  </span>
                  <a
                    href="#devis-pro"
                    onClick={scrollToDevisSection}
                    className="text-xs font-bold text-primary hover:text-[#11114E] flex items-center gap-1 cursor-pointer"
                  >
                    <span>Demander une étude</span>
                    <ArrowRight className="size-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Encadré d'appel à l'action B2B vers le formulaire */}
          <div className="mt-14 rounded-2xl bg-[#11114E] text-white p-8 sm:p-10 shadow-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Contact Entreprises dédié
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-bold uppercase text-white">
                Besoin d'un devis pour votre parc automobile ?
              </h3>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                Indiquez le nombre de véhicules, l'adresse de votre site et le type de prestation
                souhaité. Nous vous répondons très rapidement avec une proposition sur mesure.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href={BUSINESS.phoneTel}
                className="btn border border-white/20 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm uppercase tracking-wider py-3 px-5 justify-center"
              >
                <Phone className="size-4 text-primary mr-1" />
                <span>{BUSINESS.phoneDisplay}</span>
              </a>
              <a
                href="#devis-pro"
                onClick={scrollToDevisSection}
                className="btn btn-primary text-xs sm:text-sm font-bold uppercase tracking-wider py-3 px-6 justify-center cursor-pointer"
              >
                <span>Demander un devis pro</span>
                <ArrowRight className="size-4 ml-1" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FORMULAIRE DE DEVIS PROFESSIONNEL DÉDIÉ */}
      <ProQuoteForm />

      <ContactBand />
    </>
  );
}
