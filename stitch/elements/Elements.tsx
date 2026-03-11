import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft, Check, Zap, ShieldCheck, Activity, Globe,
  PhoneCall, Server, Cpu, Clock, Users, ArrowRight,
  BarChart3, Wifi, Layers, Settings2, Lock, Network,
  ChevronDown, TrendingUp, Timer, Info, Eye, Shield, Radio
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { AegisLogo } from '../components/AegisLogo';

export default function Elements() {
  return (
    <div className="min-h-screen bg-background-deep text-white selection:bg-blue-600 selection:text-white pb-32">
      {/* Simple Nav */}
      <nav className="sticky top-0 w-full z-50 bg-background-deep/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-bold text-sm uppercase tracking-widest">
            <ArrowLeft size={16} />
            Retour à l'accueil
          </Link>
          <div className="text-xl font-black tracking-[0.15em] text-white">
            AEGIS <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">UI KIT</span>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 pt-20">
        <div className="mb-20">
          <h1 className="text-5xl font-black mb-6">Composants & Éléments Visuels</h1>
          <p className="text-xl text-slate-400 max-w-3xl leading-relaxed">
            Une collection d'éléments interactifs et modernes pour enrichir l'expérience utilisateur.
            Ces composants peuvent être intégrés dans les pages de destination, les tableaux de bord ou les présentations de services.
          </p>
        </div>

        <div className="space-y-32">
          <Element1BentoGrid />
          <Element2PricingToggle />
          <Element3StatusDashboard />
          <Element4ProcessTimeline />
          <Element5FeatureComparison />
          <Element6HoverCards />
          <Element7Testimonials />
          <Element8ROICalculator />
          <Element9NetworkMap />
          <Element10MagneticCTA />
          <Element11GraphicElements />
        </div>
      </div>
    </div>
  );
}

// --- ELEMENT 1: Bento Grid ---
const Element1BentoGrid = () => (
  <section>
    <SectionHeader title="01. Bento Grid" desc="Mise en page asymétrique moderne pour présenter des statistiques ou des fonctionnalités clés." />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[200px]">
      <div className="md:col-span-2 glass-card rounded-[2rem] p-8 flex flex-col justify-between relative overflow-hidden group">
        <div className="absolute right-0 top-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px] group-hover:bg-blue-600/30 transition-all" />
        <div>
          <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center text-optical-blue mb-4">
            <Activity size={24} />
          </div>
          <h3 className="text-2xl font-bold">Uptime Garanti</h3>
        </div>
        <div>
          <div className="text-5xl font-black text-white">99.99%</div>
          <p className="text-slate-400 mt-2">Disponibilité réseau sur les 12 derniers mois.</p>
        </div>
      </div>

      <div className="glass-card rounded-[2rem] p-8 flex flex-col justify-between relative overflow-hidden group">
        <div className="absolute right-0 top-0 w-32 h-32 bg-violet-600/20 rounded-full blur-[40px]" />
        <Globe className="text-accent-violet" size={32} />
        <div>
          <div className="text-3xl font-black text-white">12ms</div>
          <p className="text-slate-400 text-sm mt-1">Latence moyenne</p>
        </div>
      </div>

      <div className="glass-card rounded-[2rem] p-8 flex flex-col justify-between relative overflow-hidden group">
        <ShieldCheck className="text-emerald-400" size={32} />
        <div>
          <div className="text-xl font-bold text-white mb-1">DDoS Protection</div>
          <p className="text-slate-400 text-sm">Filtrage actif L7</p>
        </div>
      </div>

      <div className="md:col-span-2 glass-card rounded-[2rem] p-8 flex items-center justify-between relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-transparent" />
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-2">Bande Passante Dédiée</h3>
          <p className="text-slate-400">Jusqu'à 10 Gbps symétrique pour vos locaux.</p>
        </div>
        <div className="relative z-10 w-16 h-16 rounded-full border-4 border-blue-600/30 border-t-optical-blue animate-spin" />
      </div>
    </div>
  </section>
);

// --- ELEMENT 2: Pricing Toggle ---
const Element2PricingToggle = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section>
      <SectionHeader title="02. Pricing Toggle" desc="Cartes de tarification interactives avec bascule mensuel/annuel." />
      <div className="flex justify-center mb-10">
        <div className="bg-white/5 p-1.5 rounded-2xl flex items-center gap-2 border border-white/10">
          <button
            onClick={() => setIsAnnual(false)}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${!isAnnual ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Mensuel
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${isAnnual ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Annuel (-20%)
          </button>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="glass-card p-10 rounded-[2.5rem] border-white/5">
          <h4 className="text-xl font-bold text-white mb-2">Fibre Pro</h4>
          <p className="text-slate-400 text-sm mb-6">Pour les petites équipes.</p>
          <div className="mb-8">
            <span className="text-5xl font-black text-white">{isAnnual ? '79' : '99'}€</span>
            <span className="text-slate-500">/mois</span>
          </div>
          <ul className="space-y-4 mb-10">
            {['Débit symétrique 1 Gbps', 'Routeur Wi-Fi 6 inclus', 'Support 5j/7', '1 IP Fixe'].map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-300">
                <Check size={18} className="text-optical-blue" /> {feature}
              </li>
            ))}
          </ul>
          <button className="w-full h-12 rounded-xl border border-white/20 font-bold hover:bg-white/5 transition-all">Choisir</button>
        </div>
        <div className="glass-card p-10 rounded-[2.5rem] border-optical-blue/50 relative premium-glow bg-blue-900/10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-accent-violet px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
            Recommandé
          </div>
          <h4 className="text-xl font-bold text-white mb-2">Fibre Entreprise</h4>
          <p className="text-slate-400 text-sm mb-6">Pour les infrastructures critiques.</p>
          <div className="mb-8">
            <span className="text-5xl font-black text-white">{isAnnual ? '199' : '249'}€</span>
            <span className="text-slate-500">/mois</span>
          </div>
          <ul className="space-y-4 mb-10">
            {['Débit symétrique 10 Gbps', 'GTR 4H Garantie', 'Support 24/7 Prioritaire', 'Bloc /29 IP Fixes', 'Backup 5G inclus'].map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-300">
                <Check size={18} className="text-accent-violet" /> {feature}
              </li>
            ))}
          </ul>
          <button className="glow-button w-full h-12 rounded-xl bg-blue-600 font-bold transition-all">Choisir</button>
        </div>
      </div>
    </section>
  );
};

// --- ELEMENT 3: Status Dashboard ---
const Element3StatusDashboard = () => (
  <section>
    <SectionHeader title="03. Status Widget" desc="Mini-dashboard pour afficher l'état du réseau en temps réel." />
    <div className="glass-card p-8 rounded-[2rem] max-w-3xl mx-auto border-white/10">
      <div className="flex items-center justify-between mb-8 pb-8 border-b border-white/5">
        <div className="flex items-center gap-4">
          <div className="relative flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
          </div>
          <h3 className="text-xl font-bold">Tous les systèmes opérationnels</h3>
        </div>
        <span className="text-sm text-slate-500">Mise à jour: Il y a 2 min</span>
      </div>
      <div className="space-y-6">
        {[
          { name: 'Réseau Core (Paris)', status: '100%', color: 'bg-emerald-500' },
          { name: 'Services VoIP', status: '100%', color: 'bg-emerald-500' },
          { name: 'API Client', status: '99.8%', color: 'bg-emerald-500' }
        ].map((sys, i) => (
          <div key={i} className="flex items-center justify-between">
            <span className="text-slate-300 font-medium">{sys.name}</span>
            <div className="flex items-center gap-4">
              <div className="w-32 h-2 bg-white/5 rounded-full overflow-hidden">
                <div className={`h-full ${sys.color} rounded-full`} style={{ width: sys.status }} />
              </div>
              <span className="text-sm font-mono text-slate-400 w-12 text-right">{sys.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// --- ELEMENT 4: Process Timeline ---
const Element4ProcessTimeline = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    {
      step: "01",
      title: "Audit de l'infrastructure",
      icon: <Activity size={20} />,
      summary: "Comprendre votre environnement avant toute action.",
      details: [
        "Analyse de l'existant : liens, équipements, prestataires en place",
        "Compréhension des usages réels, des contraintes et des dépendances métier",
        "Identification des points de fragilité et des risques en cas de changement",
        "Cartographie des flux critiques et priorisation des besoins"
      ],
      note: null
    },
    {
      step: "02",
      title: "Conception sur mesure",
      icon: <Layers size={20} />,
      summary: "Définir une cible claire, adaptée à votre entreprise.",
      details: [
        "Définition de l'architecture cible (liens, opérateurs, redondance)",
        "Cadrage technique et organisationnel des évolutions à mener",
        "Recommandations adaptées : opérateur, équipements, niveaux de service",
        "Rédaction d'un cahier des charges structuré si nécessaire"
      ],
      note: null
    },
    {
      step: "03",
      title: "Accompagnement du déploiement",
      icon: <Users size={20} />,
      summary: "Coordonner et sécuriser chaque étape du changement.",
      details: [
        "Coordination des échanges avec les prestataires et opérateurs",
        "Relecture et validation des éléments techniques et contractuels",
        "Anticipation des erreurs, coupures et imprévus opérationnels",
        "Rôle d'intermédiaire technique et stratégique tout au long du projet"
      ],
      note: "Nous ne posons pas la fibre ni les équipements. Nous coordonnons, cadrons et sécurisons le projet pour limiter les erreurs et les interruptions."
    },
    {
      step: "04",
      title: "Suivi continu & pilotage",
      icon: <ShieldCheck size={20} />,
      summary: "Veiller, relancer, résoudre — à votre place.",
      details: [
        "Surveillance des lignes, du lien et des incidents récurrents",
        "Coordination avec les prestataires : relances, escalades, suivi",
        "Interlocuteur principal en cas de problème bloquant ou répétitif",
        "Vos équipes se recentrent sur leur métier, pas sur les échanges télécom"
      ],
      note: "Ce suivi peut s'inscrire dans un contrat dédié, adapté à la taille et aux besoins de votre structure."
    }
  ];

  return (
    <section>
      <SectionHeader
        title="04. Process Timeline"
        desc="Notre méthodologie d'accompagnement, de l'audit initial au suivi continu."
      />
      <div className="max-w-4xl mx-auto relative">
        {/* Vertical gradient line */}
        <div className="absolute left-[31px] top-8 bottom-8 w-px bg-gradient-to-b from-blue-500 via-violet-500 to-transparent" />

        <div className="space-y-6">
          {steps.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="flex gap-6 relative group cursor-pointer"
              onClick={() => setActiveStep(activeStep === i ? null : i)}
            >
              {/* Node */}
              <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center relative z-10 transition-all duration-300 shrink-0 ${
                activeStep === i
                  ? 'bg-gradient-to-br from-blue-500 to-violet-500 border-transparent text-white shadow-[0_0_30px_rgba(56,189,248,0.25)]'
                  : 'bg-background-deep border-white/15 text-optical-blue group-hover:border-white/30'
              }`}>
                {item.icon}
              </div>

              {/* Card */}
              <div className={`flex-1 rounded-2xl p-6 transition-all duration-300 border ${
                activeStep === i
                  ? 'glass-card border-white/15 shadow-[0_0_30px_rgba(56,189,248,0.08)]'
                  : 'bg-transparent border-transparent group-hover:bg-white/[0.02] group-hover:border-white/5'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-optical-blue/70 uppercase tracking-[0.2em]">Étape {item.step}</span>
                    <h4 className="text-xl font-bold text-white mt-0.5">{item.title}</h4>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-slate-500 transition-transform duration-300 ${activeStep === i ? 'rotate-180' : ''}`}
                  />
                </div>
                <p className="text-slate-400 text-sm mt-1">{item.summary}</p>

                <AnimatePresence>
                  {activeStep === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <ul className="mt-4 pt-4 border-t border-white/5 space-y-3">
                        {item.details.map((detail, j) => (
                          <motion.li
                            key={j}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: j * 0.08 }}
                            className="flex items-start gap-3 text-sm text-slate-300"
                          >
                            <Check size={14} className="text-optical-blue mt-0.5 shrink-0" />
                            <span>{detail}</span>
                          </motion.li>
                        ))}
                      </ul>
                      {item.note && (
                        <p className="mt-4 text-xs text-slate-500 italic leading-relaxed border-l-2 border-white/10 pl-3">
                          {item.note}
                        </p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- ELEMENT 5: Feature Comparison ---
const Element5FeatureComparison = () => (
  <section>
    <SectionHeader title="05. Comparison Table" desc="Tableau comparatif pour mettre en valeur la supériorité de vos solutions." />
    <div className="glass-card rounded-[2rem] overflow-hidden border-white/10">
      <div className="grid grid-cols-3 bg-white/5 p-6 border-b border-white/5">
        <div className="font-bold text-slate-400">Fonctionnalité</div>
        <div className="font-bold text-slate-400 text-center">Opérateur Classique</div>
        <div className="font-bold text-optical-blue text-center flex items-center justify-center gap-2">
          <AegisLogo className="w-5 h-5" /> AEGIS NETWORK
        </div>
      </div>
      {[
        { feature: "Temps de rétablissement (GTR)", old: "J+1 ou sans garantie", new: "4 Heures Garanti" },
        { feature: "Débit", old: "Asymétrique (ADSL/VDSL)", new: "Symétrique 100% Fibre" },
        { feature: "Support Technique", old: "Plateforme délocalisée", new: "Ingénieurs locaux dédiés" },
        { feature: "Supervision", old: "Réactive (sur appel)", new: "Proactive 24/7" },
      ].map((row, i) => (
        <div key={i} className="grid grid-cols-3 p-6 border-b border-white/5 hover:bg-white/5 transition-colors">
          <div className="font-medium text-white">{row.feature}</div>
          <div className="text-slate-500 text-center">{row.old}</div>
          <div className="text-emerald-400 font-bold text-center">{row.new}</div>
        </div>
      ))}
    </div>
  </section>
);

// --- ELEMENT 6: Hover Reveal Cards ---
const Element6HoverCards = () => (
  <section>
    <SectionHeader title="06. Hover Reveal Cards" desc="Cartes interactives qui dévoilent plus d'informations au survol." />
    <div className="grid md:grid-cols-3 gap-6">
      {[
        { title: "Téléphonie Cloud", icon: <PhoneCall size={32} />, desc: "PABX virtuel, SVI avancé, enregistrement des appels et intégration CRM native." },
        { title: "Réseau SD-WAN", icon: <Network size={32} />, desc: "Agrégez vos liens, sécurisez vos sites distants et priorisez vos flux critiques dynamiquement." },
        { title: "Cybersécurité", icon: <Lock size={32} />, desc: "Firewall Next-Gen, protection DDoS et filtrage DNS pour une infrastructure impénétrable." }
      ].map((card, i) => (
        <div key={i} className="glass-card h-64 rounded-[2rem] p-8 relative overflow-hidden group cursor-pointer border-white/10">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/50 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          <div className="relative z-10 h-full flex flex-col">
            <div className="text-optical-blue mb-auto transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2">
              {card.icon}
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 transition-transform duration-500 group-hover:-translate-y-2">{card.title}</h3>
            <p className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 absolute bottom-0 left-0 right-0">
              {card.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

// --- ELEMENT 7: Testimonials ---
const Element7Testimonials = () => (
  <section>
    <SectionHeader title="07. Testimonials" desc="Avis clients avec un design épuré et professionnel." />
    <div className="grid md:grid-cols-2 gap-8">
      <div className="glass-card p-10 rounded-[2.5rem] border-white/5 relative">
        <div className="text-6xl text-blue-600/20 font-serif absolute top-6 left-6">"</div>
        <p className="text-lg text-slate-300 leading-relaxed mb-8 relative z-10 pt-4">
          "Depuis que nous sommes passés chez Aegis Network, nos équipes commerciales ne perdent plus aucun appel. La qualité de la voix est irréprochable et le support est d'une réactivité bluffante."
        </p>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-slate-800 border border-white/10" />
          <div>
            <div className="font-bold text-white">Marie Dubois</div>
            <div className="text-sm text-slate-500">Directrice Commerciale, TechSolutions</div>
          </div>
        </div>
      </div>
      <div className="glass-card p-10 rounded-[2.5rem] border-white/5 relative">
        <div className="text-6xl text-violet-600/20 font-serif absolute top-6 left-6">"</div>
        <p className="text-lg text-slate-300 leading-relaxed mb-8 relative z-10 pt-4">
          "La fibre dédiée a transformé notre façon de travailler. Les transferts de gros fichiers qui prenaient des heures se font maintenant en quelques minutes. Un investissement très rentable."
        </p>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-slate-800 border border-white/10" />
          <div>
            <div className="font-bold text-white">Thomas Leroy</div>
            <div className="text-sm text-slate-500">CTO, Studio Créatif</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// --- ELEMENT 8: Interactive ROI Calculator ---
const Element8ROICalculator = () => {
  // Axe A: Appels
  const [missedCalls, setMissedCalls] = useState(30);
  const [recoveryRate, setRecoveryRate] = useState(30);
  const [avgCallValue, setAvgCallValue] = useState(80);

  // Axe B: Temps gagné
  const [incidents, setIncidents] = useState(4);
  const [timePerIncident, setTimePerIncident] = useState(2);
  const [hourlyRate, setHourlyRate] = useState(45);

  // Mode
  const [mode, setMode] = useState<'prudent' | 'realiste' | 'ambitieux'>('realiste');
  const [showSources, setShowSources] = useState(false);

  const modeConfig = {
    prudent: { label: 'Prudent', multiplier: 0.7 },
    realiste: { label: 'Réaliste', multiplier: 1.0 },
    ambitieux: { label: 'Ambitieux', multiplier: 1.3 }
  };

  const m = modeConfig[mode].multiplier;

  // Calculations
  const callsRecovered = Math.round(missedCalls * (recoveryRate / 100) * m);
  const revenueRecovered = Math.round(callsRecovered * avgCallValue);
  const hoursSaved = Math.round(incidents * timePerIncident * m * 10) / 10;
  const timeSavingValue = Math.round(hoursSaved * hourlyRate);
  const totalMonthly = revenueRecovered + timeSavingValue;
  const totalAnnual = totalMonthly * 12;

  return (
    <section>
      <SectionHeader
        title="08. Calculateur d'Impact"
        desc="Estimez les gains concrets liés à un meilleur traitement des appels et à la délégation du pilotage télécom."
      />

      <div className="max-w-5xl mx-auto">
        {/* Mode selector */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/5 p-1 rounded-xl flex items-center gap-1 border border-white/10">
            {(['prudent', 'realiste', 'ambitieux'] as const).map((key) => (
              <button
                key={key}
                onClick={() => setMode(key)}
                className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${
                  mode === key
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {modeConfig[key].label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Axe A */}
          <div className="glass-card rounded-2xl p-6 border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-600/15 flex items-center justify-center">
                <PhoneCall size={18} className="text-optical-blue" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">A. Appels mieux traités</h4>
                <p className="text-xs text-slate-500">Opportunités récupérées</p>
              </div>
            </div>

            <div className="space-y-5">
              <SliderInput
                label="Appels manqués / mois"
                value={missedCalls}
                onChange={setMissedCalls}
                min={5} max={200} step={5}
                unit=""
                note="Appels non aboutis, mal routés ou sans réponse."
              />
              <SliderInput
                label="Part récupérable"
                value={recoveryRate}
                onChange={setRecoveryRate}
                min={10} max={70} step={5}
                unit="%"
                note="Part d'appels récupérables avec un meilleur routage et standard."
              />
              <SliderInput
                label="Valeur moy. par appel abouti"
                value={avgCallValue}
                onChange={setAvgCallValue}
                min={20} max={500} step={10}
                unit="€"
                note="Valeur moyenne d'un appel converti ou d'une opportunité traitée."
              />
            </div>
          </div>

          {/* Axe B */}
          <div className="glass-card rounded-2xl p-6 border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-violet-600/15 flex items-center justify-center">
                <Timer size={18} className="text-accent-violet" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">B. Temps recentré sur le métier</h4>
                <p className="text-xs text-slate-500">Coordination déléguée</p>
              </div>
            </div>

            <div className="space-y-5">
              <SliderInput
                label="Incidents / escalades par mois"
                value={incidents}
                onChange={setIncidents}
                min={1} max={20} step={1}
                unit=""
                note="Pannes, lenteurs, échanges prestataires, relances opérateur…"
              />
              <SliderInput
                label="Temps moyen par gestion"
                value={timePerIncident}
                onChange={setTimePerIncident}
                min={0.5} max={8} step={0.5}
                unit="h"
                note="Temps passé à appeler, relancer, suivre — par incident."
              />
              <SliderInput
                label="Valeur horaire interne"
                value={hourlyRate}
                onChange={setHourlyRate}
                min={20} max={150} step={5}
                unit="€/h"
                note="Coût estimatif d'une heure de temps interne mobilisée."
              />
            </div>

            <p className="text-[11px] text-slate-600 mt-5 leading-relaxed italic">
              Temps recentré sur le métier plutôt que sur le pilotage d'incidents ou les échanges prestataires.
            </p>
          </div>

          {/* Results */}
          <div className="glass-card rounded-2xl p-6 border-optical-blue/20 bg-blue-950/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/10 rounded-full blur-[60px]" />

            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/15 flex items-center justify-center">
                <TrendingUp size={18} className="text-emerald-400" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Résultats estimés</h4>
                <p className="text-xs text-slate-500">Mode {modeConfig[mode].label.toLowerCase()} (×{modeConfig[mode].multiplier})</p>
              </div>
            </div>

            <div className="space-y-4 relative z-10">
              <ResultRow label="Appels récupérés" value={`${callsRecovered} /mois`} />
              <ResultRow label="CA récupéré" value={`+${revenueRecovered.toLocaleString('fr-FR')}€`} highlight />

              <div className="border-t border-white/5 my-2" />

              <ResultRow label="Temps libéré" value={`${hoursSaved}h /mois`} />
              <ResultRow label="Valeur temps gagné" value={`+${timeSavingValue.toLocaleString('fr-FR')}€`} highlight />

              <div className="border-t border-white/10 pt-4 mt-4">
                <div className="text-center">
                  <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">Impact mensuel estimé</p>
                  <div className="text-4xl font-black text-white">+{totalMonthly.toLocaleString('fr-FR')}€</div>
                  <p className="text-sm text-slate-400 mt-2">
                    Soit <span className="text-optical-blue font-bold">+{totalAnnual.toLocaleString('fr-FR')}€</span> /an
                  </p>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-600 mt-4 leading-relaxed relative z-10">
              Estimation indicative basée sur vos hypothèses. Résultats variables selon le secteur et le contexte.
            </p>
          </div>
        </div>

        {/* Sources & notes */}
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowSources(!showSources)}
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors inline-flex items-center gap-1.5"
          >
            <Info size={12} />
            Sources & hypothèses
            <ChevronDown size={12} className={`transition-transform ${showSources ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {showSources && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-4 glass-card rounded-xl p-5 text-left max-w-3xl mx-auto border-white/5">
                  <ul className="space-y-2.5 text-xs text-slate-400">
                    <li className="flex items-start gap-2">
                      <span className="text-optical-blue font-bold shrink-0">¹</span>
                      <span>
                        Le taux d'appels manqués en PME varie entre 20 % et 40 % selon les études sectorielles.
                        La part récupérable dépend du routage, des horaires et de la qualité du standard.
                        {' '}<a href="https://www.bva-group.com" target="_blank" rel="noopener noreferrer" className="text-optical-blue/60 hover:text-optical-blue underline">BVA Group</a>,
                        {' '}<a href="https://www.ifop.com" target="_blank" rel="noopener noreferrer" className="text-optical-blue/60 hover:text-optical-blue underline">IFOP</a> — études relation client.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-optical-blue font-bold shrink-0">²</span>
                      <span>
                        La valeur d'un appel abouti est très variable (secteur, panier moyen, taux de conversion).
                        La valeur par défaut de 80 € est volontairement prudente. Ajustez selon votre activité.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-optical-blue font-bold shrink-0">³</span>
                      <span>
                        Le temps de gestion d'un incident télécom/opérateur inclut les appels au support,
                        les relances, le suivi de ticket et la coordination interne. 2 heures est un minimum fréquemment constaté.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-optical-blue font-bold shrink-0">⁴</span>
                      <span>
                        Le coefficient de mode (prudent ×0.7, réaliste ×1.0, ambitieux ×1.3)
                        pondère les résultats selon votre niveau de confiance dans les hypothèses.
                      </span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

// ROI Calculator sub-components
const SliderInput = ({ label, value, onChange, min, max, step, unit, note }: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  unit: string;
  note: string;
}) => (
  <div>
    <div className="flex justify-between items-baseline mb-1.5">
      <label className="text-xs font-semibold text-slate-300">{label}</label>
      <span className="text-sm font-bold text-white tabular-nums">{value}{unit}</span>
    </div>
    <input
      type="range"
      min={min} max={max} step={step}
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-optical-blue"
    />
    <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{note}</p>
  </div>
);

const ResultRow = ({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) => (
  <div className="flex items-center justify-between">
    <span className="text-sm text-slate-400">{label}</span>
    <span className={`text-sm font-bold ${highlight ? 'text-emerald-400' : 'text-white'}`}>{value}</span>
  </div>
);

// --- ELEMENT 9: Network Map ---
const Element9NetworkMap = () => (
  <section>
    <SectionHeader title="09. Abstract Network Map" desc="Visualisation abstraite de la couverture réseau ou des nœuds de connexion." />
    <div className="glass-card h-[400px] rounded-[3rem] border-white/10 relative overflow-hidden flex items-center justify-center bg-slate-950">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-optical-blue rounded-full shadow-[0_0_20px_4px_rgba(59,130,246,0.8)] animate-pulse" />
        <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-accent-violet rounded-full shadow-[0_0_20px_4px_rgba(124,58,237,0.8)] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_20px_4px_rgba(52,211,153,0.8)] animate-pulse" style={{ animationDelay: '0.5s' }} />

        {/* SVG Lines connecting dots */}
        <svg className="absolute inset-0 w-full h-full" style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.2))' }}>
          <path d="M 25% 25% L 50% 50% L 75% 66%" stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none" strokeDasharray="4 4" className="animate-dash" />
        </svg>
      </div>
      <div className="relative z-10 text-center">
        <Globe size={48} className="mx-auto text-white/20 mb-4" />
        <h3 className="text-3xl font-black text-white">Réseau Interconnecté</h3>
        <p className="text-slate-400 mt-2">Peering direct avec les acteurs majeurs du cloud.</p>
      </div>
    </div>
  </section>
);

// --- ELEMENT 10: Magnetic CTA ---
const Element10MagneticCTA = () => (
  <section>
    <SectionHeader title="10. Magnetic CTA Banner" desc="Bannière d'appel à l'action à fort impact visuel." />
    <div className="relative rounded-[3rem] overflow-hidden bg-blue-600 p-12 md:p-20 text-center premium-glow group">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200')] opacity-10 mix-blend-overlay bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent" />

      <div className="relative z-10 max-w-2xl mx-auto">
        <h3 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">Prêt à passer à la vitesse supérieure ?</h3>
        <p className="text-xl text-blue-100 mb-10">Rejoignez les entreprises qui ont déjà fait le choix de la performance sans compromis.</p>
        <button className="h-16 px-10 rounded-2xl bg-white text-blue-700 font-bold text-xl hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all hover:scale-105 flex items-center gap-3 mx-auto">
          Démarrer mon projet <ArrowRight size={24} />
        </button>
      </div>
    </div>
  </section>
);

// --- ELEMENT 11: Graphic Elements Library ---
const Element11GraphicElements = () => (
  <section>
    <SectionHeader
      title="11. Éléments Graphiques Réutilisables"
      desc="Motifs, séparateurs, badges et fonds animés dans l'univers AEGIS — prêts à être intégrés dans le site, les présentations ou les landing pages."
    />

    <div className="space-y-16">
      {/* Network Mesh */}
      <div>
        <ElementLabel name="NetworkMesh" usage="Fond de section hero, slide de présentation, arrière-plan de page" />
        <div className="glass-card rounded-2xl h-72 relative overflow-hidden border-white/10">
          <NetworkMesh />
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <span className="text-sm text-white/30 font-bold uppercase tracking-widest">NetworkMesh — fond transparent</span>
          </div>
        </div>
      </div>

      {/* Fiber Flow */}
      <div>
        <ElementLabel name="FiberFlow" usage="Séparateur animé, fond de hero, bande décorative horizontale" />
        <div className="glass-card rounded-2xl h-40 relative overflow-hidden border-white/10">
          <FiberFlow />
        </div>
      </div>

      {/* Glow Orbs */}
      <div>
        <ElementLabel name="GlowOrbs" usage="Ambiance de fond, décoration de section, arrière-plan de carte" />
        <div className="glass-card rounded-2xl h-56 relative overflow-hidden border-white/10">
          <GlowOrbs />
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <span className="text-sm text-white/30 font-bold uppercase tracking-widest">GlowOrbs — fond de section</span>
          </div>
        </div>
      </div>

      {/* Tech Badges */}
      <div>
        <ElementLabel name="TechBadge" usage="Tags de service, labels de feature, pills pour présentations" />
        <div className="glass-card rounded-2xl p-8 border-white/10">
          <div className="flex flex-wrap gap-3 justify-center">
            <TechBadge icon={<Wifi size={14} />} label="Fibre Optique" color="blue" />
            <TechBadge icon={<PhoneCall size={14} />} label="Téléphonie VoIP" color="violet" />
            <TechBadge icon={<Shield size={14} />} label="Cybersécurité" color="emerald" />
            <TechBadge icon={<Network size={14} />} label="Infrastructure" color="blue" />
            <TechBadge icon={<Eye size={14} />} label="Supervision" color="violet" />
            <TechBadge icon={<Server size={14} />} label="Hébergement" color="slate" />
            <TechBadge icon={<Radio size={14} />} label="SD-WAN" color="blue" />
            <TechBadge icon={<Activity size={14} />} label="Monitoring" color="emerald" />
            <TechBadge icon={<Lock size={14} />} label="VPN / Accès" color="violet" />
            <TechBadge icon={<Users size={14} />} label="Accompagnement" color="blue" />
          </div>
        </div>
      </div>

      {/* Premium Dividers */}
      <div>
        <ElementLabel name="PremiumDivider" usage="Séparateur de section, bordure décorative, transition visuelle" />
        <div className="glass-card rounded-2xl p-10 border-white/10 space-y-10">
          <PremiumDivider variant="gradient" />
          <PremiumDivider variant="glow" />
          <PremiumDivider variant="dots" />
          <PremiumDivider variant="fiber" />
        </div>
      </div>

      {/* Signal Pulse */}
      <div>
        <ElementLabel name="SignalPulse" usage="Indicateur d'état, header de dashboard, statut de service" />
        <div className="glass-card rounded-2xl p-8 border-white/10">
          <div className="flex items-center justify-center gap-12">
            <SignalPulse status="online" label="Réseau" />
            <SignalPulse status="warning" label="Latence" />
            <SignalPulse status="offline" label="Maintenance" />
          </div>
        </div>
      </div>

      {/* Mini Metric Cards */}
      <div>
        <ElementLabel name="MiniMetric" usage="Dashboard, section stats, KPI rapide, bandeau chiffres clés" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MiniMetric icon={<Activity size={18} />} label="Uptime" value="99.9%" trend="+0.1%" />
          <MiniMetric icon={<Clock size={18} />} label="Latence" value="12ms" trend="-3ms" />
          <MiniMetric icon={<PhoneCall size={18} />} label="Appels traités" value="1 247" trend="+18%" />
          <MiniMetric icon={<ShieldCheck size={18} />} label="Incidents résolus" value="42" trend="-12%" trendDown />
        </div>
      </div>

      {/* Hex Grid Pattern */}
      <div>
        <ElementLabel name="HexGrid" usage="Fond de hero, arrière-plan de section, slide de présentation" />
        <div className="glass-card rounded-2xl h-56 relative overflow-hidden border-white/10">
          <HexGridPattern />
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <span className="text-sm text-white/30 font-bold uppercase tracking-widest">HexGrid — pattern de fond</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// --- Sub-components for Graphic Elements ---

const ElementLabel = ({ name, usage }: { name: string; usage: string }) => (
  <div className="mb-4 flex items-baseline gap-3">
    <code className="text-xs font-mono bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg text-optical-blue">&lt;{name} /&gt;</code>
    <span className="text-xs text-slate-500">{usage}</span>
  </div>
);

const NetworkMesh = () => {
  const nodes = [
    { cx: 10, cy: 30 }, { cx: 25, cy: 15 }, { cx: 40, cy: 45 },
    { cx: 55, cy: 20 }, { cx: 70, cy: 50 }, { cx: 85, cy: 25 },
    { cx: 15, cy: 70 }, { cx: 35, cy: 80 }, { cx: 50, cy: 65 },
    { cx: 65, cy: 75 }, { cx: 80, cy: 60 }, { cx: 92, cy: 80 },
    { cx: 5, cy: 50 }, { cx: 48, cy: 35 }, { cx: 75, cy: 35 },
  ];

  const edges = [
    [0, 1], [1, 3], [3, 5], [0, 2], [2, 4], [4, 5],
    [6, 7], [7, 8], [8, 9], [9, 10], [10, 11],
    [0, 6], [1, 13], [2, 8], [4, 10], [5, 10],
    [12, 0], [12, 6], [13, 2], [13, 3], [14, 5], [14, 4],
    [7, 9], [6, 8], [3, 14],
  ];

  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
      {edges.map(([a, b], i) => (
        <line
          key={`e${i}`}
          x1={nodes[a].cx} y1={nodes[a].cy}
          x2={nodes[b].cx} y2={nodes[b].cy}
          stroke="rgba(56,189,248,0.12)"
          strokeWidth="0.3"
        />
      ))}
      {nodes.map((n, i) => (
        <circle
          key={`n${i}`}
          cx={n.cx} cy={n.cy}
          r="0.8"
          fill="rgba(56,189,248,0.5)"
          className="animate-pulse"
          style={{ animationDelay: `${i * 0.3}s`, animationDuration: '3s' }}
        />
      ))}
    </svg>
  );
};

const FiberFlow = () => (
  <div className="absolute inset-0">
    {[0, 1, 2, 3, 4].map((i) => (
      <div
        key={i}
        className="absolute h-px bg-gradient-to-r from-transparent via-optical-blue/40 to-transparent animate-fiber-h"
        style={{
          top: `${20 + i * 15}%`,
          width: '200px',
          animationDelay: `${i * 2}s`,
          animationDuration: `${8 + i * 2}s`,
        }}
      />
    ))}
    {[0, 1, 2].map((i) => (
      <div
        key={`v${i}`}
        className="absolute w-px bg-gradient-to-b from-transparent via-accent-violet/30 to-transparent animate-fiber-v"
        style={{
          left: `${25 + i * 25}%`,
          height: '150px',
          animationDelay: `${i * 3}s`,
          animationDuration: `${12 + i * 3}s`,
        }}
      />
    ))}
  </div>
);

const GlowOrbs = () => (
  <div className="absolute inset-0">
    <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-blue-600/15 rounded-full blur-[80px] animate-pulse-slow" />
    <div className="absolute bottom-1/4 right-1/4 w-36 h-36 bg-violet-600/15 rounded-full blur-[60px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-600/8 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '1s' }} />
  </div>
);

const TechBadge = ({ icon, label, color }: { icon: ReactNode; label: string; color: 'blue' | 'violet' | 'emerald' | 'slate' }) => {
  const colors = {
    blue: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
    violet: 'bg-violet-500/10 border-violet-500/20 text-violet-400',
    emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
    slate: 'bg-slate-500/10 border-slate-500/20 text-slate-400',
  };

  return (
    <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-wider ${colors[color]}`}>
      {icon}
      {label}
    </span>
  );
};

const PremiumDivider = ({ variant }: { variant: 'gradient' | 'glow' | 'dots' | 'fiber' }) => {
  switch (variant) {
    case 'gradient':
      return (
        <div className="relative">
          <div className="h-px bg-gradient-to-r from-transparent via-optical-blue/50 to-transparent" />
          <span className="absolute left-1/2 -translate-x-1/2 -top-2.5 text-[10px] text-slate-600 bg-background-deep px-3">gradient</span>
        </div>
      );
    case 'glow':
      return (
        <div className="relative">
          <div className="h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />
          <div className="h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent blur-sm -mt-px" />
          <div className="h-px bg-gradient-to-r from-transparent via-blue-300/20 to-transparent blur-md -mt-px" />
          <span className="absolute left-1/2 -translate-x-1/2 -top-2.5 text-[10px] text-slate-600 bg-background-deep px-3">glow</span>
        </div>
      );
    case 'dots':
      return (
        <div className="relative flex items-center justify-center gap-1.5">
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} className="w-0.5 h-0.5 rounded-full bg-white/15" />
          ))}
          <span className="absolute left-1/2 -translate-x-1/2 -top-4 text-[10px] text-slate-600 bg-background-deep px-3">dots</span>
        </div>
      );
    case 'fiber':
      return (
        <div className="relative h-4 overflow-hidden">
          <div className="absolute inset-0 flex items-center">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
          </div>
          <div className="absolute h-px w-20 bg-gradient-to-r from-transparent via-optical-blue to-transparent animate-fiber-h top-1/2" style={{ animationDuration: '6s' }} />
          <span className="absolute left-1/2 -translate-x-1/2 -top-2.5 text-[10px] text-slate-600 bg-background-deep px-3">fiber</span>
        </div>
      );
  }
};

const SignalPulse = ({ status, label }: { status: 'online' | 'warning' | 'offline'; label: string }) => {
  const config = {
    online: { color: 'bg-emerald-500', ring: 'bg-emerald-400', text: 'text-emerald-400', statusLabel: 'Opérationnel' },
    warning: { color: 'bg-amber-500', ring: 'bg-amber-400', text: 'text-amber-400', statusLabel: 'Dégradé' },
    offline: { color: 'bg-red-500', ring: 'bg-red-400', text: 'text-red-400', statusLabel: 'Hors ligne' },
  };
  const c = config[status];

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        {status === 'online' && (
          <span className={`absolute inset-0 rounded-full ${c.ring} opacity-50 animate-ping`} />
        )}
        <span className={`relative block w-4 h-4 rounded-full ${c.color}`} />
      </div>
      <div className="text-center">
        <div className={`text-xs font-bold ${c.text}`}>{c.statusLabel}</div>
        <div className="text-[11px] text-slate-500 mt-0.5">{label}</div>
      </div>
    </div>
  );
};

const MiniMetric = ({ icon, label, value, trend, trendDown = false }: {
  icon: ReactNode; label: string; value: string; trend: string; trendDown?: boolean;
}) => (
  <div className="glass-card rounded-xl p-5 border-white/10">
    <div className="flex items-center justify-between mb-3">
      <span className="text-optical-blue/60">{icon}</span>
      <span className={`text-[11px] font-bold ${trendDown ? 'text-emerald-400' : 'text-emerald-400'}`}>
        {trend}
      </span>
    </div>
    <div className="text-2xl font-black text-white">{value}</div>
    <div className="text-xs text-slate-500 mt-1">{label}</div>
  </div>
);

const HexGridPattern = () => (
  <svg className="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="hexagons" width="56" height="100" patternUnits="userSpaceOnUse" patternTransform="scale(0.5)">
        <path
          d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66ZM28 100L0 84L0 50L28 34L56 50L56 84L28 100Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-optical-blue"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#hexagons)" />
  </svg>
);

// Helper component for section headers
const SectionHeader = ({ title, desc }: { title: string, desc: string }) => (
  <div className="mb-10">
    <h2 className="text-2xl font-black text-white mb-2">{title}</h2>
    <p className="text-slate-400">{desc}</p>
  </div>
);
