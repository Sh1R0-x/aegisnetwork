import {
  Zap,
  ShieldCheck,
  Activity,
  PhoneCall,
  Mail,
  MapPin,
  BarChart3,
  Globe,
  X,
  TrendingDown,
  TrendingUp,
  Search,
  Target,
  AlertTriangle,
  Scale,
  Calculator,
  ChevronDown,
  Info,
  Clock
} from 'lucide-react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { AegisLogo } from './components/AegisLogo';

const CountUp = ({ value, suffix = "", prefix = "" }: { value: string, suffix?: string, prefix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));

  useEffect(() => {
    if (isInView) {
      const end = numericValue;
      const duration = 1000;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const easedProgress = 1 - (1 - progress) * (1 - progress);
        const current = easedProgress * end;

        setDisplayValue(current);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setIsComplete(true);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, numericValue]);

  return (
    <span ref={ref} className={isComplete ? 'stat-highlight' : ''}>
      {prefix}
      {numericValue % 1 === 0 ? Math.floor(displayValue) : displayValue.toFixed(1)}
      {suffix}
    </span>
  );
};

const FiberBeams = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    <div className="fiber-beam animate-fiber-h top-[20%] opacity-20" style={{ animationDelay: '0s' }} />
    <div className="fiber-beam animate-fiber-h top-[50%] opacity-10" style={{ animationDelay: '3s' }} />
    <div className="fiber-beam animate-fiber-h top-[80%] opacity-20" style={{ animationDelay: '7s' }} />
    <div className="fiber-beam-v animate-fiber-v left-[15%] opacity-10" style={{ animationDelay: '1s' }} />
    <div className="fiber-beam-v animate-fiber-v left-[85%] opacity-20" style={{ animationDelay: '5s' }} />
  </div>
);

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

const NAV_SECTIONS = [
  { id: 'solutions', label: 'Notre approche' },
  { id: 'telephonie', label: 'Téléphonie' },
  { id: 'optimisation', label: 'Optimisation' },
  { id: 'contact', label: 'Contact' },
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -50% 0px' }
    );

    NAV_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 bg-background-deep/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AegisLogo className="w-9 h-9" />
          <div className="flex flex-col">
            <h1 className="text-lg font-black tracking-[0.15em] text-white leading-none">
              AEGIS <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">NETWORK</span>
            </h1>
            <span className="text-[8px] uppercase tracking-[0.25em] text-slate-500 font-bold mt-0.5">Conseil & Optimisation IT</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-400">
          {NAV_SECTIONS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`py-1 border-b-2 transition-all duration-300 cursor-pointer ${
                activeSection === id
                  ? 'text-optical-blue border-optical-blue'
                  : 'border-transparent hover:text-optical-blue hover:border-optical-blue/50'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <button
          onClick={() => scrollToSection('contact')}
          className="glow-button flex items-center justify-center rounded-lg h-10 px-6 bg-gradient-to-r from-blue-600 to-accent-violet text-white text-sm font-bold cursor-pointer"
        >
          Contactez-nous
        </button>
      </div>
    </nav>
  );
};

const Hero = () => (
  <section className="relative pt-28 pb-24 lg:pt-36 lg:pb-40 overflow-hidden">
    {/* Animated gradient orbs */}
    <div className="absolute top-[-15%] left-[-10%] w-[45%] h-[45%] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none animate-hero-glow-1" />
    <div className="absolute bottom-[-15%] right-[-10%] w-[45%] h-[45%] bg-accent-violet/10 blur-[120px] rounded-full pointer-events-none animate-hero-glow-2" />
    <div className="absolute top-[20%] left-[35%] w-[25%] h-[25%] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none animate-hero-glow-3" />
    {/* Subtle tech grid */}
    <div className="absolute inset-0 hero-grid opacity-[0.02] pointer-events-none" />
    {/* Hero fiber beams */}
    <div className="fiber-beam-hero animate-fiber-h top-[30%]" style={{ animationDelay: '0s', animationDuration: '12s' }} />
    <div className="fiber-beam-hero animate-fiber-h top-[70%]" style={{ animationDelay: '5s', animationDuration: '15s' }} />
    <div className="fiber-beam-hero-v animate-fiber-v left-[55%]" style={{ animationDelay: '2s', animationDuration: '18s' }} />

    <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/20 border border-blue-600/30 text-optical-blue text-xs font-bold uppercase tracking-widest mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-optical-blue opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-optical-blue"></span>
          </span>
          Conseil & Optimisation IT
        </div>
        <h1 className="text-5xl lg:text-7xl font-black text-white leading-[1.05] mb-8">
          Optimisez votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-600 to-violet-500">infrastructure IT</span>, simplement.
        </h1>
        <p className="text-lg text-slate-400 leading-relaxed max-w-xl mb-12">
          Nous accompagnons les TPE et PME dans le choix, l'optimisation et le pilotage de leurs solutions internet, téléphonie et infrastructure. Un interlocuteur expert, indépendant et orienté résultats.
        </p>
        <div className="flex flex-wrap gap-5">
          <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }} className="glow-button h-14 px-8 rounded-xl bg-gradient-to-r from-blue-600 to-accent-violet text-white font-bold text-lg flex items-center justify-center gap-3">
            Demander un audit gratuit
            <Zap size={20} />
          </a>
          <a href="#solutions" onClick={(e) => { e.preventDefault(); scrollToSection('solutions'); }} className="h-14 px-8 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-lg flex items-center justify-center hover:bg-white/10 transition-all backdrop-blur-sm">
            Découvrir notre approche
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative animate-float"
      >
        <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 premium-glow bg-slate-900">
          {/* IMAGE: Hero Main Visual - Abstract Fiber Optic Technology */}
          <img
            className="w-full h-[550px] object-cover opacity-80 mix-blend-lighten"
            src="/img/photo-1551703599-6b3e8379aa8c.jfif"
            alt="Fiber Optic Technology"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background-deep via-transparent to-transparent" />

          {/* Overlaying dynamic elements */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ duration: 6, repeat: Infinity }}
              className="w-64 h-64 border-2 border-optical-blue/30 rounded-full blur-sm"
            />
            <motion.div
              animate={{
                rotate: 360
              }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute w-80 h-80 border border-dashed border-white/10 rounded-full"
            />
          </div>
        </div>
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-blue-600/30 rounded-full blur-[100px] animate-pulse-slow" />
      </motion.div>
    </div>
  </section>
);

const ValueProposition = () => {
  const [monthlySpend, setMonthlySpend] = useState(3000);

  const savingsLow = Math.round(monthlySpend * 0.15);
  const savingsHigh = Math.round(monthlySpend * 0.30);
  const annualLow = savingsLow * 12;
  const annualHigh = savingsHigh * 12;
  const progress = ((monthlySpend - 500) / (20000 - 500)) * 100;

  const fmt = (n: number) => n.toLocaleString('fr-FR');

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-optical-blue font-bold text-sm uppercase tracking-[0.3em] mb-4">Pourquoi Aegis Network</h2>
          <h3 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
            Vos dépenses IT méritent un{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">regard expert.</span>
          </h3>
          <p className="text-slate-400 text-lg leading-relaxed">
            La plupart des TPE et PME paient trop cher pour des services mal dimensionnés. Nous auditons, comparons et renégocions pour rendre chaque euro utile.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Pain points */}
          <div className="space-y-5">
            {[
              { icon: <AlertTriangle size={22} />, title: "Contrats jamais relus", desc: "Vos abonnements sont renouvelés par défaut, sans mise en concurrence ni vérification.", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
              { icon: <TrendingDown size={22} />, title: "Surcoûts invisibles", desc: "Options inutiles, surdimensionnement, doublons — les dépenses cachées s'accumulent.", color: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
              { icon: <Scale size={22} />, title: "Aucune mise en concurrence", desc: "Sans comparatif objectif, impossible de savoir si vous payez le juste prix.", color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20" },
              { icon: <ShieldCheck size={22} />, title: "Pas d'interlocuteur neutre", desc: "Les opérateurs défendent leurs marges. Vous avez besoin d'un conseil indépendant.", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="flex gap-5 group"
              >
                <div className={`shrink-0 w-12 h-12 rounded-2xl ${item.bg} border flex items-center justify-center ${item.color}`}>
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">{item.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}

            {/* Sourced market context */}
            <div className="mt-6 pt-4 border-t border-white/5 space-y-2">
              <p className="text-[11px] text-slate-500 leading-relaxed flex items-start gap-1.5">
                <BarChart3 size={12} className="shrink-0 mt-0.5 text-slate-600" />
                78 % des dirigeants de TPE/PME estiment que le numérique est un bénéfice réel pour leur entreprise. <span className="text-slate-600 shrink-0">— France Num, 2025</span>
              </p>
              <p className="text-[11px] text-slate-500 leading-relaxed flex items-start gap-1.5">
                <BarChart3 size={12} className="shrink-0 mt-0.5 text-slate-600" />
                Les PME renégocient plus souvent avec le même fournisseur, sans mise en concurrence. <span className="text-slate-600 shrink-0">— BEREC, 2022</span>
              </p>
            </div>
          </div>

          {/* ROI Simulator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="glass-card p-10 rounded-[2.5rem] border-white/10 relative overflow-hidden"
          >
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-600/10 rounded-full blur-[80px]" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-600/30 flex items-center justify-center text-optical-blue">
                  <Calculator size={20} />
                </div>
                <h4 className="text-xl font-bold text-white">Simulez vos économies</h4>
              </div>

              <label htmlFor="roi-slider" className="text-sm font-bold text-slate-300 uppercase tracking-widest block mb-3">
                Budget IT mensuel
              </label>
              <p className="text-3xl font-black text-white mb-5">
                {fmt(monthlySpend)} €<span className="text-slate-500 text-lg font-medium"> / mois</span>
              </p>
              <input
                id="roi-slider"
                type="range"
                min={500}
                max={20000}
                step={100}
                value={monthlySpend}
                onChange={(e) => setMonthlySpend(Number(e.target.value))}
                className="roi-slider w-full"
                style={{
                  background: `linear-gradient(to right, var(--color-optical-blue) 0%, var(--color-accent-violet) ${progress}%, rgba(255,255,255,0.1) ${progress}%)`
                }}
                aria-label="Budget IT mensuel en euros"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-2 mb-8">
                <span>500 €</span>
                <span>20 000 €</span>
              </div>

              <div className="bg-white/5 rounded-2xl p-6 border border-white/5 mb-4">
                <p className="text-sm text-slate-400 mb-2">Économie estimée par mois</p>
                <p className="text-2xl font-black text-optical-blue">
                  {fmt(savingsLow)} € — {fmt(savingsHigh)} €
                </p>
              </div>

              <div className="bg-gradient-to-r from-blue-600/10 to-accent-violet/10 rounded-2xl p-6 border border-blue-600/20 mb-8">
                <p className="text-sm text-slate-400 mb-2">Économie annuelle projetée</p>
                <p className="text-3xl font-black text-white">
                  {fmt(annualLow)} € — {fmt(annualHigh)} €
                </p>
              </div>

              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
                className="glow-button w-full h-14 rounded-xl bg-gradient-to-r from-blue-600 to-accent-violet text-white font-bold text-lg flex items-center justify-center gap-2"
              >
                Vérifier avec un audit gratuit
                <Zap size={18} />
              </a>
              <p className="text-center text-xs text-slate-500 mt-4">Estimation indicative basée sur les audits réalisés.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Stats = () => (
  <section className="py-20 relative z-20">
    <FiberBeams />
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: <TrendingDown size={48} />, label: "Coûts télécoms", value: "30", prefix: "Jusqu'à -", suffix: "%", sub: "Après audit et renégociation", color: "text-optical-blue" },
          { icon: <PhoneCall size={48} />, label: "Appels mieux gérés", value: "50", prefix: "+", suffix: "%", sub: "Après optimisation", color: "text-accent-violet" },
          { icon: <Zap size={48} />, label: "Gain de productivité", value: "2", prefix: "Jusqu'à ", suffix: "x", sub: "Sur le pilotage IT", color: "text-blue-600" }
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true }}
            className="glass-card p-10 rounded-3xl flex flex-col gap-3 group hover:border-optical-blue/40 hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
              {stat.icon}
            </div>
            <div className={`${stat.color} mb-2 transition-transform group-hover:scale-110 duration-500`}>
              {stat.icon}
            </div>
            <p className="text-slate-400 font-medium tracking-wide">{stat.label}</p>
            <h3 className="text-3xl lg:text-4xl font-black text-white tracking-tighter">
              <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
            </h3>
            <div className="flex items-center gap-2 text-optical-blue text-sm font-bold mt-2">
              <BarChart3 size={16} />
              {stat.sub}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Solutions = () => (
  <section id="solutions" className="py-32 relative overflow-hidden">
    <FiberBeams />
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center max-w-3xl mx-auto mb-24">
        <h2 className="text-optical-blue font-bold text-sm uppercase tracking-[0.3em] mb-4">Notre Accompagnement</h2>
        <h3 className="text-4xl lg:text-5xl font-black text-white mb-6">Deux leviers pour optimiser votre IT.</h3>
        <p className="text-slate-400 text-lg">Nous intervenons comme consultant et chef de projet pour améliorer concrètement votre connectivité et votre téléphonie professionnelle.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Solution 1: Internet */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
          className="glass-card p-12 rounded-[3rem] border-white/5 hover:border-blue-500/30 transition-all group"
        >
          <div className="w-16 h-16 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
            <Globe size={32} />
          </div>
          <h4 className="text-3xl font-black text-white mb-6">Audit & Optimisation Réseau</h4>
          <p className="text-slate-400 text-lg leading-relaxed mb-8">
            Nous analysons votre infrastructure réseau et vos contrats existants. Nous identifions les surcoûts, challengeons vos fournisseurs et pilotons les changements.
          </p>
          <ul className="space-y-4 mb-10">
            {[
              "Audit complet de l'existant",
              "Comparatif et mise en concurrence",
              "Renégociation des contrats",
              "Pilotage de la migration si nécessaire"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Solution 2: Telephony */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
          className="glass-card p-12 rounded-[3rem] border-white/5 hover:border-violet-500/30 transition-all group"
        >
          <div className="w-16 h-16 rounded-2xl bg-violet-600/20 text-violet-400 flex items-center justify-center mb-8 group-hover:bg-violet-600 group-hover:text-white transition-all duration-500">
            <PhoneCall size={32} />
          </div>
          <h4 className="text-3xl font-black text-white mb-6">Pilotage Téléphonie</h4>
          <p className="text-slate-400 text-lg leading-relaxed mb-8">
            Nous évaluons votre téléphonie actuelle et vous aidons à choisir, déployer et optimiser la solution la plus adaptée à votre activité.
          </p>
          <ul className="space-y-4 mb-10">
            {[
              "Analyse des coûts et des usages",
              "Sélection du prestataire adapté",
              "Accompagnement au déploiement",
              "Suivi de qualité et ajustements"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  </section>
);

const VoIPSection = () => (
  <section id="telephonie" className="py-32 relative overflow-hidden bg-slate-950">
    <div className="absolute inset-0 opacity-20">
      {/* IMAGE: VoIP Section Background - Network/Data Visualization */}
      <img
        className="w-full h-full object-cover mix-blend-screen"
        src="/img/photo-1550751827-4bd374c3f58b.jfif"
        alt="Network background"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background-deep via-background-deep/60 to-transparent" />
    </div>
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="grid lg:grid-cols-2 gap-24 items-center">
        <div>
          <h2 className="text-violet-400 font-bold text-sm uppercase tracking-[0.3em] mb-6">Accompagnement Téléphonie</h2>
          <h3 className="text-5xl lg:text-6xl font-black mb-10 leading-[1.1] text-white">
            Votre téléphonie, <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-500">repensée.</span>
          </h3>
          <div className="space-y-10">
            {[
              { icon: <Search />, title: "Audit de votre solution actuelle", desc: "Nous analysons vos flux d'appels, vos coûts et votre configuration pour identifier ce qui peut être amélioré concrètement." },
              { icon: <Activity />, title: "Sélection du meilleur prestataire", desc: "Nous comparons les offres du marché et négocions pour vous les meilleures conditions techniques et tarifaires." },
              { icon: <ShieldCheck />, title: "Accompagnement au changement", desc: "Nous pilotons la transition vers la nouvelle solution et accompagnons vos équipes pour une adoption fluide." }
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.15, duration: 0.5 }} viewport={{ once: true }} className="flex gap-6 group">
                <div className="shrink-0 w-12 h-12 rounded-2xl bg-violet-600/30 flex items-center justify-center text-violet-400 border border-violet-600/40 group-hover:bg-violet-600 group-hover:text-white transition-all duration-500">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2 text-white">{item.title}</h4>
                  <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-14 flex flex-wrap gap-5">
            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }} className="glow-button h-14 px-8 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white font-bold flex items-center justify-center transition-all">
              Faire auditer ma téléphonie
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="glass-card rounded-[3rem] p-6 shadow-2xl border-white/10 premium-glow">
            {/* IMAGE: VoIP Section Feature - Professional using digital tools */}
            <img
              className="rounded-[2rem] w-full h-auto"
              src="/img/photo-1516321318423-f06f85e504b3.jfif"
              alt="Digital professional"
              loading="lazy"
            />
          </div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -bottom-10 -left-10 glass-card rounded-[2rem] p-8 shadow-2xl text-white border-white/20 premium-glow"
          >
            <p className="text-xs font-bold text-optical-blue uppercase tracking-widest mb-2">Gains constatés</p>
            <p className="text-4xl font-black">
              <CountUp value="25" prefix="+" suffix="%" />
            </p>
            <p className="text-sm text-slate-400 mt-1">Satisfaction client</p>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
);

const OptimisationSection = () => (
  <section id="optimisation" className="py-32 relative bg-background-deep">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="lg:w-1/2 order-2 lg:order-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: <TrendingDown size={28} />, title: "Réduction des coûts", desc: "Identifiez les dépenses IT inutiles et renégociez vos contrats aux meilleures conditions.", color: "text-optical-blue", border: "border-blue-600/20 hover:border-optical-blue/40" },
              { icon: <Search size={28} />, title: "Mise en concurrence", desc: "Comparez objectivement les offres du marché pour chaque poste de dépense.", color: "text-accent-violet", border: "border-accent-violet/20 hover:border-accent-violet/40" },
              { icon: <Target size={28} />, title: "Prestations ajustées", desc: "Éliminez le surdimensionnement et ne payez que ce dont vous avez réellement besoin.", color: "text-blue-400", border: "border-blue-400/20 hover:border-blue-400/40" },
              { icon: <BarChart3 size={28} />, title: "Visibilité totale", desc: "Obtenez une vue claire de vos dépenses IT et des leviers d'optimisation disponibles.", color: "text-emerald-400", border: "border-emerald-400/20 hover:border-emerald-400/40" }
            ].map((card, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.5 }} viewport={{ once: true }} className={`glass-card p-8 rounded-3xl ${card.border} transition-all`}>
                <div className={`${card.color} mb-4`}>{card.icon}</div>
                <p className="font-bold text-white text-lg">{card.title}</p>
                <p className="text-sm text-slate-400 mt-2">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="lg:w-1/2 order-1 lg:order-2">
          <h2 className="text-optical-blue font-bold text-sm uppercase tracking-[0.3em] mb-6">Optimisation Économique</h2>
          <h3 className="text-5xl font-black text-white mb-8 leading-tight">Payez moins. Performez mieux.</h3>
          <p className="text-slate-400 text-lg mb-10 leading-relaxed">
            Le marché des télécoms et des services IT est très concurrentiel. Beaucoup d'entreprises conservent des contrats inadaptés ou surdimensionnés. Nous vous aidons à reprendre le contrôle de vos dépenses, sans compromis sur la qualité.
          </p>
          <ul className="space-y-6 mb-12">
            {[
              "Audit complet de vos contrats et dépenses IT",
              "Identification des prestations inutiles ou surdimensionnées",
              "Recommandation d'alternatives plus adaptées et moins coûteuses"
            ].map((text, i) => (
              <motion.li key={i} initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1, duration: 0.4 }} viewport={{ once: true }} className="flex items-center gap-4 font-semibold text-slate-300 group">
                <Zap className="text-optical-blue group-hover:scale-125 transition-transform" size={20} />
                {text}
              </motion.li>
            ))}
          </ul>
          <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }} className="glow-button inline-flex h-14 px-10 rounded-xl bg-blue-600 text-white font-bold items-center justify-center hover:bg-blue-700 transition-all">
            Demander un audit économique
          </a>
        </div>
      </div>
    </div>
  </section>
);

const CalcSlider = ({ label, value, onChange, min, max, step, unit = "", note }: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  unit?: string;
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
      className="calc-slider w-full"
      aria-label={label}
    />
    <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{note}</p>
  </div>
);

const CalcResult = ({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) => (
  <div className="flex items-center justify-between">
    <span className="text-sm text-slate-400">{label}</span>
    <span className={`text-sm font-bold ${highlight ? 'text-emerald-400' : 'text-white'}`}>{value}</span>
  </div>
);

const ImpactCalculator = () => {
  const [missedCalls, setMissedCalls] = useState(30);
  const [recoveryRate, setRecoveryRate] = useState(30);
  const [avgCallValue, setAvgCallValue] = useState(80);

  const [incidents, setIncidents] = useState(4);
  const [timePerIncident, setTimePerIncident] = useState(2);
  const [hourlyRate, setHourlyRate] = useState(45);

  const [mode, setMode] = useState<'prudent' | 'realiste' | 'ambitieux'>('realiste');
  const [showSources, setShowSources] = useState(false);

  const modeConfig = {
    prudent: { label: 'Prudent', multiplier: 0.7 },
    realiste: { label: 'Réaliste', multiplier: 1.0 },
    ambitieux: { label: 'Ambitieux', multiplier: 1.3 }
  };

  const m = modeConfig[mode].multiplier;

  const callsRecovered = Math.round(missedCalls * (recoveryRate / 100) * m);
  const revenueRecovered = Math.round(callsRecovered * avgCallValue);
  const hoursSaved = Math.round(incidents * timePerIncident * m * 10) / 10;
  const timeSavingValue = Math.round(hoursSaved * hourlyRate);
  const totalMonthly = revenueRecovered + timeSavingValue;
  const totalAnnual = totalMonthly * 12;

  const fmt = (n: number) => n.toLocaleString('fr-FR');

  return (
    <section id="simulateur" className="py-32 relative bg-background-deep">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-optical-blue font-bold text-sm uppercase tracking-[0.3em] mb-4">Simulateur d'Impact</h2>
          <h3 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
            Estimez vos gains{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">concrets.</span>
          </h3>
          <p className="text-slate-400 text-lg leading-relaxed">
            Ajustez les curseurs selon votre réalité. Les résultats sont des estimations basées sur vos hypothèses, pas des promesses.
          </p>
        </motion.div>

        {/* Mode selector */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/5 p-1 rounded-xl flex items-center gap-1 border border-white/10">
            {(['prudent', 'realiste', 'ambitieux'] as const).map((key) => (
              <button
                key={key}
                onClick={() => setMode(key)}
                className={`px-5 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer ${
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
          {/* Axe A: Calls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-6 border-white/10"
          >
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
              <CalcSlider
                label="Appels manqués / mois"
                value={missedCalls}
                onChange={setMissedCalls}
                min={5} max={200} step={5}
                note="Appels non aboutis, mal routés ou sans réponse."
              />
              <CalcSlider
                label="Part récupérable"
                value={recoveryRate}
                onChange={setRecoveryRate}
                min={10} max={70} step={5}
                unit="%"
                note="Part d'appels récupérables avec un meilleur routage et standard."
              />
              <CalcSlider
                label="Valeur moy. par appel abouti"
                value={avgCallValue}
                onChange={setAvgCallValue}
                min={20} max={500} step={10}
                unit="€"
                note="Valeur estimée d'un appel converti ou d'une opportunité traitée."
              />
            </div>
          </motion.div>

          {/* Axe B: Time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-6 border-white/10"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-violet-600/15 flex items-center justify-center">
                <Clock size={18} className="text-accent-violet" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">B. Temps recentré sur le métier</h4>
                <p className="text-xs text-slate-500">Coordination déléguée</p>
              </div>
            </div>

            <div className="space-y-5">
              <CalcSlider
                label="Incidents / escalades par mois"
                value={incidents}
                onChange={setIncidents}
                min={1} max={20} step={1}
                note="Pannes, lenteurs, échanges prestataires, relances opérateur…"
              />
              <CalcSlider
                label="Temps moyen par gestion"
                value={timePerIncident}
                onChange={setTimePerIncident}
                min={0.5} max={8} step={0.5}
                unit="h"
                note="Temps passé à appeler, relancer, suivre — par incident."
              />
              <CalcSlider
                label="Valeur horaire interne"
                value={hourlyRate}
                onChange={setHourlyRate}
                min={20} max={150} step={5}
                unit="€/h"
                note="Coût estimatif d'une heure de temps interne mobilisée."
              />
            </div>

            <p className="text-[11px] text-slate-600 mt-5 leading-relaxed italic">
              Temps recentré sur le métier plutôt que sur la gestion d'incidents ou les échanges prestataires.
            </p>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-6 border-optical-blue/20 bg-blue-950/20 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/10 rounded-full blur-[60px]" />

            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/15 flex items-center justify-center">
                <TrendingUp size={18} className="text-emerald-400" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Résultats estimés</h4>
                <p className="text-xs text-slate-500">Mode {modeConfig[mode].label.toLowerCase()} (×{m})</p>
              </div>
            </div>

            <div className="space-y-4 relative z-10">
              <CalcResult label="Appels récupérés" value={`${callsRecovered} /mois`} />
              <CalcResult label="CA récupéré" value={`+${fmt(revenueRecovered)}€`} highlight />

              <div className="border-t border-white/5 my-2" />

              <CalcResult label="Temps libéré" value={`${hoursSaved}h /mois`} />
              <CalcResult label="Valeur temps gagné" value={`+${fmt(timeSavingValue)}€`} highlight />

              <div className="border-t border-white/10 pt-4 mt-4">
                <div className="text-center">
                  <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">Impact mensuel estimé</p>
                  <div className="text-4xl font-black text-white">+{fmt(totalMonthly)}€</div>
                  <p className="text-sm text-slate-400 mt-2">
                    Soit <span className="text-optical-blue font-bold">+{fmt(totalAnnual)}€</span> /an
                  </p>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-600 mt-4 leading-relaxed relative z-10">
              Estimation indicative basée sur vos hypothèses. Résultats variables selon le secteur et le contexte.
            </p>
          </motion.div>
        </div>

        {/* Sources & notes */}
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowSources(!showSources)}
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
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
                  <p className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-3">Hypothèses du simulateur</p>
                  <ul className="space-y-2.5 text-xs text-slate-400">
                    <li className="flex items-start gap-2">
                      <span className="text-optical-blue font-bold shrink-0">¹</span>
                      <span>
                        Le taux d'appels manqués en PME varie selon les études sectorielles.
                        La part récupérable dépend du routage, des horaires et de la qualité du standard.
                        Les valeurs ci-dessus sont des hypothèses ajustables — pas des moyennes universelles.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-optical-blue font-bold shrink-0">²</span>
                      <span>
                        La valeur d'un appel abouti est très variable (secteur, panier moyen, taux de conversion).
                        La valeur par défaut de 80 € est volontairement prudente. Ajustez-la selon votre activité.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-optical-blue font-bold shrink-0">³</span>
                      <span>
                        Le temps de gestion d'un incident télécom/opérateur inclut les appels au support,
                        les relances, le suivi de ticket et la coordination interne.
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
                  <div className="border-t border-white/5 mt-4 pt-4">
                    <p className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-3">Contexte marché (sources indépendantes)</p>
                    <ul className="space-y-2 text-xs text-slate-400">
                      <li>78 % des dirigeants de TPE/PME estiment que le numérique représente un bénéfice réel. — <span className="text-slate-500">France Num, Baromètre 2025</span></li>
                      <li>Les PME renégocient plus souvent avec le même fournisseur, les grandes entreprises remettent davantage en concurrence. — <span className="text-slate-500">BEREC, 2022</span></li>
                      <li>Pour 54 % des TPE, les charges administratives déléguées représentent 1 à 3 % du CA. — <span className="text-slate-500">SDI, 2023</span></li>
                      <li>29 % des TPE-PME victimes d'incidents déclarent des interruptions de service. — <span className="text-slate-500">Cybermalveillance.gouv.fr, 2025</span></li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const CTASection = () => (
  <section className="py-32 relative">
    <div className="max-w-7xl mx-auto px-6">
      <div className="bg-gradient-to-br from-blue-600/80 via-blue-700 to-accent-violet rounded-[3rem] p-12 lg:p-24 text-white flex flex-col lg:flex-row items-center gap-16 relative overflow-hidden premium-glow">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full -mr-64 -mt-64 blur-[120px]" />
        <div className="relative z-10 lg:w-3/5">
          <h3 className="text-4xl lg:text-6xl font-black mb-8 leading-tight">Reprenez le contrôle de vos coûts IT.</h3>
          <p className="text-xl text-white/90 mb-12 leading-relaxed">
            Demandez un audit gratuit. Nous analysons vos contrats, vos usages et vos dépenses pour identifier les marges d'optimisation concrètes.
          </p>
          <button onClick={() => scrollToSection('contact')} className="h-16 px-10 rounded-2xl bg-white text-blue-700 font-bold text-xl hover:shadow-2xl transition-all hover:scale-105 cursor-pointer">
            Demander mon audit gratuit
          </button>
        </div>
        <div className="relative z-10 lg:w-2/5 grid grid-cols-2 gap-6">
          <div className="bg-white/10 backdrop-blur-xl p-8 rounded-[2rem] border border-white/20">
            <p className="text-4xl font-black mb-2 text-optical-blue">
              <CountUp value="30" suffix="%" />
            </p>
            <p className="text-xs uppercase font-bold text-white/70 tracking-widest leading-relaxed">Économie moyenne constatée</p>
          </div>
          <div className="bg-white/10 backdrop-blur-xl p-8 rounded-[2rem] border border-white/20">
            <p className="text-4xl font-black mb-2 text-optical-blue">
              <CountUp value="48" suffix="h" />
            </p>
            <p className="text-xs uppercase font-bold text-white/70 tracking-widest leading-relaxed">Délai d'analyse initial</p>
          </div>
          <div className="bg-white/10 backdrop-blur-xl p-8 rounded-[2rem] border border-white/20 col-span-2">
            <p className="text-lg font-bold mb-4">Taux de satisfaction client</p>
            <div className="w-full bg-white/20 h-3 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '98%' }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="bg-gradient-to-r from-optical-blue to-white h-full shadow-[0_0_15px_rgba(255,255,255,0.8)]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ContactSection = () => (
  <section id="contact" className="py-32 relative bg-background-deep overflow-hidden">
    <FiberBeams />
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="grid lg:grid-cols-2 gap-24">
        <div>
          <h2 className="text-optical-blue font-bold text-sm uppercase tracking-[0.3em] mb-6">Contact & Audit</h2>
          <h3 className="text-5xl font-black text-white mb-10 leading-tight">Parlons de votre infrastructure.</h3>
          <p className="text-slate-400 text-lg mb-12 leading-relaxed">Un audit, un conseil, une question sur vos contrats IT ? Nos consultants sont disponibles pour vous accompagner.</p>
          <div className="space-y-8">
            {[
              { icon: <PhoneCall />, label: "Ligne directe", value: "07 81 43 81 23", href: "tel:+33781438123" },
              { icon: <Mail />, label: "Email", value: "contact@aegisnetwork.fr", href: "mailto:contact@aegisnetwork.fr" },
              { icon: <MapPin />, label: "Centre Opérationnel", value: "Lyon, France", href: undefined }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-blue-600/20 flex items-center justify-center text-optical-blue border border-blue-600/20 shadow-lg group-hover:bg-blue-600 group-hover:text-white transition-all">
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-xl font-bold text-white hover:text-optical-blue transition-colors">{item.value}</a>
                  ) : (
                    <p className="text-xl font-bold text-white">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-card p-10 md:p-14 rounded-[3rem] border-white/10 shadow-2xl relative">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent-violet/10 blur-[60px]" />
          <form className="space-y-8 relative z-10">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-300 uppercase tracking-widest ml-1">Nom Complet</label>
                <input className="w-full h-14 px-6 rounded-2xl border border-white/10 focus:border-optical-blue focus:ring-optical-blue bg-white/5 text-white placeholder:text-slate-600 transition-all outline-none" placeholder="Jean Dupont" type="text" />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-300 uppercase tracking-widest ml-1">Entreprise</label>
                <input className="w-full h-14 px-6 rounded-2xl border border-white/10 focus:border-optical-blue focus:ring-optical-blue bg-white/5 text-white placeholder:text-slate-600 transition-all outline-none" placeholder="Nom de votre société" type="text" />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-300 uppercase tracking-widest ml-1">Email Professionnel</label>
              <input className="w-full h-14 px-6 rounded-2xl border border-white/10 focus:border-optical-blue focus:ring-optical-blue bg-white/5 text-white placeholder:text-slate-600 transition-all outline-none" placeholder="jean@entreprise.fr" type="email" />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-300 uppercase tracking-widest ml-1">Message</label>
              <textarea className="w-full px-6 py-4 rounded-2xl border border-white/10 focus:border-optical-blue focus:ring-optical-blue bg-white/5 text-white placeholder:text-slate-600 transition-all outline-none" placeholder="Décrivez votre besoin (audit, conseil, optimisation...)" rows={4}></textarea>
            </div>
            <button type="button" className="glow-button w-full h-16 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-600 to-accent-violet text-white font-bold text-xl uppercase tracking-widest">
              Envoyer ma demande
            </button>
            <p className="text-center text-xs text-slate-500">Nous vous répondons sous 24 heures.</p>
          </form>
        </div>
      </div>
    </div>
  </section>
);

const LegalModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Mentions légales">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-slate-900 border border-white/10 rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8 md:p-12 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all"
          aria-label="Fermer"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-black text-white mb-8">Mentions légales</h2>

        <div className="space-y-6 text-sm text-slate-400 leading-relaxed">
          <div>
            <h3 className="text-white font-bold mb-2">Éditeur du site</h3>
            <p>Aegis Network — Conseil et optimisation en infrastructures IT et télécommunications</p>
            <p>Contact : <a href="mailto:contact@aegisnetwork.fr" className="text-optical-blue hover:underline">contact@aegisnetwork.fr</a></p>
            <p>Téléphone : <a href="tel:+33781438123" className="text-optical-blue hover:underline">07 81 43 81 23</a></p>
            <p>Centre opérationnel : Lyon, France</p>
            <p className="mt-2 text-yellow-500/80 text-xs">TODO: compléter — forme juridique, SIRET/RCS, capital social, nom du directeur de publication</p>
          </div>

          <div>
            <h3 className="text-white font-bold mb-2">Hébergement</h3>
            <p>OVHcloud — 2, rue Kellermann — 59100 Roubaix — France</p>
            <p>Tél. : 1007</p>
            <p><a href="https://www.ovhcloud.com" className="text-optical-blue hover:underline" target="_blank" rel="noopener noreferrer">www.ovhcloud.com</a></p>
          </div>

          <div>
            <h3 className="text-white font-bold mb-2">Propriété intellectuelle</h3>
            <p>L'ensemble du contenu de ce site (textes, images, logo, éléments graphiques) est la propriété d'Aegis Network, sauf mention contraire. Toute reproduction, même partielle, est interdite sans autorisation préalable.</p>
          </div>

          <div>
            <h3 className="text-white font-bold mb-2">Données personnelles</h3>
            <p>Ce site ne collecte aucune donnée personnelle de manière automatique. Le formulaire de contact transmet les informations saisies par l'utilisateur dans le seul but de répondre à sa demande. Aucun cookie de suivi ou d'analyse n'est utilisé.</p>
            <p className="mt-2 text-yellow-500/80 text-xs">TODO: à adapter si un outil d'analytics ou des cookies sont ajoutés ultérieurement</p>
          </div>

          <div>
            <h3 className="text-white font-bold mb-2">Responsabilité</h3>
            <p>Aegis Network s'efforce de fournir des informations aussi précises que possible. Toutefois, l'entreprise ne saurait être tenue responsable des omissions, inexactitudes ou résultats obtenus suite à l'utilisation de ces informations.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  const [legalOpen, setLegalOpen] = useState(false);

  return (
    <>
      <footer className="bg-background-deep py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <AegisLogo className="w-8 h-8" />
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-[0.15em] text-white leading-none">
                  AEGIS <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">NETWORK</span>
                </span>
                <span className="text-[8px] uppercase tracking-[0.25em] text-slate-500 font-bold mt-0.5">Conseil & Optimisation IT</span>
              </div>
            </div>
            <div className="flex gap-8 text-xs font-bold text-slate-500 uppercase tracking-widest">
              <button onClick={() => setLegalOpen(true)} className="hover:text-optical-blue transition-colors cursor-pointer">Mentions Légales</button>
            </div>
            <p className="text-xs text-slate-500 font-medium">© 2026 Aegis Network.</p>
          </div>
        </div>
      </footer>
      <LegalModal isOpen={legalOpen} onClose={() => setLegalOpen(false)} />
    </>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-background-deep selection:bg-blue-600 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <ValueProposition />
        <Stats />
        <Solutions />
        <VoIPSection />
        <OptimisationSection />
        <ImpactCalculator />
        <CTASection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
