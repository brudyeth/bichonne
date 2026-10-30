import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, useRef } from "react";
import {
  Copy,
  MessageCircle,
  Phone,
  Check,
  Mail,
  AlertCircle,
  Calendar,
  Sparkles,
  Car,
  MapPin,
  Zap,
  Droplets,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Info,
} from "lucide-react";
import { PageHero, Facebook3DIcon, Instagram3DIcon } from "@/components/site/Layout";
import { BUSINESS, FORMULAS, INTENSIVE_DIRT_NOTICE, euro, whatsappLink } from "@/lib/business";

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
      {
        property: "og:image",
        content: "https://bichonnetacaisse.fr/brand/partage-reseaux-1200x630.png",
      },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:type", content: "image/png" },
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
      {
        name: "twitter:image",
        content: "https://bichonnetacaisse.fr/brand/partage-reseaux-1200x630.png",
      },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "https://bichonnetacaisse.fr/contact" }],
  }),
  component: Page,
});

const field =
  "w-full rounded-xl border border-input bg-background px-4 py-3 text-base outline-none focus:ring-2 focus:ring-ring transition-colors";

const FORM_CARES = [
  {
    id: "poils-sale",
    name: "Poils d'animaux / Véhicule très sale",
    price: 15,
    short: "Supplément pour un nettoyage nécessitant une attention particulière.",
  },
  {
    id: "soin-cuir",
    name: "Soin nourrissant des cuirs",
    price: 15,
    short:
      "Application d'un soin spécifique pour nourrir, assouplir et préserver les surfaces en cuir.",
  },
] as const;

const PARKING_CHOICES = [
  "Cour ou allée privée",
  "Garage ou parking privé",
  "Voie publique",
  "Autre",
] as const;

const TIME_SLOT_CHOICES = ["Flexible", "Matin", "Après-midi", "Soirée", "Week-end"] as const;

const STEPS = [
  { num: 1, label: "Prestation", title: "Votre prestation", icon: Sparkles },
  { num: 2, label: "Véhicule", title: "Votre véhicule & Lieu", icon: Car },
  { num: 3, label: "Rendez-vous", title: "Votre rendez-vous", icon: Calendar },
  { num: 4, label: "Confirmation", title: "Coordonnées & Envoi", icon: CheckCircle2 },
] as const;

function Page() {
  const { formule } = Route.useSearch();
  const formTopRef = useRef<HTMLDivElement>(null);

  // Étape courante (1 à 4)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Étape 1 : Prestation
  const [formula, setFormula] = useState(formule ?? "");
  const [cares, setCares] = useState<string[]>([]);
  const [hasIntensiveDirt, setHasIntensiveDirt] = useState(false);

  // Étape 2 : Véhicule & Lieu
  const [vehicle, setVehicle] = useState("");
  const [parking, setParking] = useState<string>("Cour ou allée privée");
  const [hasWater, setHasWater] = useState(true);
  const [hasElectricity, setHasElectricity] = useState(true);

  // Étape 3 : Rendez-vous & Compléments
  const [dateChoice, setDateChoice] = useState<"calendar" | "together">("calendar");
  const [preferredDate, setPreferredDate] = useState("");
  const [timeSlot, setTimeSlot] = useState<string>("Flexible");
  const [message, setMessage] = useState("");

  // Étape 4 : Coordonnées
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");

  // UI state
  const [copied, setCopied] = useState(false);
  const [stepError, setStepError] = useState("");
  const [emailStatus, setEmailStatus] = useState<{
    type: "idle" | "loading" | "success" | "error";
    message?: string;
  }>({ type: "idle" });

  const selectedFormula = FORMULAS.find((x) => x.id === formula);
  const selectedCaresList = FORM_CARES.filter((c) => cares.includes(c.id));

  // Calcul dynamique du tarif total estimé
  const total = useMemo(() => {
    let t = selectedFormula?.price ?? 0;
    t += selectedCaresList.reduce((acc, c) => acc + c.price, 0);
    return t;
  }, [selectedFormula, selectedCaresList]);

  const todayStr = useMemo(() => {
    const now = new Date();
    return now.toISOString().split("T")[0];
  }, []);

  // Défilement doux vers le haut du formulaire lors du changement d'étape
  const scrollToFormTop = () => {
    if (formTopRef.current) {
      const topOffset = formTopRef.current.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: Math.max(0, topOffset), behavior: "smooth" });
    }
  };

  // Validation par étape
  const goToNextStep = () => {
    setStepError("");

    if (currentStep === 1) {
      setCurrentStep(2);
      scrollToFormTop();
    } else if (currentStep === 2) {
      if (!vehicle.trim()) {
        setStepError(
          "Veuillez indiquer la marque et le modèle du véhicule (ex. : Renault Clio, Peugeot 208...).",
        );
        return;
      }
      setCurrentStep(3);
      scrollToFormTop();
    } else if (currentStep === 3) {
      if (dateChoice === "calendar" && !preferredDate) {
        setStepError(
          "Veuillez sélectionner une date souhaitée dans le calendrier ou choisir « Convenir d'une date ensemble ».",
        );
        return;
      }
      setCurrentStep(4);
      scrollToFormTop();
    }
  };

  const goToPreviousStep = () => {
    setStepError("");
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3 | 4);
      scrollToFormTop();
    }
  };

  const jumpToStep = (target: 1 | 2 | 3 | 4) => {
    if (target < currentStep) {
      setStepError("");
      setCurrentStep(target);
      scrollToFormTop();
    }
  };

  // Validation finale (Étape 4)
  const validateFinal = () => {
    if (!name.trim()) {
      setStepError("Veuillez renseigner votre nom et prénom.");
      return false;
    }
    if (!phone.trim()) {
      setStepError(
        "Veuillez renseigner votre numéro de téléphone pour que nous puissions vous joindre.",
      );
      return false;
    }
    if (!city.trim() && !address.trim()) {
      setStepError(
        "Veuillez renseigner votre ville ou adresse d'intervention dans la métropole lilloise.",
      );
      return false;
    }
    setStepError("");
    return true;
  };

  // Formatage du message pour WhatsApp et Copie
  const summary = useMemo(() => {
    const careText = selectedCaresList.length
      ? selectedCaresList.map((c) => `${c.name} (+${euro(c.price)})`).join(", ")
      : "Aucune";

    const lines: (string | null)[] = [
      "Bonjour, je souhaite un devis pour Bichonne ta Caisse.",
      "",
      "📋 COORDONNÉES :",
      `• Nom et prénom : ${name.trim() || "-"}`,
      `• Téléphone : ${phone.trim() || "-"}`,
      address.trim() ? `• Adresse : ${address.trim()}` : null,
      city.trim() ? `• Ville : ${city.trim()}` : null,
      email.trim() ? `• E-mail : ${email.trim()}` : null,
      "",
      "🚗 VÉHICULE & INTERVENTION :",
      `• Modèle : ${vehicle.trim() || "Non précisé"}`,
      `• Stationnement : ${parking}`,
      `• Accès à l'eau : ${hasWater ? "Oui" : "Non"}`,
      `• Prise électrique accessible : ${hasElectricity ? "Oui" : "Non"}`,
      `• Déplacement : Offert jusqu'à 15 km autour de Lille (au-delà : 0,50 €/km supp. A/R)`,
      "",
      "✨ PRESTATIONS & OPTIONS :",
      `• Formule : ${selectedFormula ? `${selectedFormula.name} (${euro(selectedFormula.price)})` : "À définir ensemble"}`,
      `• Prestations complémentaires : ${careText}`,
      hasIntensiveDirt
        ? "• Salissures intensives / Dépoilage extrême : Oui (sur devis personnalisé)"
        : null,
      "",
      "📅 DISPONIBILITÉ :",
      dateChoice === "calendar" && preferredDate
        ? `• Date préférentielle : ${preferredDate}`
        : "• Date : À convenir ensemble",
      `• Créneau horaire : ${timeSlot}`,
      "",
      total
        ? `💰 TARIF ESTIMÉ : ${euro(total)}${hasIntensiveDirt ? " (+ devis personnalisé pour salissures intensives)" : ""}`
        : "💰 TARIF ESTIMÉ : À définir selon prestations",
      "",
      message.trim() ? `💬 INFORMATIONS COMPLÉMENTAIRES :\n${message.trim()}` : null,
    ];

    return lines.filter((l): l is string => l !== null).join("\n");
  }, [
    name,
    phone,
    address,
    city,
    email,
    vehicle,
    parking,
    hasWater,
    hasElectricity,
    selectedFormula,
    selectedCaresList,
    hasIntensiveDirt,
    dateChoice,
    preferredDate,
    timeSlot,
    total,
    message,
  ]);

  const sendWhatsApp = () => {
    if (!validateFinal()) return;
    window.open(whatsappLink(summary), "_blank", "noopener,noreferrer");
  };

  const copy = async () => {
    if (!validateFinal()) return;
    await navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sendEmail = async () => {
    if (!validateFinal()) return;
    setEmailStatus({ type: "loading" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim() || undefined,
          vehicle: vehicle.trim() || undefined,
          address: address.trim() || undefined,
          city: city.trim() || undefined,
          parking,
          waterAccess: hasWater,
          electricityAccess: hasElectricity,
          formulaName: selectedFormula?.name,
          formulaPrice: selectedFormula?.price,
          selectedCares: [
            ...selectedCaresList.map((c) => `${c.name} (+${euro(c.price)})`),
            ...(hasIntensiveDirt ? ["Salissures intensives (sur devis)"] : []),
          ],
          isVeryDirty: cares.includes("poils-sale") || hasIntensiveDirt,
          hasPetHair: cares.includes("poils-sale") || hasIntensiveDirt,
          dateChoice,
          preferredDate: dateChoice === "calendar" ? preferredDate : undefined,
          timeSlot,
          message: message.trim() || undefined,
          estimatedTotal: total || undefined,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        success?: boolean;
        message?: string;
        error?: string;
        configured?: boolean;
      };

      if (res.ok && data.success) {
        setEmailStatus({
          type: "success",
          message: data.message ?? "Votre demande a été envoyée avec succès !",
        });
      } else {
        setEmailStatus({
          type: "error",
          message:
            data.message ||
            data.error ||
            "Le service d'envoi par e-mail direct n'est pas encore configuré sur le serveur. Nous vous invitons à transmettre votre demande via WhatsApp en un clic ou par téléphone au 06 59 14 09 39.",
        });
      }
    } catch {
      setEmailStatus({
        type: "error",
        message:
          "Impossible de joindre le serveur. Nous vous invitons à transmettre votre demande par WhatsApp en un clic ou par téléphone au 06 59 14 09 39.",
      });
    }
  };

  return (
    <>
      <div className="relative overflow-hidden bg-[#11114E] text-white">
        {/* Halos continus partagés */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -left-20 size-[650px] lg:size-[850px] rounded-full bg-[#4440A0]/35 blur-[150px] lg:blur-[175px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 -right-20 size-[620px] lg:size-[800px] rounded-full bg-[#3448D8]/35 blur-[145px] lg:blur-[170px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[35%] -right-20 size-[640px] lg:size-[850px] rounded-full bg-[#3448D8]/32 blur-[145px] lg:blur-[175px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[50%] right-[15%] size-[300px] lg:size-[380px] rounded-full bg-[#F47721]/10 blur-[110px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-10 left-1/4 size-[600px] lg:size-[780px] rounded-full bg-[#5140A0]/26 blur-[130px] lg:blur-[160px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-noise opacity-12 mix-blend-overlay"
        />

        <PageHero
          transparent
          eyebrow="Réservation & Devis gratuit"
          title="Réservez votre nettoyage auto"
        >
          Obtenez une estimation de votre prestation et proposez une date d'intervention. Nous vous
          recontactons pour confirmer votre rendez-vous.
        </PageHero>

        <section className="relative z-10 py-10 md:py-14">
          <div className="container-site relative z-10 grid gap-10 lg:grid-cols-[1fr_1.5fr]">
            {/* Colonne latérale de contact direct */}
            <div className="space-y-4">
              <a
                href={BUSINESS.phoneTel}
                className="flex items-center gap-4 rounded-2xl bg-[#0B0B33] border border-white/10 p-6 text-white transition-transform hover:scale-[1.01] shadow-xl"
              >
                <Phone className="size-8 text-primary shrink-0" />
                <div>
                  <p className="text-sm opacity-75">Par téléphone</p>
                  <p className="font-display text-3xl font-bold">{BUSINESS.phoneDisplay}</p>
                </div>
              </a>

              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl btn-whatsapp p-6 transition-transform hover:scale-[1.01] shadow-xl"
              >
                <MessageCircle className="size-8 shrink-0" />
                <div>
                  <p className="text-sm opacity-80">Message direct</p>
                  <p className="font-display text-3xl font-bold">WhatsApp</p>
                </div>
              </a>

              <a
                href={BUSINESS.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Suivez-nous sur Facebook (ouvre un nouvel onglet)"
                className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white p-4 transition-colors hover:border-primary/50 text-[#11114E] shadow-xl"
              >
                <Facebook3DIcon className="size-8 shrink-0" />
                <div>
                  <p className="text-xs text-slate-500">Réseaux sociaux</p>
                  <p className="text-sm font-semibold text-[#11114E]">Suivez-nous sur Facebook</p>
                </div>
              </a>

              <a
                href={BUSINESS.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Suivez-nous sur Instagram (ouvre un nouvel onglet)"
                className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white p-4 transition-colors hover:border-primary/50 text-[#11114E] shadow-xl"
              >
                <Instagram3DIcon className="size-8 shrink-0" />
                <div>
                  <p className="text-xs text-slate-500">Réseaux sociaux</p>
                  <p className="text-sm font-semibold text-[#11114E]">Suivez-nous sur Instagram</p>
                </div>
              </a>

              <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-5 space-y-2.5 text-sm text-white shadow-xl">
                <div className="flex items-start gap-2.5">
                  <MapPin className="size-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white leading-tight">
                      Déplacement offert jusqu'à 15 km autour de Lille
                    </p>
                    <p className="text-xs text-white/80 mt-1">
                      Au-delà, seuls les kilomètres supplémentaires sont facturés à 0,50 €/km,
                      aller-retour.
                    </p>
                  </div>
                </div>
                <p className="text-xs text-white/70 pt-2 border-t border-white/15 leading-relaxed">
                  Intervention directement chez vous, sur votre parking ou sur votre lieu de travail
                  à Lille, Wambrechies, Marcq-en-Barœul, Lambersart, Bondues, La Madeleine, Roubaix,
                  Tourcoing et communes voisines.
                </p>
              </div>
            </div>

            {/* Formulaire multi-étapes */}
            <div
              ref={formTopRef}
              className="rounded-2xl border border-white/10 bg-white text-[#11114E] p-6 md:p-8 space-y-6 shadow-2xl"
            >
              {/* Header du formulaire & Titre de l'étape */}
              <div>
                <div className="mb-4">
                  <h2 className="text-3xl font-display uppercase tracking-wide text-[#11114E]">
                    Préparer ma demande
                  </h2>
                </div>

                <div className="flex items-center justify-between gap-3 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    Étape {currentStep} sur 4
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">
                    {STEPS[currentStep - 1].title}
                  </span>
                </div>

                {/* Barre de progression visuelle */}
                <div className="w-full bg-secondary rounded-full h-2 overflow-hidden mb-6">
                  <div
                    className="bg-primary h-full rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${(currentStep / 4) * 100}%` }}
                  />
                </div>

                {/* Indicateurs d'étapes cliquables pour revenir en arrière */}
                <nav
                  aria-label="Progression du formulaire"
                  className="grid grid-cols-4 gap-2 pb-5 border-b border-border"
                >
                  {STEPS.map((s) => {
                    const isPassed = s.num < currentStep;
                    const isCurrent = s.num === currentStep;
                    const IconComponent = s.icon;

                    return (
                      <button
                        key={s.num}
                        type="button"
                        onClick={() => jumpToStep(s.num)}
                        disabled={s.num > currentStep}
                        className={`flex flex-col items-center gap-1.5 p-1 rounded-lg text-center transition-colors text-xs ${
                          isCurrent
                            ? "text-primary font-bold"
                            : isPassed
                              ? "text-foreground font-semibold hover:text-primary cursor-pointer"
                              : "text-muted-foreground/60 cursor-not-allowed"
                        }`}
                      >
                        <span
                          className={`size-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                            isCurrent
                              ? "bg-primary text-primary-foreground shadow-sm ring-2 ring-primary/30"
                              : isPassed
                                ? "bg-primary/20 text-primary"
                                : "bg-secondary text-muted-foreground"
                          }`}
                        >
                          {isPassed ? <Check className="size-3.5" /> : s.num}
                        </span>
                        <span className="truncate max-w-full hidden sm:inline">{s.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* ========================================================================= */}
              {/* ÉTAPE 1 : Votre prestation                                               */}
              {/* ========================================================================= */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div>
                    <h2 className="text-3xl font-display uppercase tracking-wide">
                      1. Votre prestation
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Choisissez votre formule principale et personnalisez votre prestation selon
                      vos besoins.
                    </p>
                  </div>

                  {/* Sélection formule */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground flex items-center justify-between">
                      <span>Formule de nettoyage</span>
                      {selectedFormula && (
                        <span className="text-xs font-normal text-muted-foreground">
                          Prix :{" "}
                          <strong className="text-primary">{euro(selectedFormula.price)}</strong>
                          {" · "}
                          Durée : <strong>{selectedFormula.duration}</strong>
                        </span>
                      )}
                    </label>
                    <select
                      className={field}
                      value={formula}
                      onChange={(e) => setFormula(e.target.value)}
                    >
                      <option value="">À définir ensemble</option>
                      {FORMULAS.map((x) => (
                        <option key={x.id} value={x.id}>
                          {x.name} — {euro(x.price)} ({x.duration})
                        </option>
                      ))}
                    </select>
                    {selectedFormula && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {selectedFormula.short} (Durée estimée : {selectedFormula.duration})
                      </p>
                    )}

                    {/* Proposition discrète de passage Intérieur vers Complet pour +40 € */}
                    {formula === "interieur" && (
                      <div className="mt-3 rounded-xl border border-primary/30 bg-primary/5 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in duration-200">
                        <div className="space-y-1">
                          <p className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                            <Sparkles className="size-3.5" /> Suggestion confort
                          </p>
                          <p className="text-sm font-semibold text-foreground">
                            Passez au Nettoyage Complet pour +40 € seulement
                          </p>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            Profitez d'un véhicule impeccable à l'extérieur comme à l'intérieur (109
                            € au total).
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setFormula("complet")}
                          className="self-start sm:self-center shrink-0 rounded-lg bg-primary px-3.5 py-2 text-xs font-bold text-primary-foreground uppercase tracking-wide hover:bg-primary/90 transition-colors shadow-xs"
                        >
                          Passer au Complet (+40 €)
                        </button>
                      </div>
                    )}
                    {formula === "complet" && (
                      <div className="mt-2.5 rounded-xl border border-border/80 bg-secondary/50 px-3.5 py-2.5 flex items-center justify-between gap-3 text-xs">
                        <span className="text-muted-foreground">
                          Formule Complète sélectionnée (intérieur + carrosserie).
                        </span>
                        <button
                          type="button"
                          onClick={() => setFormula("interieur")}
                          className="text-primary font-semibold hover:underline shrink-0"
                        >
                          Revenir à l'Intérieur seul (69 €)
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Prestations complémentaires */}
                  <div className="space-y-3 pt-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-foreground">
                        Prestations complémentaires{" "}
                        <span className="text-xs font-normal text-muted-foreground">
                          (facultatif)
                        </span>
                      </span>
                      <span className="text-xs text-muted-foreground">15 € par prestation</span>
                    </div>

                    <div className="space-y-2.5">
                      {FORM_CARES.map((c) => (
                        <label
                          key={c.id}
                          className="flex cursor-pointer items-start justify-between gap-3 rounded-xl border p-4 has-[:checked]:border-primary has-[:checked]:bg-secondary/40 transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <input
                              type="checkbox"
                              className="size-4 accent-primary mt-1"
                              checked={cares.includes(c.id)}
                              onChange={(e) =>
                                setCares(
                                  e.target.checked
                                    ? [...cares, c.id]
                                    : cares.filter((x) => x !== c.id),
                                )
                              }
                            />
                            <div>
                              <p className="text-sm font-semibold text-foreground">{c.name}</p>
                              <p className="text-xs text-muted-foreground mt-0.5">{c.short}</p>
                            </div>
                          </div>
                          <span className="font-bold text-primary shrink-0 text-sm">
                            +{euro(c.price)}
                          </span>
                        </label>
                      ))}
                    </div>

                    {/* Mention informative sur les nettoyages intensifs */}
                    <div className="rounded-xl border border-border/80 bg-secondary/40 p-3.5 sm:p-4 text-xs text-muted-foreground leading-relaxed">
                      <p className="font-medium text-foreground mb-1 flex items-center gap-1.5">
                        <Info className="size-3.5 text-primary shrink-0" />
                        Cas de salissures intensives ou dépoilage extrême
                      </p>
                      <p>{INTENSIVE_DIRT_NOTICE}</p>
                      <label className="mt-2.5 flex items-start gap-2 pt-2 border-t border-border/50 cursor-pointer text-foreground/90 font-medium">
                        <input
                          type="checkbox"
                          className="size-4 accent-primary mt-0.5"
                          checked={hasIntensiveDirt}
                          onChange={(e) => setHasIntensiveDirt(e.target.checked)}
                        />
                        <span>
                          Mon véhicule présente des salissures intensives nécessitant une étude
                          personnalisée (devis sur mesure).
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Sous-total estimé étape 1 */}
                  <div className="flex items-center justify-between rounded-xl bg-secondary px-5 py-3.5 border">
                    <div>
                      <span className="font-semibold text-foreground text-sm block">
                        Tarif estimé
                      </span>
                      <span className="text-xs text-muted-foreground">Actualisé en temps réel</span>
                    </div>
                    <span className="font-display text-3xl font-bold text-primary">
                      {total ? euro(total) : "—"}
                    </span>
                  </div>

                  {/* Navigation étape 1 */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={goToNextStep}
                      className="btn btn-primary w-full py-3.5 text-base justify-center shadow-sm"
                    >
                      Continuer vers Votre véhicule
                      <ArrowRight className="size-5 ml-1" />
                    </button>
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* ÉTAPE 2 : Votre véhicule & Lieu d'intervention                            */}
              {/* ========================================================================= */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div>
                    <h2 className="text-3xl font-display uppercase tracking-wide">
                      2. Votre véhicule
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Précisez le véhicule et les conditions de stationnement pour vérifier la
                      faisabilité.
                    </p>
                  </div>

                  {/* Marque et modèle */}
                  <label className="block space-y-1.5">
                    <span className="text-sm font-semibold text-foreground">
                      Marque et modèle du véhicule *
                    </span>
                    <input
                      type="text"
                      required
                      className={field}
                      value={vehicle}
                      onChange={(e) => {
                        setVehicle(e.target.value);
                        if (stepError) setStepError("");
                      }}
                      placeholder="Ex. : Peugeot 208, Renault Clio 5, Tesla Model 3..."
                    />
                  </label>

                  {/* Emplacement stationnement */}
                  <label className="block space-y-1.5">
                    <span className="text-sm font-semibold text-foreground">
                      Où sera stationné le véhicule lors de l'intervention ?
                    </span>
                    <select
                      className={field}
                      value={parking}
                      onChange={(e) => setParking(e.target.value)}
                    >
                      {PARKING_CHOICES.map((choice) => (
                        <option key={choice} value={choice}>
                          {choice}
                        </option>
                      ))}
                    </select>
                  </label>

                  {/* Accès eau & électricité */}
                  <div className="grid gap-3 sm:grid-cols-2 pt-1">
                    {/* Accès eau */}
                    <div className="rounded-xl border p-4 space-y-2">
                      <span className="text-sm font-semibold flex items-center gap-2">
                        <Droplets className="size-4 text-primary shrink-0" />
                        Accès à l'eau à proximité ?
                      </span>
                      <div className="flex gap-2">
                        <label
                          className={`flex-1 flex items-center justify-center py-2 px-3 rounded-lg border cursor-pointer text-xs font-semibold transition-colors ${
                            hasWater
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-background text-foreground hover:bg-secondary/60"
                          }`}
                        >
                          <input
                            type="radio"
                            name="hasWater"
                            className="sr-only"
                            checked={hasWater}
                            onChange={() => setHasWater(true)}
                          />
                          Oui
                        </label>
                        <label
                          className={`flex-1 flex items-center justify-center py-2 px-3 rounded-lg border cursor-pointer text-xs font-semibold transition-colors ${
                            !hasWater
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-background text-foreground hover:bg-secondary/60"
                          }`}
                        >
                          <input
                            type="radio"
                            name="hasWater"
                            className="sr-only"
                            checked={!hasWater}
                            onChange={() => setHasWater(false)}
                          />
                          Non
                        </label>
                      </div>
                    </div>

                    {/* Prise électrique */}
                    <div className="rounded-xl border p-4 space-y-2">
                      <span className="text-sm font-semibold flex items-center gap-2">
                        <Zap className="size-4 text-primary shrink-0" />
                        Prise électrique accessible ?
                      </span>
                      <div className="flex gap-2">
                        <label
                          className={`flex-1 flex items-center justify-center py-2 px-3 rounded-lg border cursor-pointer text-xs font-semibold transition-colors ${
                            hasElectricity
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-background text-foreground hover:bg-secondary/60"
                          }`}
                        >
                          <input
                            type="radio"
                            name="hasElectricity"
                            className="sr-only"
                            checked={hasElectricity}
                            onChange={() => setHasElectricity(true)}
                          />
                          Oui
                        </label>
                        <label
                          className={`flex-1 flex items-center justify-center py-2 px-3 rounded-lg border cursor-pointer text-xs font-semibold transition-colors ${
                            !hasElectricity
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-background text-foreground hover:bg-secondary/60"
                          }`}
                        >
                          <input
                            type="radio"
                            name="hasElectricity"
                            className="sr-only"
                            checked={!hasElectricity}
                            onChange={() => setHasElectricity(false)}
                          />
                          Non
                        </label>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground px-1">
                    Ne vous inquiétez pas si vous répondez « Non » : nous disposons de solutions
                    mobiles autonomes pour nous adapter.
                  </p>

                  {/* Message d'erreur éventuel */}
                  {stepError && (
                    <p
                      role="alert"
                      className="text-sm font-semibold text-destructive flex items-center gap-1.5"
                    >
                      <AlertCircle className="size-4 shrink-0" />
                      {stepError}
                    </p>
                  )}

                  {/* Navigation étape 2 */}
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={goToPreviousStep}
                      className="btn btn-outline py-3.5 px-5 text-base justify-center"
                    >
                      <ArrowLeft className="size-4 mr-1" />
                      Retour
                    </button>
                    <button
                      type="button"
                      onClick={goToNextStep}
                      className="btn btn-primary flex-1 py-3.5 text-base justify-center shadow-sm"
                    >
                      Continuer vers Votre rendez-vous
                      <ArrowRight className="size-5 ml-1" />
                    </button>
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* ÉTAPE 3 : Votre rendez-vous & Disponibilité                                */}
              {/* ========================================================================= */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div>
                    <h2 className="text-3xl font-display uppercase tracking-wide">
                      3. Votre rendez-vous
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Proposez vos préférences de date et de créneau horaire.
                    </p>
                  </div>

                  {/* Mode de date */}
                  <div className="grid gap-3 sm:grid-cols-2">
                    <label
                      className={`flex items-center gap-3 rounded-xl border p-3.5 cursor-pointer text-sm font-medium transition-colors ${
                        dateChoice === "calendar"
                          ? "border-primary bg-secondary"
                          : "hover:bg-secondary/40"
                      }`}
                    >
                      <input
                        type="radio"
                        name="dateChoice"
                        value="calendar"
                        checked={dateChoice === "calendar"}
                        onChange={() => {
                          setDateChoice("calendar");
                          setStepError("");
                        }}
                        className="size-4 accent-primary"
                      />
                      Proposer une date préférentielle
                    </label>

                    <label
                      className={`flex items-center gap-3 rounded-xl border p-3.5 cursor-pointer text-sm font-medium transition-colors ${
                        dateChoice === "together"
                          ? "border-primary bg-secondary"
                          : "hover:bg-secondary/40"
                      }`}
                    >
                      <input
                        type="radio"
                        name="dateChoice"
                        value="together"
                        checked={dateChoice === "together"}
                        onChange={() => {
                          setDateChoice("together");
                          setStepError("");
                        }}
                        className="size-4 accent-primary"
                      />
                      Convenir d'une date ensemble
                    </label>
                  </div>

                  {/* Sélecteur de date (si calendrier) */}
                  {dateChoice === "calendar" && (
                    <label className="block space-y-1.5 animate-in fade-in duration-200">
                      <span className="text-sm font-semibold flex items-center gap-1.5">
                        <Calendar className="size-4 text-primary" />
                        Date souhaitée *
                      </span>
                      <input
                        type="date"
                        min={todayStr}
                        className={field}
                        value={preferredDate}
                        onChange={(e) => {
                          setPreferredDate(e.target.value);
                          setStepError("");
                        }}
                      />
                    </label>
                  )}

                  {/* Créneau horaire */}
                  <label className="block space-y-1.5">
                    <span className="text-sm font-semibold">Créneau horaire souhaité</span>
                    <select
                      className={field}
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                    >
                      {TIME_SLOT_CHOICES.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </label>

                  {/* Informations complémentaires */}
                  <label className="block space-y-1.5 pt-1">
                    <span className="text-sm font-semibold flex items-center justify-between">
                      <span>Informations complémentaires</span>
                      <span className="text-xs font-normal text-muted-foreground">
                        (facultatif)
                      </span>
                    </span>
                    <textarea
                      className={field}
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Précisions sur l'état de la voiture, accès particulier, code portail, questions..."
                    />
                  </label>

                  {/* Avertissement informatif obligatoire */}
                  <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-xs text-foreground/85 leading-relaxed">
                    <p className="font-semibold text-primary mb-0.5">Information importante :</p>
                    Votre demande ne constitue pas une réservation définitive. Nous vous
                    recontacterons pour confirmer votre rendez-vous.
                  </div>

                  {/* Message d'erreur éventuel */}
                  {stepError && (
                    <p
                      role="alert"
                      className="text-sm font-semibold text-destructive flex items-center gap-1.5"
                    >
                      <AlertCircle className="size-4 shrink-0" />
                      {stepError}
                    </p>
                  )}

                  {/* Navigation étape 3 */}
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={goToPreviousStep}
                      className="btn btn-outline py-3.5 px-5 text-base justify-center"
                    >
                      <ArrowLeft className="size-4 mr-1" />
                      Retour
                    </button>
                    <button
                      type="button"
                      onClick={goToNextStep}
                      className="btn btn-primary flex-1 py-3.5 text-base justify-center shadow-sm"
                    >
                      Continuer vers Vos coordonnées
                      <ArrowRight className="size-5 ml-1" />
                    </button>
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* ÉTAPE 4 : Vos coordonnées, Récapitulatif & Confirmation                    */}
              {/* ========================================================================= */}
              {currentStep === 4 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div>
                    <h2 className="text-3xl font-display uppercase tracking-wide">
                      4. Vos coordonnées & Confirmation
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Dernière étape : indiquez où et comment vous joindre, puis transmettez votre
                      demande.
                    </p>
                  </div>

                  {/* Coordonnées */}
                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="space-y-1.5">
                        <span className="text-sm font-semibold">Nom et prénom *</span>
                        <input
                          type="text"
                          required
                          className={field}
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                            if (stepError) setStepError("");
                          }}
                          placeholder="Ex. : Jean Dupont"
                          autoComplete="name"
                        />
                      </label>

                      <label className="space-y-1.5">
                        <span className="text-sm font-semibold">Numéro de téléphone *</span>
                        <input
                          type="tel"
                          required
                          className={field}
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            if (stepError) setStepError("");
                          }}
                          placeholder="Ex. : 06 12 34 56 78"
                          autoComplete="tel"
                        />
                      </label>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="space-y-1.5">
                        <span className="text-sm font-semibold">Adresse d'intervention *</span>
                        <input
                          type="text"
                          required
                          className={field}
                          value={address}
                          onChange={(e) => {
                            setAddress(e.target.value);
                            if (stepError) setStepError("");
                          }}
                          placeholder="Ex. : 12 rue de la Paix"
                          autoComplete="street-address"
                        />
                      </label>

                      <label className="space-y-1.5">
                        <span className="text-sm font-semibold">Ville d'intervention *</span>
                        <input
                          type="text"
                          required
                          className={field}
                          value={city}
                          onChange={(e) => {
                            setCity(e.target.value);
                            if (stepError) setStepError("");
                          }}
                          placeholder="Ex. : Wambrechies, Lille..."
                          autoComplete="address-level2"
                        />
                      </label>
                    </div>

                    {/* Information conditions de déplacement */}
                    <div className="rounded-xl border border-primary/20 bg-secondary/40 p-4 text-xs space-y-1.5">
                      <div className="flex items-center gap-2 font-semibold text-foreground">
                        <MapPin className="size-4 text-primary shrink-0" />
                        <span>Déplacement offert jusqu'à 15 km autour de Lille</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed pl-6">
                        Au-delà de 15 km, seuls les kilomètres supplémentaires sont facturés à 0,50
                        €/km, aller-retour. Les éventuels frais de déplacement seront calculés selon
                        l'itinéraire routier et vous seront communiqués pour accord avant validation
                        définitive de votre réservation.
                      </p>
                    </div>

                    <label className="block space-y-1.5">
                      <span className="text-sm font-semibold flex items-center justify-between">
                        <span>Adresse e-mail</span>
                        <span className="text-xs font-normal text-muted-foreground">
                          (facultative)
                        </span>
                      </span>
                      <input
                        type="email"
                        className={field}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ex. : jean.dupont@email.fr"
                        autoComplete="email"
                      />
                    </label>
                  </div>

                  {/* Récapitulatif clair de la demande */}
                  <div className="rounded-2xl border bg-secondary/30 p-5 space-y-3">
                    <div className="flex items-center justify-between border-b pb-2">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
                        Récapitulatif de votre demande
                      </h3>
                      <button
                        type="button"
                        onClick={() => jumpToStep(1)}
                        className="text-xs text-primary font-semibold hover:underline"
                      >
                        Modifier
                      </button>
                    </div>

                    <div className="grid gap-2 text-xs sm:text-sm">
                      <div className="flex justify-between py-1 border-b border-border/50">
                        <span className="text-muted-foreground">Prestation :</span>
                        <span className="font-semibold text-right">
                          {selectedFormula
                            ? `${selectedFormula.name} (${euro(selectedFormula.price)}) · ${selectedFormula.duration}`
                            : "À définir ensemble"}
                        </span>
                      </div>

                      {selectedCaresList.length > 0 && (
                        <div className="flex justify-between py-1 border-b border-border/50">
                          <span className="text-muted-foreground">
                            Prestations complémentaires :
                          </span>
                          <span className="font-semibold text-right">
                            {selectedCaresList.map((c) => c.name).join(", ")} (+
                            {euro(selectedCaresList.reduce((acc, c) => acc + c.price, 0))})
                          </span>
                        </div>
                      )}

                      {hasIntensiveDirt && (
                        <div className="flex justify-between py-1 border-b border-border/50">
                          <span className="text-muted-foreground">Salissures intensives :</span>
                          <span className="font-semibold text-right text-primary">
                            Sur devis personnalisé
                          </span>
                        </div>
                      )}

                      <div className="flex justify-between py-1 border-b border-border/50">
                        <span className="text-muted-foreground">Frais de déplacement :</span>
                        <span className="font-semibold text-right">
                          Offert jusqu'à 15 km de Lille
                          <span className="block text-[11px] font-normal text-muted-foreground">
                            (0,50 €/km supp. A/R au-delà si applicable)
                          </span>
                        </span>
                      </div>

                      <div className="flex justify-between py-1 border-b border-border/50">
                        <span className="text-muted-foreground">Véhicule :</span>
                        <span className="font-semibold text-right">
                          {vehicle.trim() || "Non précisé"} ({parking})
                        </span>
                      </div>

                      <div className="flex justify-between py-1 border-b border-border/50">
                        <span className="text-muted-foreground">Date souhaitée :</span>
                        <span className="font-semibold text-right">
                          {dateChoice === "calendar" && preferredDate
                            ? preferredDate
                            : "À convenir ensemble"}{" "}
                          — {timeSlot}
                        </span>
                      </div>
                    </div>

                    {/* Tarif total estimé */}
                    <div className="pt-2 flex items-center justify-between border-t border-border">
                      <div>
                        <span className="font-bold text-base text-foreground block">
                          Tarif total estimé
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Hors éventuels frais de déplacement au-delà de 15 km
                        </span>
                      </div>
                      <span className="font-display text-4xl font-bold text-primary">
                        {total ? euro(total) : "—"}
                      </span>
                    </div>
                  </div>

                  {/* Erreur de validation */}
                  {stepError && (
                    <p
                      role="alert"
                      className="text-sm font-semibold text-destructive flex items-center gap-1.5"
                    >
                      <AlertCircle className="size-4 shrink-0" />
                      {stepError}
                    </p>
                  )}

                  {/* Statuts d'envoi e-mail */}
                  {emailStatus.type === "success" && (
                    <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm text-emerald-800 dark:text-emerald-200 flex items-start gap-3">
                      <Check className="size-5 shrink-0 text-emerald-600 mt-0.5" />
                      <div>
                        <p className="font-bold">Demande envoyée avec succès !</p>
                        <p className="text-xs opacity-90 mt-0.5">{emailStatus.message}</p>
                      </div>
                    </div>
                  )}

                  {emailStatus.type === "error" && (
                    <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 text-sm text-amber-900 dark:text-amber-200 flex items-start gap-3">
                      <AlertCircle className="size-5 shrink-0 text-amber-600 mt-0.5" />
                      <div>
                        <p className="font-bold">Transmission par e-mail direct</p>
                        <p className="text-xs opacity-90 mt-0.5">{emailStatus.message}</p>
                      </div>
                    </div>
                  )}

                  {/* Reassurance validation manuelle */}
                  <div className="rounded-xl border border-primary/20 bg-primary/5 p-3.5 flex items-center gap-3 text-xs text-foreground/90">
                    <CheckCircle2 className="size-4.5 text-primary shrink-0" />
                    <p>
                      <strong>Validation manuelle sans paiement immédiat :</strong> nous vous
                      contactons sous 24 h pour confirmer la date. Le règlement s'effectue sur place
                      une fois le nettoyage réalisé.
                    </p>
                  </div>

                  {/* Boutons d'action finale */}
                  <div className="space-y-3 pt-2">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        type="button"
                        onClick={sendWhatsApp}
                        className="btn btn-whatsapp flex-1 py-3.5 text-base justify-center shadow-sm"
                      >
                        <MessageCircle className="size-5 shrink-0" />
                        Envoyer via WhatsApp
                      </button>

                      <button
                        type="button"
                        onClick={sendEmail}
                        disabled={emailStatus.type === "loading"}
                        className="btn btn-primary flex-1 py-3.5 text-base justify-center shadow-sm disabled:opacity-60"
                      >
                        <Mail className="size-5 shrink-0" />
                        {emailStatus.type === "loading"
                          ? "Envoi en cours..."
                          : "Envoyer par e-mail"}
                      </button>
                    </div>

                    <div className="flex justify-between items-center gap-3 pt-1">
                      <button
                        type="button"
                        onClick={goToPreviousStep}
                        className="btn btn-outline py-2.5 px-4 text-sm justify-center"
                      >
                        <ArrowLeft className="size-4 mr-1" />
                        Retour
                      </button>

                      <button
                        type="button"
                        onClick={copy}
                        className="btn btn-outline py-2.5 px-4 text-sm justify-center"
                        title="Copier le récapitulatif pour l'envoyer par SMS"
                      >
                        {copied ? (
                          <Check className="size-4 text-emerald-600" />
                        ) : (
                          <Copy className="size-4" />
                        )}
                        {copied ? "Copié !" : "Copier ma demande"}
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground text-center pt-2">
                    Vos données personnelles sont strictement confidentielles et utilisées
                    uniquement pour votre rendez-vous.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
