import {
  Shield,
  TrendingDown,
  Clock,
  Eye,
  Banknote,
  Timer,
  Settings,
  ShieldCheck,
  Search,
  FileText,
  Wrench,
  Repeat,
  CheckCircle2,
  Phone,
  Mail,
  Globe,
  MapPin,
} from "lucide-react";

/* ─── PAGE 1 : IMPACT & BÉNÉFICES ─────────────────────────── */
function PageOne() {
  return (
    <section className="brochure-page" style={{ display: "flex", flexDirection: "column" }}>
      {/* Background halos */}
      <div
        style={{
          position: "absolute", top: "-30mm", left: "-20mm",
          width: "100mm", height: "100mm",
          background: "radial-gradient(circle, rgba(59,130,246,0.12), transparent 70%)",
          borderRadius: "50%", pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute", bottom: "-20mm", right: "-25mm",
          width: "90mm", height: "90mm",
          background: "radial-gradient(circle, rgba(124,58,237,0.08), transparent 70%)",
          borderRadius: "50%", pointerEvents: "none",
        }}
      />
      {/* Grid texture */}
      <div
        style={{
          position: "absolute", inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
          backgroundSize: "10mm 10mm",
          pointerEvents: "none",
        }}
      />

      {/* Accent bar */}
      <div
        style={{
          height: "1.5mm",
          background: "linear-gradient(90deg, #3b82f6, #7c3aed, #3b82f6)",
          flexShrink: 0,
          position: "relative",
          zIndex: 2,
        }}
      />

      {/* Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "8mm 12mm 8mm", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <header style={{ display: "flex", alignItems: "center", gap: "3mm", marginBottom: "7mm" }}>
          <div
            style={{
              width: "9mm", height: "9mm", borderRadius: "2.5mm",
              background: "linear-gradient(135deg, #3b82f6, #7c3aed)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Shield style={{ width: "5mm", height: "5mm", color: "white" }} fill="currentColor" />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "14pt", fontWeight: 900, letterSpacing: "0.15em", textTransform: "uppercase", lineHeight: 1 }}>
              AEGIS NETWORK
            </span>
            <span style={{ fontSize: "7pt", color: "#94a3b8", fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", marginTop: "1mm" }}>
              Conseil &amp; Optimisation IT
            </span>
          </div>
        </header>

        {/* Headline */}
        <div style={{ marginBottom: "7mm" }}>
          <h1 style={{ fontSize: "26pt", fontWeight: 900, lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: "3mm" }}>
            Votre IT coûte plus
            <br />
            <span
              style={{
                background: "linear-gradient(90deg, #3b82f6, #7c3aed)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              qu&apos;elle ne devrait.
            </span>
          </h1>
          <p style={{ fontSize: "10.5pt", color: "#cbd5e1", lineHeight: 1.5, maxWidth: "155mm" }}>
            Contrats jamais renégociés, incidents récurrents, prestataires non challengés.
            <br />
            AEGIS NETWORK accompagne les TPE et PME pour réduire les coûts, gagner du temps et reprendre le contrôle.
          </p>
        </div>

        {/* Key figures — 3 columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "4mm",
            marginBottom: "7mm",
          }}
        >
          <StatCard
            icon={<Banknote style={{ width: "4.5mm", height: "4.5mm" }} />}
            iconColor="#3b82f6"
            number="78 %"
            label="des dirigeants TPE/PME estiment que le numérique est un bénéfice réel"
            source="France Num, 2025"
          />
          <StatCard
            icon={<Timer style={{ width: "4.5mm", height: "4.5mm" }} />}
            iconColor="#7c3aed"
            number="54 %"
            label="des TPE : les charges admin déléguées pèsent 1 à 3 % du CA"
            source="SDI, 2023"
          />
          <StatCard
            icon={<ShieldCheck style={{ width: "4.5mm", height: "4.5mm" }} />}
            iconColor="#3b82f6"
            number="29 %"
            label="des TPE-PME victimes d'incidents déclarent des interruptions de service"
            source="Cybermalveillance, 2025"
          />
        </div>

        {/* 4 Benefits grid */}
        <div style={{ marginBottom: "6mm" }}>
          <p style={{ fontSize: "7pt", fontWeight: 700, color: "#3b82f6", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "3mm" }}>
            Ce que vous pouvez y gagner
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3.5mm" }}>
            <BenefitCard
              icon={<TrendingDown style={{ width: "4.5mm", height: "4.5mm" }} />}
              title="Réduction des coûts"
              desc="Renégociation des contrats, suppression des doublons, optimisation des abonnements."
            />
            <BenefitCard
              icon={<Clock style={{ width: "4.5mm", height: "4.5mm" }} />}
              title="Gain de temps"
              desc="Moins de gestion technique au quotidien, des processus simplifiés et fiables."
            />
            <BenefitCard
              icon={<Eye style={{ width: "4.5mm", height: "4.5mm" }} />}
              title="Reprise de contrôle"
              desc="Visibilité totale sur vos contrats, prestataires et engagements. Plus de zones d'ombre."
            />
            <BenefitCard
              icon={<Settings style={{ width: "4.5mm", height: "4.5mm" }} />}
              title="Optimisation de l'existant"
              desc="Tirer le meilleur de vos outils, votre réseau et votre téléphonie avant tout investissement."
            />
          </div>
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Bottom anchor */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: "4mm",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: "9pt", fontWeight: 700, color: "#e2e8f0" }}>
            AEGIS NETWORK — Votre chef de projet IT externe.
          </p>
          <p style={{ fontSize: "7.5pt", color: "#64748b" }}>
            aegisnetwork.fr
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─── PAGE 2 : MÉTHODE & CRÉDIBILITÉ ──────────────────────── */
function PageTwo() {
  return (
    <section className="brochure-page" style={{ display: "flex", flexDirection: "column" }}>
      {/* Background halos */}
      <div
        style={{
          position: "absolute", top: "40%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "120mm", height: "80mm",
          background: "radial-gradient(ellipse, rgba(59,130,246,0.06), transparent 70%)",
          pointerEvents: "none",
        }}
      />
      {/* Grid texture */}
      <div
        style={{
          position: "absolute", inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
          backgroundSize: "10mm 10mm",
          pointerEvents: "none",
        }}
      />

      {/* Accent bar */}
      <div
        style={{
          height: "1.5mm",
          background: "linear-gradient(90deg, #3b82f6, #7c3aed, #3b82f6)",
          flexShrink: 0,
          position: "relative",
          zIndex: 2,
        }}
      />

      {/* Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "8mm 12mm 8mm", position: "relative", zIndex: 1 }}>
        {/* Section title */}
        <div style={{ marginBottom: "6mm" }}>
          <p style={{ fontSize: "7pt", fontWeight: 700, color: "#7c3aed", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "2mm" }}>
            Notre méthode
          </p>
          <h2 style={{ fontSize: "22pt", fontWeight: 900, lineHeight: 1.15, letterSpacing: "-0.02em" }}>
            Un accompagnement{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #3b82f6, #7c3aed)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              clair et structuré.
            </span>
          </h2>
        </div>

        {/* 4 Steps */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3.5mm", marginBottom: "7mm" }}>
          <StepCard
            step="01"
            icon={<Search style={{ width: "4.5mm", height: "4.5mm", color: "white" }} />}
            color="#3b82f6"
            title="Premier échange"
            desc="Un point rapide et gratuit pour comprendre votre contexte, vos enjeux et identifier les premiers leviers d'optimisation."
          />
          <StepCard
            step="02"
            icon={<FileText style={{ width: "4.5mm", height: "4.5mm", color: "white" }} />}
            color="#6366f1"
            title="Devis sur mesure"
            desc="Une proposition claire, adaptée à votre budget et à vos priorités. Pas de forfait standard : chaque accompagnement est taillé sur mesure."
          />
          <StepCard
            step="03"
            icon={<Wrench style={{ width: "4.5mm", height: "4.5mm", color: "white" }} />}
            color="#7c3aed"
            title="Prestation & audit"
            desc="Analyse approfondie de vos contrats, prestataires et outils. Recommandations concrètes, pilotage des changements, renégociations."
          />
          <StepCard
            step="04"
            icon={<Repeat style={{ width: "4.5mm", height: "4.5mm", color: "white" }} />}
            color="#8b5cf6"
            title="Suivi récurrent"
            desc="Si pertinent, un accompagnement dans la durée pour surveiller les performances, anticiper les évolutions et maintenir vos acquis."
          />
        </div>

        {/* Legitimacy block */}
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "4mm",
            padding: "6mm 7mm",
            marginBottom: "7mm",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "2.5mm", marginBottom: "4mm" }}>
            <div
              style={{
                width: "7mm", height: "7mm", borderRadius: "2mm",
                background: "linear-gradient(135deg, #3b82f6, #7c3aed)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Shield style={{ width: "4mm", height: "4mm", color: "white" }} fill="currentColor" />
            </div>
            <p style={{ fontSize: "8pt", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em" }}>
              Pourquoi AEGIS NETWORK
            </p>
          </div>
          <p style={{ fontSize: "9pt", color: "#cbd5e1", lineHeight: 1.6, marginBottom: "4mm" }}>
            AEGIS NETWORK est né d&apos;un constat terrain : trop de PME subissent leur IT au lieu de la piloter.
            Des contrats jamais challengés, des incidents mal traités, des prestataires non pilotés.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3mm" }}>
            {[
              "Plus de 9 ans d'expérience en société de services",
              "Rôle de responsable technique, proche direction",
              "Gestion d'incidents, crises et prestataires",
              "Approche directe : traiter la cause, pas le symptôme",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "2mm" }}>
                <CheckCircle2 style={{ width: "3.5mm", height: "3.5mm", color: "#3b82f6", flexShrink: 0, marginTop: "0.5mm" }} />
                <span style={{ fontSize: "8pt", color: "#e2e8f0", lineHeight: 1.45 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Contact strip */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(59,130,246,0.08), rgba(124,58,237,0.08))",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "4mm",
            padding: "5mm 7mm",
            marginBottom: "5mm",
          }}
        >
          <p style={{ fontSize: "7pt", fontWeight: 700, color: "#7c3aed", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "3mm" }}>
            Échangeons sur votre situation
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "3mm" }}>
            <ContactItem icon={<Phone style={{ width: "3.5mm", height: "3.5mm" }} />} text="06 52 95 00 10" />
            <ContactItem icon={<Mail style={{ width: "3.5mm", height: "3.5mm" }} />} text="contact@aegisnetwork.fr" />
            <ContactItem icon={<Globe style={{ width: "3.5mm", height: "3.5mm" }} />} text="aegisnetwork.fr" />
            <ContactItem icon={<MapPin style={{ width: "3.5mm", height: "3.5mm" }} />} text="Lyon, France" />
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: "3mm",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "2mm" }}>
            <div
              style={{
                width: "5mm", height: "5mm", borderRadius: "1.5mm",
                background: "linear-gradient(135deg, #3b82f6, #7c3aed)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <Shield style={{ width: "3mm", height: "3mm", color: "white" }} fill="currentColor" />
            </div>
            <span style={{ fontSize: "7pt", fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase" }}>
              AEGIS NETWORK
            </span>
          </div>
          <span style={{ fontSize: "6.5pt", color: "#64748b" }}>
            © 2026 Aegis Network · Conseil &amp; Optimisation IT
          </span>
        </div>
      </div>
    </section>
  );
}

/* ─── COMPOSANTS INTERNES ──────────────────────────────────── */

function StatCard({
  icon,
  iconColor,
  number,
  label,
  source,
}: {
  icon: React.ReactNode;
  iconColor: string;
  number: string;
  label: string;
  source: string;
}) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "3.5mm",
        padding: "4.5mm 4mm",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ color: iconColor, marginBottom: "2mm", display: "flex", alignItems: "center", gap: "1.5mm" }}>
        {icon}
      </div>
      <div
        style={{
          fontSize: "22pt",
          fontWeight: 900,
          lineHeight: 1,
          marginBottom: "2mm",
          background: `linear-gradient(135deg, ${iconColor}, ${iconColor}cc)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {number}
      </div>
      <p style={{ fontSize: "7pt", color: "#cbd5e1", lineHeight: 1.4, marginBottom: "2mm", flex: 1 }}>
        {label}
      </p>
      <p style={{ fontSize: "6pt", color: "#64748b", fontStyle: "italic" }}>
        Source : {source}
      </p>
    </div>
  );
}

function BenefitCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "3mm",
        padding: "4mm 4.5mm",
        display: "flex",
        gap: "3mm",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          width: "7mm",
          height: "7mm",
          borderRadius: "2mm",
          background: "rgba(59,130,246,0.1)",
          border: "1px solid rgba(59,130,246,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          color: "#3b82f6",
        }}
      >
        {icon}
      </div>
      <div>
        <p style={{ fontSize: "8.5pt", fontWeight: 700, color: "white", marginBottom: "1mm" }}>{title}</p>
        <p style={{ fontSize: "7pt", color: "#94a3b8", lineHeight: 1.45 }}>{desc}</p>
      </div>
    </div>
  );
}

function StepCard({
  step,
  icon,
  color,
  title,
  desc,
}: {
  step: string;
  icon: React.ReactNode;
  color: string;
  title: string;
  desc: string;
}) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "3.5mm",
        padding: "5mm",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Step number watermark */}
      <span
        style={{
          position: "absolute",
          top: "2mm",
          right: "3mm",
          fontSize: "28pt",
          fontWeight: 900,
          color: "rgba(255,255,255,0.04)",
          lineHeight: 1,
        }}
      >
        {step}
      </span>
      <div
        style={{
          width: "7mm",
          height: "7mm",
          borderRadius: "2mm",
          background: color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          marginBottom: "3mm",
        }}
      >
        {icon}
      </div>
      <p style={{ fontSize: "9pt", fontWeight: 700, color: "white", marginBottom: "2mm" }}>
        {title}
      </p>
      <p style={{ fontSize: "7.5pt", color: "#94a3b8", lineHeight: 1.5 }}>
        {desc}
      </p>
      {/* Bottom accent bar */}
      <div
        style={{
          width: "10mm",
          height: "0.8mm",
          borderRadius: "1mm",
          background: color,
          marginTop: "3mm",
          opacity: 0.6,
        }}
      />
    </div>
  );
}

function ContactItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "2mm" }}>
      <div style={{ color: "#3b82f6", flexShrink: 0 }}>{icon}</div>
      <span style={{ fontSize: "7.5pt", color: "#e2e8f0", fontWeight: 500 }}>{text}</span>
    </div>
  );
}

/* ─── PAGE PRINCIPALE ──────────────────────────────────────── */
export default function Home() {
  return (
    <div className="brochure-wrapper">
      <PageOne />
      <PageTwo />
    </div>
  );
}
