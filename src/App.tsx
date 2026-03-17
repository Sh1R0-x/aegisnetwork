import {
  Zap,
  ShieldCheck,
  Activity,
  PhoneCall,
  Mail,
  MapPin,
  BarChart3,
  X,
  TrendingDown,
  TrendingUp,
  Search,
  Target,
  ChevronDown,
  Info,
  Clock,
  Users,
  CheckCircle,
  Lightbulb,
  ArrowRight,
  RefreshCw,
  AlertTriangle,
  RotateCcw,
  Download,
  Calculator,
  Sparkles,
  Menu,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState, type ChangeEvent, type FormEvent, type MouseEvent } from 'react';
import { AegisLogo } from './components/AegisLogo';

const CONTACT_API_BASE = import.meta.env.VITE_CONTACT_API_BASE?.trim().replace(/\/$/, '');
const CONTACT_ENDPOINT = CONTACT_API_BASE ? `${CONTACT_API_BASE}/api/contact` : '/api/contact';

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

const handleSectionLinkClick = (
  event: MouseEvent<HTMLAnchorElement>,
  id: string,
  afterScroll?: () => void,
) => {
  event.preventDefault();
  scrollToSection(id);
  afterScroll?.();
};

const NAV_SECTIONS = [
  { id: 'gains', label: 'Vos gains' },
  { id: 'diagnostic', label: 'Diagnostic' },
  { id: 'enjeux', label: 'Vos enjeux' },
  { id: 'approche', label: 'Notre approche' },
  { id: 'simulateur', label: 'Simulateur' },
  { id: 'contact', label: 'Contact' },
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <nav className="fixed top-0 w-full z-50 bg-background-deep/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AegisLogo className="w-9 h-9" />
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-[0.06em] text-white leading-none whitespace-nowrap" style={{ wordSpacing: '0.2em' }}>
              AEGIS <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">NETWORK</span>
            </span>
            <span className="text-[8px] uppercase tracking-[0.25em] text-slate-300 font-bold mt-0.5">Conseil & Optimisation IT</span>
          </div>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8 text-[15px] font-semibold text-slate-300">
          {NAV_SECTIONS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(event) => handleSectionLinkClick(event, id)}
              aria-current={activeSection === id ? 'page' : undefined}
              className={`py-1 border-b-2 transition-colors duration-300 cursor-pointer ${
                activeSection === id
                  ? 'text-optical-blue border-optical-blue'
                  : 'border-transparent hover:text-optical-blue hover:border-optical-blue/50'
              }`}
            >
              {label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            onClick={(event) => handleSectionLinkClick(event, 'contact')}
            className="glow-button hidden sm:flex items-center justify-center rounded-lg h-10 px-6 bg-gradient-to-r from-blue-600 to-accent-violet text-white text-sm font-bold cursor-pointer"
          >
            Contactez-nous
          </a>

          {/* Mobile burger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Menu de navigation"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile overlay nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-16 inset-x-0 bg-background-deep/95 backdrop-blur-xl border-b border-white/5 shadow-2xl"
          >
            <div className="flex flex-col px-6 py-6 gap-2">
              {NAV_SECTIONS.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(event) => handleSectionLinkClick(event, id, () => setMobileOpen(false))}
                  className={`text-left py-3 px-4 rounded-xl text-base font-semibold transition-colors cursor-pointer ${
                    activeSection === id
                      ? 'text-optical-blue bg-blue-600/10'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(event) => handleSectionLinkClick(event, 'contact', () => setMobileOpen(false))}
                className="mt-4 glow-button flex items-center justify-center rounded-xl h-12 bg-gradient-to-r from-blue-600 to-accent-violet text-white font-bold text-base cursor-pointer"
              >
                Contactez-nous
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const [heroReady, setHeroReady] = useState(false);

  return (
  <section className="relative pt-28 pb-24 lg:pt-36 lg:pb-40 overflow-hidden">
    {/* Ambient glows */}
    <div className="absolute top-[-15%] left-[-10%] w-[45%] h-[45%] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none animate-hero-glow-1" />
    <div className="absolute bottom-[-15%] right-[-10%] w-[45%] h-[45%] bg-accent-violet/10 blur-[120px] rounded-full pointer-events-none animate-hero-glow-2" />
    <div className="absolute top-[20%] left-[35%] w-[25%] h-[25%] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none animate-hero-glow-3" />
    {/* Tech grid */}
    <div className="absolute inset-0 hero-grid opacity-[0.02] pointer-events-none" />
    {/* Fiber beams */}
    <div className="fiber-beam-hero animate-fiber-h top-[30%]" style={{ animationDelay: '0s', animationDuration: '12s' }} />
    <div className="fiber-beam-hero animate-fiber-h top-[70%]" style={{ animationDelay: '5s', animationDuration: '15s' }} />
    <div className="fiber-beam-hero-v animate-fiber-v left-[55%]" style={{ animationDelay: '2s', animationDuration: '18s' }} />

    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-[1fr_0.8fr] lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-center">
      {/* Left: text content with staggered entrance */}
      <div className="relative z-10">
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/20 border border-blue-600/30 text-optical-blue text-xs font-bold uppercase tracking-widest mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-optical-blue opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-optical-blue"></span>
          </span>
          Conseil & Optimisation IT
        </motion.div>

        <motion.h1
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-[1.05] mb-8"
        >
          Reprenez le{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-600 to-violet-500">contrôle</span>,
          <br className="hidden lg:block" />
          {' '}devenez plus{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">performant</span>.
        </motion.h1>

        <motion.p
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-lg text-slate-400 leading-relaxed max-w-xl mb-12"
        >
          Contrats opaques, prestataires jamais challengés, temps perdu en gestion d'incidents. AEGIS NETWORK vous aide à y voir clair, réduire vos coûts et vous recentrer sur votre activité.
        </motion.p>

        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col gap-4 sm:items-start"
        >
          <a href="#diagnostic" onClick={(event) => handleSectionLinkClick(event, 'diagnostic')} className="glow-button h-14 px-10 rounded-xl bg-gradient-to-r from-blue-600 to-accent-violet text-white font-bold text-lg flex items-center justify-center gap-3 cursor-pointer w-full sm:w-auto">
            Faites votre diagnostic
            <Activity size={20} />
          </a>
          <div className="flex flex-wrap gap-3">
            <a href="#gains" onClick={(event) => handleSectionLinkClick(event, 'gains')} className="h-11 px-6 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-emerald-500/20 hover:text-emerald-200 transition-colors backdrop-blur-sm cursor-pointer">
              <Sparkles size={15} />
              Ce qu'on vous apporte
            </a>
            <a href="#simulateur" onClick={(event) => handleSectionLinkClick(event, 'simulateur')} className="h-11 px-6 rounded-lg bg-sky-500/10 border border-sky-500/25 text-sky-300 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-sky-500/20 hover:text-sky-200 transition-colors backdrop-blur-sm cursor-pointer">
              <Calculator size={15} />
              Estimer vos économies
            </a>
          </div>
        </motion.div>
      </div>

      {/* Right: image + floating KPI cards */}
      <div className="relative hidden md:block h-[400px] md:h-[450px] lg:h-[550px]">
        {/* Main image — fade-in gated on decode() to prevent paint stall */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={heroReady ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl border border-white/10"
        >
          <img
            className="w-full h-full object-cover opacity-60"
            src="/img/hero-network.webp"
            alt="Audit réseau et infrastructure IT pour PME — Aegis Network Lyon"
            fetchPriority="high"
            width={1600}
            height={1064}
            onLoad={(e) => {
              const img = e.currentTarget;
              if (img.decode) {
                img.decode().then(
                  () => setHeroReady(true),
                  () => setHeroReady(true)
                );
              } else {
                setHeroReady(true);
              }
            }}
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-tr from-background-deep/90 via-background-deep/30 to-blue-600/10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--color-background-deep)_100%)] opacity-70" />
        </motion.div>

        {/* KPI: Réduction Coûts */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={heroReady ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
          className="absolute top-6 -left-4 lg:top-8 lg:-left-10 z-20"
        >
          <div className="animate-float">
            <div className="hero-kpi-card bg-slate-900/80 backdrop-blur-xl border border-white/10 p-4 lg:p-5 rounded-xl shadow-2xl w-40 lg:w-48">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="w-4 h-4 text-optical-blue" />
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Réduction Coûts</span>
              </div>
              <span className="text-2xl lg:text-3xl font-black text-white">-30%</span>
              <div className="w-full bg-white/5 h-1.5 rounded-full mt-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '70%' }}
                  transition={{ duration: 1.5, delay: 1, ease: 'easeOut' }}
                  className="bg-optical-blue h-full rounded-full"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* KPI: Efficacité Réseau */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={heroReady ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
          className="absolute bottom-8 -right-2 lg:bottom-16 lg:-right-6 z-20"
        >
          <div className="animate-float" style={{ animationDelay: '1.5s' }}>
            <div className="hero-kpi-card bg-slate-900/80 backdrop-blur-xl border border-white/10 p-4 lg:p-5 rounded-xl shadow-2xl w-44 lg:w-52">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Efficacité Réseau</span>
              </div>
              <span className="text-2xl lg:text-3xl font-black text-white">+45%</span>
              <div className="w-full bg-white/5 h-1.5 rounded-full mt-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '45%' }}
                  transition={{ duration: 1.5, delay: 1.2, ease: 'easeOut' }}
                  className="bg-emerald-400 h-full rounded-full"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* KPI: Audit central badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={heroReady ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: 'easeOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
        >
          <div className="animate-float" style={{ animationDelay: '3s' }}>
            <div className="audit-scan-card bg-slate-900/90 backdrop-blur-xl border border-optical-blue/30 p-4 lg:p-5 rounded-xl shadow-[0_0_40px_rgba(56,189,248,0.15)] flex items-center gap-4">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg bg-blue-600/20 flex items-center justify-center text-optical-blue border border-blue-600/25">
                <Search className="w-5 h-5 lg:w-6 lg:h-6" />
              </div>
              <div>
                <div className="text-sm lg:text-base font-black text-white leading-none">Audit de Performance</div>
                <div className="text-[9px] lg:text-[10px] text-optical-blue/70 mt-1.5 uppercase tracking-[0.15em] font-bold">Identifier les leviers</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
  );
};

const GainBlock = () => (
  <section id="gains" className="py-24 relative overflow-hidden">
    <FiberBeams />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-600/[0.04] blur-[150px] rounded-full pointer-events-none" />
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <motion.div
        initial={false}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <p className="text-optical-blue font-bold text-sm uppercase tracking-[0.3em] mb-4">Ce que vous allez y gagner</p>
        <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
          Audit IT, pilotage, coûts{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">maîtrisés.</span>
        </h2>
        <p className="text-slate-400 text-lg leading-relaxed">
          Un accompagnement Aegis, c'est du temps récupéré, des coûts maîtrisés et une infrastructure qui travaille pour vous, pas l'inverse.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { icon: <TrendingDown size={22} />, title: "Coûts réduits", desc: "Comparer, renégocier, mieux dimensionner.", color: "text-optical-blue" },
          { icon: <Clock size={22} />, title: "Gain de temps", desc: "On pilote vos prestataires et on vous accompagne dans les échanges.", color: "text-accent-violet" },
          { icon: <Search size={22} />, title: "Fournisseurs challengés", desc: "Analyse du marché pour trouver les offres les plus adaptées.", color: "text-emerald-400" },
          { icon: <Users size={22} />, title: "Un interlocuteur unique", desc: "Fini les allers-retours. Un seul contact qui coordonne.", color: "text-optical-blue" },
          { icon: <ShieldCheck size={22} />, title: "Contrats maîtrisés", desc: "Vous savez ce que vous payez, pourquoi, et jusqu'à quand.", color: "text-accent-violet" },
          { icon: <RefreshCw size={22} />, title: "Suivi dans la durée", desc: "On ajuste et on optimise au fil du temps.", color: "text-emerald-400" }
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: i * 0.1, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true }}
            className="gain-card p-8 rounded-2xl flex gap-5"
          >
            <div className={`shrink-0 w-12 h-12 rounded-xl bg-white/10 border border-white/[0.08] flex items-center justify-center ${item.color}`}>
              {item.icon}
            </div>
            <div>
              <p className="font-bold text-white text-lg mb-1">{item.title}</p>
              <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const CostControl = () => (
  <section id="enjeux" className="py-32 relative overflow-hidden">
    <FiberBeams />
    <div className="max-w-7xl mx-auto px-6">
      <motion.div
        initial={false}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto mb-20"
      >
        <p className="text-optical-blue font-bold text-sm uppercase tracking-[0.3em] mb-4">Optimisation des coûts IT & télécom</p>
        <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
          Vos contrats IT méritent un{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">regard neuf.</span>
        </h2>
        <p className="text-slate-400 text-lg leading-relaxed">
          La plupart des TPE et PME conservent des abonnements inadaptés, surdimensionnés ou jamais renégociés. C'est précisément là que nous intervenons.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {[
          {
            icon: <TrendingDown size={28} />,
            title: "Contrats reconduits par habitude",
            desc: "Vous renouvelez vos abonnements sans vérifier si une offre plus adaptée existe. Les tarifs évoluent, pas vos contrats.",
            color: "text-optical-blue",
            border: "border-blue-600/20 hover:border-optical-blue/40"
          },
          {
            icon: <Search size={28} />,
            title: "Aucune mise en concurrence",
            desc: "Votre fournisseur actuel n'a jamais été challengé. Sans comparaison, impossible de savoir si vous payez le juste prix.",
            color: "text-accent-violet",
            border: "border-accent-violet/20 hover:border-accent-violet/40"
          },
          {
            icon: <Target size={28} />,
            title: "Surcoûts invisibles",
            desc: "Options inutiles, services doublonnés, lignes inactives… Les postes de dépense oubliés s'accumulent discrètement.",
            color: "text-emerald-400",
            border: "border-emerald-400/20 hover:border-emerald-400/40"
          }
        ].map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className={`glass-card cause-card p-10 rounded-3xl ${card.border}`}
          >
            <div className={`${card.color} mb-4`}>{card.icon}</div>
            <p className="font-bold text-white text-xl mb-3">{card.title}</p>
            <p className="text-slate-400 leading-relaxed">{card.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card rounded-2xl p-8 max-w-2xl mx-auto border-white/5 text-center"
      >
        <p className="text-sm text-slate-400 leading-relaxed">
          <span className="text-white font-bold">Les PME renégocient le plus souvent avec leur fournisseur actuel</span>, sans remettre en concurrence.
          Les grandes entreprises, elles, comparent systématiquement.
        </p>
        <p className="text-xs text-slate-600 mt-3">Source : BEREC, 2022</p>
      </motion.div>
    </div>
  </section>
);

const TimeLoss = () => (
  <section className="py-32 relative overflow-hidden bg-slate-950">
    <div className="absolute inset-0 opacity-20">
      <img
        className="w-full h-full object-cover mix-blend-screen"
        src="/img/timeloss-bg.webp"
        alt="Gestion du temps IT en entreprise — coordination prestataires"
        loading="lazy"
        decoding="async"
        width={1600}
        height={1068}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background-deep via-background-deep/60 to-transparent" />
    </div>
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="grid lg:grid-cols-2 gap-24 items-center">
        <div>
          <p className="text-accent-violet font-bold text-sm uppercase tracking-[0.3em] mb-6">Temps perdu en gestion IT</p>
          <h2 className="text-5xl lg:text-6xl font-black mb-10 leading-[1.1] text-white">
            Le temps passé à gérer vos prestataires{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-500">a un coût.</span>
          </h2>
          <div className="space-y-10">
            {[
              {
                icon: <PhoneCall />,
                title: "Heures au téléphone avec le SAV",
                desc: "Appels au support, relances, attentes… Chaque incident mobilise du temps qui ne profite pas à votre activité."
              },
              {
                icon: <Activity />,
                title: "Coordination entre prestataires",
                desc: "Quand l'opérateur, l'intégrateur et l'hébergeur se renvoient la balle, c'est vous qui perdez du temps à arbitrer."
              },
              {
                icon: <Clock />,
                title: "Pannes et lenteurs récurrentes",
                desc: "Des incidents réguliers que personne ne résout vraiment. On redémarre, on contourne, on subit."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                viewport={{ once: true }}
                className="flex gap-6 group"
              >
                <div className="shrink-0 w-12 h-12 rounded-2xl bg-violet-600/30 flex items-center justify-center text-violet-400 border border-violet-600/40 group-hover:bg-violet-600 group-hover:text-white transition-all duration-500">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div>
          <div className="glass-card rounded-3xl p-10 border-white/10">
            <p className="text-xs font-bold text-accent-violet uppercase tracking-widest mb-6">Impact concret</p>
            <div className="space-y-6">
              {[
                { value: "4h", label: "par mois en moyenne passées à gérer des incidents IT dans une PME de 10 à 50 salariés" },
                { value: "54%", label: "des TPE estiment que les charges administratives déléguées pèsent 1 à 3 % du CA" },
                { value: "29%", label: "des TPE-PME victimes d'incidents déclarent des interruptions de service" }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15, x: -10 }}
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  transition={{ delay: i * 0.12, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4"
                >
                  <span className="text-3xl font-black text-white shrink-0 w-16">{stat.value}</span>
                  <p className="text-sm text-slate-400 leading-relaxed">{stat.label}</p>
                </motion.div>
              ))}
            </div>
            <p className="text-[11px] text-slate-600 mt-6 leading-relaxed">Sources : SDI 2023, Cybermalveillance.gouv.fr 2025</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const RootCause = () => (
  <section className="py-32 relative bg-background-deep overflow-hidden">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="lg:w-1/2 order-2 lg:order-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                icon: <Zap size={28} />,
                title: "On ajoute du débit",
                desc: "…alors que le problème vient d'un routage mal configuré ou d'un équipement obsolète.",
                color: "text-optical-blue",
                border: "border-blue-600/20 hover:border-optical-blue/40"
              },
              {
                icon: <PhoneCall size={28} />,
                title: "On change de standard",
                desc: "…alors que le vrai souci est un mauvais paramétrage des renvois d'appels ou des files d'attente.",
                color: "text-accent-violet",
                border: "border-accent-violet/20 hover:border-accent-violet/40"
              },
              {
                icon: <RefreshCw size={28} />,
                title: "On change de fournisseur",
                desc: "…sans avoir identifié ce qui ne fonctionnait pas. Le problème suit le nouveau contrat.",
                color: "text-blue-400",
                border: "border-blue-400/20 hover:border-blue-400/40"
              },
              {
                icon: <TrendingDown size={28} />,
                title: "On subit les renouvellements",
                desc: "…parce que personne n'a le temps ni le recul pour les remettre en question.",
                color: "text-emerald-400",
                border: "border-emerald-400/20 hover:border-emerald-400/40"
              }
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className={`glass-card p-8 rounded-3xl ${card.border} transition-all`}
              >
                <div className={`${card.color} mb-4`}>{card.icon}</div>
                <p className="font-bold text-white text-lg">{card.title}</p>
                <p className="text-sm text-slate-400 mt-2">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="lg:w-1/2 order-1 lg:order-2">
          <p className="text-optical-blue font-bold text-sm uppercase tracking-[0.3em] mb-6">Diagnostic IT indépendant</p>
          <h2 className="text-5xl font-black text-white mb-8 leading-tight">On colmate. Rarement on diagnostique.</h2>
          <p className="text-slate-400 text-lg mb-10 leading-relaxed">
            Beaucoup d'entreprises enchaînent les correctifs sans jamais prendre le recul nécessaire. On change de fournisseur, on ajoute une ligne, on monte en débit. Mais personne ne regarde la cause réelle du problème.
          </p>
          <ul className="space-y-6 mb-12">
            {[
              "Diagnostic indépendant de votre infrastructure",
              "Identification des causes, pas seulement des symptômes",
              "Recommandations claires, sans conflit d'intérêt"
            ].map((text, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 font-semibold text-slate-300 group"
              >
                <CheckCircle className="text-optical-blue group-hover:scale-125 transition-transform" size={20} />
                {text}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

const WhyAegis = () => (
  <section id="approche" className="py-32 relative overflow-hidden">
    <FiberBeams />
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <p className="text-optical-blue font-bold text-sm uppercase tracking-[0.3em] mb-4">Conseil IT indépendant à Lyon</p>
        <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
          Un consultant indépendant.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">Pas un revendeur.</span>
        </h2>
        <p className="text-slate-400 text-lg leading-relaxed">
          Aegis Network n'est pas un opérateur, pas un intégrateur, pas un revendeur. Nous sommes un interlocuteur unique qui travaille exclusivement dans votre intérêt.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {[
          {
            icon: <ShieldCheck size={28} />,
            title: "Aucune commission fournisseur",
            desc: "Nous ne touchons rien de vos prestataires. Nos recommandations sont guidées uniquement par votre intérêt.",
            color: "text-optical-blue"
          },
          {
            icon: <Search size={28} />,
            title: "Audit objectif et documenté",
            desc: "Nous analysons l'existant sans a priori. Chaque recommandation est argumentée, chiffrée et vérifiable.",
            color: "text-accent-violet"
          },
          {
            icon: <Users size={28} />,
            title: "Un interlocuteur unique",
            desc: "Fini les échanges entre cinq prestataires qui se renvoient la balle. Un seul contact qui coordonne tout.",
            color: "text-emerald-400"
          }
        ].map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="glass-card p-10 rounded-3xl border-white/5 hover:border-blue-500/20 transition-all text-center"
          >
            <div className={`${card.color} mb-4 flex justify-center`}>{card.icon}</div>
            <p className="font-bold text-white text-xl mb-3">{card.title}</p>
            <p className="text-slate-400 leading-relaxed">{card.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={false}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        viewport={{ once: true }}
        className="glass-card rounded-[2rem] p-10 lg:p-14 max-w-3xl mx-auto border-optical-blue/10 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-32 h-32 bg-blue-600/5 rounded-full blur-[40px]" />
        <div className="relative z-10">
          <p className="text-lg lg:text-xl text-slate-300 leading-relaxed italic mb-6">
            « J'ai créé Aegis parce que j'ai vu trop d'entreprises payer pour des services inadaptés, sans jamais avoir quelqu'un de leur côté pour les aider à y voir clair. Mon rôle, c'est d'être ce regard extérieur, objectif et concret. »
          </p>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center text-white font-bold text-sm">
              AN
            </div>
            <div>
              <p className="text-white font-bold">Fondateur, Aegis Network</p>
              <p className="text-xs text-slate-500">Consultant IT indépendant · Lyon</p>
            </div>
          </div>
        </div>
      </motion.div>
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
  const [hoursPerWeek, setHoursPerWeek] = useState(4);
  const [hourlyRate, setHourlyRate] = useState(45);
  const [monthlyBudget, setMonthlyBudget] = useState(1500);
  const [showSources, setShowSources] = useState(false);

  const hoursPerMonth = Math.round(hoursPerWeek * 4.33 * 10) / 10;
  const timeSavingMonth = Math.round(hoursPerMonth * hourlyRate);
  const contractSavingMonth = Math.round(monthlyBudget * 0.20);
  const totalMonthly = timeSavingMonth + contractSavingMonth;
  const totalAnnual = totalMonthly * 12;

  const fmt = (n: number) => n.toLocaleString('fr-FR');

  return (
    <section id="simulateur" className="py-32 relative bg-background-deep overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <p className="text-optical-blue font-bold text-sm uppercase tracking-[0.3em] mb-4">Simulateur d'économies IT</p>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
            Estimez vos gains{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">concrets.</span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Ajustez les curseurs selon votre situation. Les résultats sont des estimations, pas des promesses.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Inputs */}
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-8 border-white/10"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-blue-600/15 flex items-center justify-center">
                <BarChart3 size={18} className="text-optical-blue" />
              </div>
              <h3 className="font-bold text-white">Vos paramètres</h3>
            </div>

            <div className="space-y-6">
              <CalcSlider
                label="Heures par semaine consacrées à la gestion de votre informatique"
                value={hoursPerWeek}
                onChange={setHoursPerWeek}
                min={1} max={20} step={1}
                unit="h"
                note="Relances prestataires, coordination, suivi, échanges opérateurs."
              />
              <CalcSlider
                label="Coût horaire interne estimé"
                value={hourlyRate}
                onChange={setHourlyRate}
                min={20} max={150} step={5}
                unit="€/h"
                note="Valeur d'une heure de votre temps ou de votre équipe."
              />
              <CalcSlider
                label="Budget IT et télécoms mensuel"
                value={monthlyBudget}
                onChange={setMonthlyBudget}
                min={200} max={10000} step={100}
                unit="€"
                note="Abonnements, licences, maintenance, téléphonie."
              />
            </div>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-8 border-optical-blue/20 bg-blue-950/20 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/10 rounded-full blur-[60px]" />

            <div className="flex items-center gap-3 mb-8 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/15 flex items-center justify-center">
                <TrendingUp size={18} className="text-emerald-400" />
              </div>
              <h3 className="font-bold text-white">Résultats estimés</h3>
            </div>

            <div className="space-y-5 relative z-10">
              <CalcResult label="Temps consacré à l'IT / mois" value={`${hoursPerMonth}h`} />
              <CalcResult label="Coût du temps mobilisé" value={`${fmt(timeSavingMonth)}€ /mois`} highlight />

              <div className="border-t border-white/5 my-2" />

              <CalcResult label="Économies contrats potentielles" value={`+${fmt(contractSavingMonth)}€ /mois`} highlight />

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

            <p className="text-[11px] text-slate-600 mt-6 leading-relaxed relative z-10">
              Estimation indicative. L'économie sur vos contrats dépend de votre situation. Hypothèse : 20 % d'optimisation sur le budget IT.
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
                        Le temps de gestion IT inclut les relances prestataires,
                        le suivi de tickets, la coordination interne et les échanges opérateurs.
                        Le simulateur affiche le coût total de ce temps mobilisé chaque mois.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-optical-blue font-bold shrink-0">²</span>
                      <span>
                        L'hypothèse de 20 % d'économie sur le budget IT est volontairement prudente.
                        Elle couvre les gains issus de la renégociation, la suppression de doublons
                        et l'optimisation des abonnements. Le résultat réel dépend du contexte.
                      </span>
                    </li>
                  </ul>
                  <div className="border-t border-white/5 mt-4 pt-4">
                    <p className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-3">Contexte marché (sources indépendantes)</p>
                    <ul className="space-y-2 text-xs text-slate-400">
                      <li>78 % des dirigeants de TPE/PME estiment que le numérique représente un bénéfice réel. <span className="text-slate-500">France Num, Baromètre 2025</span></li>
                      <li>Les PME renégocient plus souvent avec le même fournisseur, les grandes entreprises remettent davantage en concurrence. <span className="text-slate-500">BEREC, 2022</span></li>
                      <li>Pour 54 % des TPE, les charges administratives déléguées représentent 1 à 3 % du CA. <span className="text-slate-500">SDI, 2023</span></li>
                      <li>29 % des TPE-PME victimes d'incidents déclarent des interruptions de service. <span className="text-slate-500">Cybermalveillance.gouv.fr, 2025</span></li>
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

const EvolutionConseil = () => (
  <section className="py-32 relative bg-background-deep overflow-hidden">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        <div className="min-w-0">
          <p className="text-optical-blue font-bold text-sm uppercase tracking-[0.3em] mb-6">Pilotage IT & télécom dans la durée</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-8 leading-tight">Un accompagnement qui évolue avec votre activité.</h2>
          <p className="text-slate-400 text-lg mb-10 leading-relaxed">
            Un audit ponctuel, c'est bien. Un suivi régulier, c'est mieux. Vos besoins changent, le marché évolue, vos contrats arrivent à échéance. Nous restons à vos côtés pour ajuster, anticiper et optimiser dans la durée.
          </p>
          <div className="space-y-8">
            {[
              {
                icon: <BarChart3 />,
                title: "Revue périodique",
                desc: "Nous réévaluons vos contrats et vos usages à intervalles réguliers pour identifier de nouveaux leviers."
              },
              {
                icon: <Lightbulb />,
                title: "Veille et recommandations",
                desc: "Nouvelles offres, évolutions technologiques, changements réglementaires : nous vous tenons informé de ce qui compte."
              },
              {
                icon: <ArrowRight />,
                title: "Pilotage des évolutions",
                desc: "Quand un changement s'impose, nous le cadrons, le pilotons et nous assurons qu'il se passe bien."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                viewport={{ once: true }}
                className="flex gap-6 group"
              >
                <div className="shrink-0 w-12 h-12 rounded-2xl bg-blue-600/20 flex items-center justify-center text-optical-blue border border-blue-600/30 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
          className="relative min-w-0"
        >
          <div className="glass-card rounded-[3rem] p-6 shadow-2xl border-white/10 premium-glow">
            <img
              className="rounded-[2rem] w-full h-auto"
              src="/img/why-aegis.webp"
              alt="Accompagnement IT durable pour entreprises — conseil et pilotage"
              loading="lazy"
              decoding="async"
              width={1200}
              height={800}
            />
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const DIAG_QUESTIONS = [
  {
    id: 1,
    question: "Votre environnement IT correspond-il à vos besoins actuels ?",
    options: [
      { id: 'A', label: "Oui, il répond bien à nos besoins", score: 20 },
      { id: 'B', label: "Globalement, avec quelques limites", score: 14 },
      { id: 'C', label: "Pas vraiment, certains points nous freinent", score: 7 },
      { id: 'D', label: "Non, il n'est pas adapté", score: 0 },
    ],
  },
  {
    id: 2,
    question: "Perdez-vous du temps à cause de vos outils, de votre réseau ou de votre téléphonie ?",
    options: [
      { id: 'A', label: "Non, très rarement", score: 20 },
      { id: 'B', label: "Parfois, mais ça reste limité", score: 14 },
      { id: 'C', label: "Oui, régulièrement", score: 7 },
      { id: 'D', label: "Oui, c'est un vrai problème au quotidien", score: 0 },
    ],
  },
  {
    id: 3,
    question: "Les sujets avancent-ils bien avec vos prestataires IT ?",
    options: [
      { id: 'A', label: "Oui, les échanges sont clairs et efficaces", score: 20 },
      { id: 'B', label: "Globalement, même si certains sujets traînent", score: 14 },
      { id: 'C', label: "Pas toujours, il faut souvent relancer", score: 7 },
      { id: 'D', label: "Non, c'est trop lent ou trop flou", score: 0 },
    ],
  },
  {
    id: 4,
    question: "Vos contrats IT sont-ils régulièrement revus et challengés ?",
    options: [
      { id: 'A', label: "Oui, on revoit régulièrement ce qu'on paie", score: 20 },
      { id: 'B', label: "De temps en temps, sans méthode précise", score: 14 },
      { id: 'C', label: "Rarement, on garde l'existant par habitude", score: 7 },
      { id: 'D', label: "Non, presque jamais", score: 0 },
    ],
  },
  {
    id: 5,
    question: "En cas d'incident IT majeur, l'impact sur votre activité resterait-il gérable ?",
    options: [
      { id: 'A', label: "Oui, l'impact serait limité", score: 20 },
      { id: 'B', label: "Probablement, avec une gêne temporaire", score: 14 },
      { id: 'C', label: "Ce serait vite problématique", score: 7 },
      { id: 'D', label: "Ce serait un blocage important", score: 0 },
    ],
  },
];

interface DiagResult {
  score: number;
  level: string;
  interpretation: string;
  points: { label: string; type: 'warning' | 'danger' }[];
  priority: string;
  axes: { label: string; score: number; detail: string }[];
}

const computeResult = (answers: Record<number, { id: string; score: number }>): DiagResult => {
  const score = Object.values(answers).reduce((sum, a) => sum + a.score, 0);

  const q2 = answers[2]?.score ?? 20;
  const q3 = answers[3]?.score ?? 20;
  const q4 = answers[4]?.score ?? 20;
  const q5 = answers[5]?.score ?? 20;
  const q1 = answers[1]?.score ?? 20;

  const points: { label: string; type: 'warning' | 'danger' }[] = [];

  if (q2 + q3 <= 14) {
    points.push({ label: "Frictions fréquentes et temps perdu en relances ou résolution incomplète", type: q2 + q3 <= 7 ? 'danger' : 'warning' });
  }
  if (q4 <= 7) {
    points.push({ label: "Contrats et services insuffisamment challengés par rapport au besoin réel", type: q4 === 0 ? 'danger' : 'warning' });
  }
  if (q5 <= 7) {
    points.push({ label: "Exposition opérationnelle élevée en cas d'incident", type: q5 === 0 ? 'danger' : 'warning' });
  }
  if (q1 <= 7) {
    points.push({ label: "Décalage entre l'environnement actuel et l'activité réelle", type: q1 === 0 ? 'danger' : 'warning' });
  }

  // Keep max 2 points
  const finalPoints = points.slice(0, 2);

  // Business-aligned axes (normalized to 0–100)
  const axePilotage = Math.round(((q1 + q4) / 40) * 100);
  const axeFluidite = Math.round(((q2 + q3) / 40) * 100);
  const axeExposition = Math.round((q5 / 20) * 100);

  const axeDetail = (val: number) =>
    val >= 75 ? 'Bien cadré' : val >= 50 ? 'À consolider' : val >= 25 ? 'Fragile' : 'Critique';

  const axes = [
    { label: 'Pilotage', score: axePilotage, detail: axeDetail(axePilotage) },
    { label: 'Fluidité opérationnelle', score: axeFluidite, detail: axeDetail(axeFluidite) },
    { label: 'Maîtrise des risques', score: axeExposition, detail: axeDetail(axeExposition) },
  ];

  if (score >= 80) {
    return {
      score,
      level: "Environnement bien tenu",
      interpretation: "Votre base semble saine. C'est justement le bon moment pour identifier ce qui peut encore être simplifié, automatisé ou sécurisé davantage afin de gagner en efficacité sur le long terme.",
      points: finalPoints.length > 0 ? finalPoints : [
        { label: "Marges d'optimisation : renégociation de contrats, consolidation d'outils ou automatisation de tâches récurrentes", type: 'warning' },
      ],
      priority: "Profiter de cette stabilité pour challenger vos contrats, réduire les coûts inutiles et anticiper l'évolution de vos besoins.",
      axes,
    };
  }
  if (score >= 60) {
    return {
      score,
      level: "Base correcte, encore perfectible",
      interpretation: "L'ensemble tient, mais plusieurs signaux montrent une maîtrise encore partielle.",
      points: finalPoints.length > 0 ? finalPoints : [
        { label: "Frictions ponctuelles", type: 'warning' },
        { label: "Services ou contrats pas assez revus", type: 'warning' },
      ],
      priority: "Remettre à plat les zones qui font perdre du temps ou qui ne sont plus alignées avec votre besoin.",
      axes,
    };
  }
  if (score >= 40) {
    return {
      score,
      level: "Fonctionnement trop subi",
      interpretation: "Le quotidien tient, mais avec trop de limites, de dépendances ou de pertes de temps évitables.",
      points: finalPoints.length > 0 ? finalPoints : [
        { label: "Trop de relances ou de lenteurs", type: 'warning' },
        { label: "Existant insuffisamment challengé", type: 'danger' },
      ],
      priority: "Reprendre la main sur l'existant avant d'ajouter de nouveaux outils ou coûts.",
      axes,
    };
  }
  return {
    score,
    level: "Environnement à risque",
    interpretation: "Votre environnement semble freiner clairement l'activité ou exposer l'entreprise à un impact disproportionné.",
    points: finalPoints.length > 0 ? finalPoints : [
      { label: "Impact métier mal absorbé", type: 'danger' },
      { label: "Décalage fort entre besoin réel et existant", type: 'danger' },
    ],
    priority: "Identifier rapidement les points de blocage, les dépendances critiques et les priorités d'optimisation.",
    axes,
  };
};

const exportDiagPDF = (result: DiagResult) => {
  const scoreColor = result.score >= 80 ? '#34d399' : result.score >= 60 ? '#38bdf8' : result.score >= 40 ? '#fbbf24' : '#fb7185';
  const html = `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><title>Diagnostic Express — Aegis Network</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',sans-serif;background:#fff;color:#1e293b;padding:48px}
.header{display:flex;align-items:center;gap:12px;margin-bottom:32px;padding-bottom:24px;border-bottom:2px solid #e2e8f0}
.header h1{font-size:20px;font-weight:900;color:#0f172a;letter-spacing:0.05em}
.header span{display:block;font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.15em;margin-top:4px}
.score-section{display:flex;align-items:center;gap:32px;margin:32px 0}
.score-circle{width:100px;height:100px;border-radius:50%;border:3px solid ${scoreColor};display:flex;flex-direction:column;align-items:center;justify-content:center}
.score-value{font-size:36px;font-weight:900;color:${scoreColor}}
.score-label{font-size:9px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.1em}
.level{font-size:22px;font-weight:900;color:#0f172a;margin-bottom:8px}
.interpretation{font-size:14px;color:#475569;line-height:1.6}
h3{font-size:13px;font-weight:700;color:#0f172a;text-transform:uppercase;letter-spacing:0.1em;margin:28px 0 12px}
.point{display:flex;align-items:flex-start;gap:10px;padding:12px 16px;border-radius:12px;margin-bottom:8px;font-size:13px;line-height:1.5}
.point.warning{background:#fef3c7;color:#92400e}
.point.danger{background:#fee2e2;color:#991b1b}
.priority{padding:16px 20px;border-radius:12px;background:#eff6ff;color:#1e40af;font-size:13px;line-height:1.6}
.axes{display:flex;gap:16px;margin:24px 0}
.axe{flex:1;padding:14px 16px;border-radius:12px;background:#f8fafc;border:1px solid #e2e8f0}
.axe-label{font-size:12px;font-weight:700;color:#0f172a;margin-bottom:6px}
.axe-bar{height:6px;background:#e2e8f0;border-radius:3px;overflow:hidden;margin-bottom:4px}
.axe-fill{height:100%;border-radius:3px}
.axe-detail{font-size:11px;color:#64748b}
.footer{margin-top:40px;padding-top:20px;border-top:1px solid #e2e8f0;font-size:11px;color:#94a3b8;display:flex;justify-content:space-between}
@media print{body{padding:24px}}
</style></head><body>
<div class="header"><div><h1>AEGIS NETWORK</h1><span>Diagnostic Express — Résultat</span></div></div>
<div class="score-section"><div class="score-circle"><div class="score-value">${result.score}</div><div class="score-label">sur 100</div></div>
<div><div class="level">${result.level}</div><div class="interpretation">${result.interpretation}</div></div></div>
<h3>Évaluation par axe</h3>
<div class="axes">${result.axes.map(a => {
  const color = a.score >= 75 ? '#10b981' : a.score >= 50 ? '#3b82f6' : a.score >= 25 ? '#f59e0b' : '#f43f5e';
  return `<div class="axe"><div class="axe-label">${a.label}</div><div class="axe-bar"><div class="axe-fill" style="width:${a.score}%;background:${color}"></div></div><div class="axe-detail">${a.detail}</div></div>`;
}).join('')}</div>
<h3>Points d'attention</h3>
${result.points.map(p => `<div class="point ${p.type}"><span>⚠</span><span>${p.label}</span></div>`).join('')}
<h3>Priorité recommandée</h3>
<div class="priority">${result.priority}</div>
<div class="footer"><span>Aegis Network — Conseil &amp; Optimisation IT</span><span>04 82 53 26 99 · contact@aegisnetwork.fr</span></div>
</body></html>`;
  const w = window.open('', '_blank');
  if (w) {
    w.document.write(html);
    w.document.close();
    w.print();
  }
};

const DiagnosticExpress = ({ onComplete, onContact }: { onComplete: (r: DiagResult) => void; onContact: () => void }) => {
  const [step, setStep] = useState<'intro' | 'quiz' | 'result'>('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, { id: string; score: number }>>({});
  const [result, setResult] = useState<DiagResult | null>(null);

  const currentQ = DIAG_QUESTIONS[currentIndex];
  const selected = answers[currentQ?.id];
  const progress = Math.round(((currentIndex + 1) / DIAG_QUESTIONS.length) * 100);

  const handleSelect = (optId: string, score: number) => {
    setAnswers(prev => ({ ...prev, [currentQ.id]: { id: optId, score } }));
  };

  const handleNext = () => {
    if (!selected) return;
    if (currentIndex < DIAG_QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      const r = computeResult(answers);
      setResult(r);
      onComplete(r);
      setStep('result');
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      setStep('intro');
    }
  };

  const handleReset = () => {
    setStep('intro');
    setCurrentIndex(0);
    setAnswers({});
    setResult(null);
  };

  const scoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 60) return 'text-blue-400';
    if (score >= 40) return 'text-amber-400';
    return 'text-rose-400';
  };

  const scoreBorder = (score: number) => {
    if (score >= 80) return 'border-emerald-500/40';
    if (score >= 60) return 'border-blue-500/40';
    if (score >= 40) return 'border-amber-500/40';
    return 'border-rose-500/40';
  };

  const scoreGlow = (score: number) => {
    if (score >= 80) return 'shadow-[0_0_40px_rgba(16,185,129,0.15)]';
    if (score >= 60) return 'shadow-[0_0_40px_rgba(56,189,248,0.15)]';
    if (score >= 40) return 'shadow-[0_0_40px_rgba(245,158,11,0.15)]';
    return 'shadow-[0_0_40px_rgba(244,63,94,0.15)]';
  };

  return (
    <section id="diagnostic" className="py-32 relative overflow-hidden">
      {/* Solid background isolation — prevents FiberBeams/effects from parent sections bleeding through */}
      <div className="absolute inset-0 bg-background-deep" />
      <div className="absolute inset-0 bg-gradient-to-b from-blue-600/[0.03] via-transparent to-accent-violet/[0.03]" />
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="diagnostic-container rounded-3xl border border-white/[0.08] bg-slate-950/80 backdrop-blur-2xl p-8 md:p-12 shadow-[0_0_60px_-15px_rgba(56,189,248,0.08)]">

        {/* ── INTRO ── */}
        {step === 'intro' && (
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/15 border border-blue-600/25 text-optical-blue text-xs font-bold uppercase tracking-widest mb-8">
              <Activity className="w-3.5 h-3.5" />
              Diagnostic Express
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
              Où en est votre{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">IT</span>
              {' '}?
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
              5 questions · 1 minute. Un premier état des lieux concret, gratuit et sans engagement.
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-10 text-sm text-slate-400">
              {[
                { icon: Clock, text: '1 min' },
                { icon: CheckCircle, text: 'Gratuit' },
                { icon: Target, text: 'Résultat immédiat' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-optical-blue" />
                  <span className="font-medium">{text}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setStep('quiz')}
              className="glow-button h-14 px-6 sm:px-10 rounded-xl bg-gradient-to-r from-blue-600 to-accent-violet text-white font-bold text-base sm:text-lg inline-flex items-center justify-center gap-3 cursor-pointer whitespace-nowrap"
            >
              Lancer le diagnostic
              <ArrowRight size={20} />
            </button>
          </motion.div>
        )}

        {/* ── QUIZ ── */}
        {step === 'quiz' && currentQ && (
          <div>
            {/* Progress */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-3">
                <span className="text-optical-blue text-xs font-bold uppercase tracking-widest">
                  Question {currentIndex + 1} / {DIAG_QUESTIONS.length}
                </span>
                <span className="text-xs font-bold text-slate-500">{progress}%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-800/80 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full"
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentQ.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
              >
                {/* Question */}
                <h3 className="text-2xl md:text-3xl font-black text-white leading-tight mb-10">
                  {currentQ.question}
                </h3>

                {/* Options grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                  {currentQ.options.map((opt) => {
                    const isSelected = selected?.id === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleSelect(opt.id, opt.score)}
                        className={`relative flex items-start gap-4 p-5 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer group ${
                          isSelected
                            ? 'border-blue-500 bg-blue-500/10 shadow-[0_0_25px_-8px_rgba(37,99,235,0.3)]'
                            : 'border-white/5 bg-slate-900/50 hover:border-slate-600 hover:bg-slate-800/50'
                        }`}
                      >
                        <span className={`shrink-0 flex items-center justify-center h-8 w-8 rounded-lg font-black text-sm transition-colors ${
                          isSelected ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700 group-hover:text-white'
                        }`}>
                          {opt.id}
                        </span>
                        <span className={`text-base font-semibold leading-snug transition-colors ${
                          isSelected ? 'text-white' : 'text-slate-300 group-hover:text-white'
                        }`}>
                          {opt.label}
                        </span>
                        {isSelected && (
                          <CheckCircle className="absolute top-4 right-4 w-5 h-5 text-blue-400" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-6 border-t border-white/5">
              <button
                onClick={handlePrev}
                className="text-slate-500 hover:text-white transition-colors font-semibold text-sm flex items-center gap-2 cursor-pointer"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                Précédent
              </button>
              <button
                onClick={handleNext}
                disabled={!selected}
                className={`flex items-center justify-center gap-2 rounded-xl h-12 px-8 text-sm font-bold transition-all cursor-pointer ${
                  selected
                    ? 'bg-blue-600 text-white shadow-[0_0_15px_-3px_rgba(37,99,235,0.4)] hover:bg-blue-500'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                {currentIndex < DIAG_QUESTIONS.length - 1 ? 'Suivant' : 'Voir le résultat'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ── RESULT ── */}
        {step === 'result' && result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <div className="text-center mb-10">
              <span className="text-optical-blue text-xs font-bold uppercase tracking-widest">Votre diagnostic</span>
            </div>

            {/* Score card */}
            <div className="glass-card rounded-3xl p-8 md:p-10 mb-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-72 h-72 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

              <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                {/* Score circle */}
                <div className={`shrink-0 flex flex-col items-center justify-center w-40 h-40 rounded-full border-[3px] ${scoreBorder(result.score)} bg-slate-950/80 ${scoreGlow(result.score)}`}>
                  <span className={`text-6xl font-black ${scoreColor(result.score)}`}>{result.score}</span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">sur 100</span>
                </div>

                {/* Level + interpretation */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-3">{result.level}</h3>
                  <p className="text-slate-400 text-base leading-relaxed">{result.interpretation}</p>
                </div>
              </div>
            </div>

            {/* Axes d'évaluation */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {result.axes.map((axe, i) => {
                const barColor = axe.score >= 75 ? 'bg-emerald-500' : axe.score >= 50 ? 'bg-blue-500' : axe.score >= 25 ? 'bg-amber-500' : 'bg-rose-500';
                const textColor = axe.score >= 75 ? 'text-emerald-400' : axe.score >= 50 ? 'text-blue-400' : axe.score >= 25 ? 'text-amber-400' : 'text-rose-400';
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.1 }}
                    className="glass-card rounded-2xl p-5 border border-white/[0.06]"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-bold text-white">{axe.label}</span>
                      <span className={`text-xs font-bold ${textColor}`}>{axe.detail}</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800/80 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${axe.score}%` }}
                        transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease: 'easeOut' }}
                        className={`h-full rounded-full ${barColor}`}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Points d'attention */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {result.points.map((pt, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className={`flex items-start gap-4 p-5 rounded-2xl border ${
                    pt.type === 'danger'
                      ? 'border-rose-500/20 bg-rose-500/5'
                      : 'border-amber-500/20 bg-amber-500/5'
                  }`}
                >
                  <AlertTriangle className={`w-5 h-5 shrink-0 mt-0.5 ${
                    pt.type === 'danger' ? 'text-rose-400' : 'text-amber-400'
                  }`} />
                  <span className="text-sm font-medium text-slate-300 leading-relaxed">{pt.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Priority */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-start gap-4 p-6 rounded-2xl border border-blue-500/20 bg-blue-500/5 mb-10"
            >
              <Lightbulb className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-white mb-1">Priorité recommandée</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{result.priority}</p>
              </div>
            </motion.div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onContact}
                className="glow-button h-14 px-8 rounded-xl bg-gradient-to-r from-blue-600 to-accent-violet text-white font-bold text-base flex items-center justify-center gap-3 cursor-pointer"
              >
                Échanger sur vos résultats
                <ArrowRight size={18} />
              </button>
              <button
                onClick={() => exportDiagPDF(result)}
                className="h-14 px-8 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-base flex items-center justify-center gap-2 hover:bg-white/10 transition-all cursor-pointer"
              >
                <Download size={16} />
                Télécharger le résumé
              </button>
              <button
                onClick={handleReset}
                className="h-14 px-8 rounded-xl bg-white/5 border border-white/10 text-slate-400 font-bold text-base flex items-center justify-center gap-2 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
              >
                <RotateCcw size={16} />
                Refaire
              </button>
            </div>
          </motion.div>
        )}

        </div>
      </div>
    </section>
  );
};

const FAQ_ITEMS = [
  {
    q: "Quelle est la différence entre Aegis Network et un prestataire informatique classique\u00a0?",
    a: "Un prestataire classique vend des solutions ou des abonnements. Aegis Network est un consultant indépendant qui audite votre existant, challenge vos contrats et coordonne vos prestataires dans votre intérêt — sans commission fournisseur."
  },
  {
    q: "À quels types d'entreprises s'adresse Aegis Network\u00a0?",
    a: "Principalement aux TPE et PME de la région lyonnaise qui veulent reprendre le contrôle sur leur IT, leur réseau ou leur téléphonie, réduire leurs coûts et gagner en performance sans embaucher un DSI à temps plein."
  },
  {
    q: "Combien coûte un audit IT avec Aegis Network\u00a0?",
    a: "Le premier échange est gratuit et sans engagement. Il permet d'évaluer votre situation et de déterminer si un accompagnement est pertinent. Le périmètre et le budget sont ensuite définis ensemble, en toute transparence."
  },
  {
    q: "Quels gains concrets peut-on attendre d'un audit\u00a0?",
    a: "En moyenne, les entreprises accompagnées constatent une réduction de 15 à 30\u00a0% sur leurs contrats IT et télécom, un gain de temps significatif sur la gestion des prestataires, et une meilleure visibilité sur leurs dépenses."
  },
  {
    q: "Aegis Network intervient-il uniquement à Lyon\u00a0?",
    a: "L'accompagnement est basé à Lyon et couvre principalement la région Auvergne-Rhône-Alpes (Lyon, Ain, Isère). Les échanges en visio permettent également un suivi à distance sur tout le territoire."
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-32 relative bg-background-deep overflow-hidden">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-optical-blue font-bold text-sm uppercase tracking-[0.3em] mb-4">Questions fréquentes</p>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
            Ce que nos interlocuteurs nous{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">demandent.</span>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, i) => (
            <motion.div
              key={i}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl border-white/5 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left cursor-pointer"
              >
                <span className="font-bold text-white text-base pr-4">{item.q}</span>
                <ChevronDown
                  size={20}
                  className={`text-slate-400 shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-slate-400 leading-relaxed">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = () => (
  <section className="py-32 relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-6">
      <div className="bg-gradient-to-br from-blue-600/80 via-blue-700 to-accent-violet rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-8 md:p-12 lg:p-24 text-white relative overflow-hidden premium-glow">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full -mr-64 -mt-64 blur-[120px]" />
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <h2 className="text-4xl lg:text-6xl font-black mb-8 leading-tight">Un premier échange, gratuit et sans engagement.</h2>
          <p className="text-xl text-white/90 mb-6 leading-relaxed">
            Parlez-nous de votre situation. Nous vous dirons honnêtement si nous pouvons vous aider, et comment.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-white/70 mb-12">
            <span className="flex items-center gap-2"><MapPin size={16} /> Déplacements Lyon, Ain, Isère</span>
            <span className="flex items-center gap-2"><Users size={16} /> Aussi en visio</span>
          </div>
          <a href="#contact" onClick={(event) => handleSectionLinkClick(event, 'contact')} className="h-12 sm:h-14 md:h-16 px-4 sm:px-6 md:px-10 rounded-2xl bg-white text-blue-700 font-bold text-sm sm:text-base md:text-xl hover:shadow-2xl transition-all hover:scale-105 cursor-pointer inline-flex items-center justify-center">
            Prendre rendez-vous
          </a>
        </div>
      </div>
    </div>
  </section>
);

const ContactSection = ({ diagResult, contactMode }: { diagResult: DiagResult | null; contactMode: 'callback' | 'message' }) => {
  const [mode, setMode] = useState<'callback' | 'message'>(contactMode);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState('');

  useEffect(() => {
    setMode(contactMode);
  }, [contactMode]);

  useEffect(() => {
    if (diagResult) {
      const summary = [
        `Diagnostic Express — Score : ${diagResult.score}/100`,
        `Niveau : ${diagResult.level}`,
        `Axes : ${diagResult.axes.map(a => `${a.label} (${a.detail})`).join(' · ')}`,
        diagResult.points.length > 0 ? `Points d'attention : ${diagResult.points.map(p => p.label).join(' · ')}` : '',
        `Priorité : ${diagResult.priority}`,
        '',
        '---',
        '',
      ].filter(Boolean).join('\n');
      setFormData(prev => ({ ...prev, message: summary }));
      setMode('message');
    }
  }, [diagResult]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setSubmitError(null);

    const payload = {
      type: mode,
      name: formData.name,
      email: formData.email,
      ...(formData.phone ? { phone: formData.phone } : {}),
      ...(formData.company ? { company: formData.company } : {}),
      ...(formData.message ? { message: formData.message } : {}),
      ...(diagResult ? {
        diagnostic: {
          score: diagResult.score,
          level: diagResult.level,
          points: diagResult.points.map(p => p.label),
          priority: diagResult.priority,
        }
      } : {}),
      _honeypot: honeypot,
    };

    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const contentType = res.headers.get('content-type') || '';
      const result = contentType.includes('application/json')
        ? await res.json()
        : null;

      if (!res.ok || !result?.success) {
        throw new Error(
          result?.message ||
          (res.status === 404
            ? "Le service de contact n'est pas encore relié à un backend opérationnel. Appelez-nous au 04 82 53 26 99 ou écrivez à contact@aegisnetwork.fr."
            : 'Une erreur est survenue. Veuillez réessayer ou nous contacter directement.')
        );
      }

      setSubmitted(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error && err.message
          ? err.message
          : 'Une erreur est survenue. Veuillez réessayer ou nous contacter directement.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "w-full h-14 px-6 rounded-2xl border border-white/10 focus:border-optical-blue focus:ring-optical-blue bg-white/5 text-white placeholder:text-slate-600 transition-[border-color,box-shadow] duration-200 outline-none";

  return (
    <section id="contact" className="py-32 relative bg-background-deep overflow-hidden">
      <FiberBeams />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24">
          <div>
            <p className="text-optical-blue font-bold text-sm uppercase tracking-[0.3em] mb-6">Contact — Audit IT gratuit</p>
            <h2 className="text-5xl font-black text-white mb-10 leading-tight">Parlons de votre situation.</h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">Un diagnostic, un conseil, une question sur vos contrats ? Nous sommes disponibles pour en discuter.</p>

            {/* Diagnostic pre-fill banner */}
            {diagResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-4 p-5 rounded-2xl border border-blue-500/20 bg-blue-500/5 mb-8"
              >
                <Activity className="w-5 h-5 text-optical-blue shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-white mb-1">Diagnostic complété — Score : {diagResult.score}/100</p>
                  <p className="text-xs text-slate-400">{diagResult.level}. Le résumé a été ajouté à votre message.</p>
                </div>
              </motion.div>
            )}

            <div className="flex flex-wrap gap-3 mb-12">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-600/20 text-sm text-slate-300">
                <CheckCircle size={14} className="text-optical-blue" /> Premier échange gratuit
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-600/20 text-sm text-slate-300">
                <MapPin size={14} className="text-optical-blue" /> Lyon · Ain · Isère
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-600/20 text-sm text-slate-300">
                <Users size={14} className="text-optical-blue" /> Disponible en visio
              </span>
            </div>
            <div className="space-y-8">
              {[
                { icon: <PhoneCall />, label: "Ligne directe", value: "04 82 53 26 99", href: "tel:+33482532699" },
                { icon: <Mail />, label: "Email", value: "contact@aegisnetwork.fr", href: "mailto:contact@aegisnetwork.fr" },
                { icon: <MapPin />, label: "Centre Opérationnel", value: "Lyon, France", href: undefined }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-blue-600/20 flex items-center justify-center text-optical-blue border border-blue-600/20 shadow-lg group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-lg sm:text-xl font-bold text-white hover:text-optical-blue transition-colors break-all">{item.value}</a>
                    ) : (
                      <p className="text-lg sm:text-xl font-bold text-white">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-card px-6 pt-8 pb-6 sm:px-10 sm:pt-10 md:px-14 md:pt-14 md:pb-8 rounded-[2rem] sm:rounded-[3rem] border-white/10 shadow-2xl relative lg:self-start">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent-violet/10 blur-[60px]" />

            {/* Mode tabs */}
            <div className="flex gap-2 mb-8 relative z-10">
              <button
                type="button"
                onClick={() => setMode('callback')}
                className={`flex-1 flex items-center justify-center gap-2 h-12 rounded-xl font-bold text-sm transition-colors cursor-pointer ${
                  mode === 'callback'
                    ? 'bg-blue-600/20 border border-blue-600/30 text-optical-blue'
                    : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                <PhoneCall size={16} />
                <span className="hidden sm:inline">Être rappelé</span>
                <span className="sm:hidden">Rappel</span>
              </button>
              <button
                type="button"
                onClick={() => setMode('message')}
                className={`flex-1 flex items-center justify-center gap-2 h-12 rounded-xl font-bold text-sm transition-colors cursor-pointer ${
                  mode === 'message'
                    ? 'bg-blue-600/20 border border-blue-600/30 text-optical-blue'
                    : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                <Mail size={16} />
                <span className="hidden sm:inline">Nous contacter</span>
                <span className="sm:hidden">Message</span>
              </button>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12 relative z-10"
              >
                <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
                <h3 className="text-2xl font-black text-white mb-3">Demande envoyée</h3>
                <p className="text-slate-400">Nous vous répondons sous 24 heures.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                {/* Honeypot anti-spam — invisible pour les humains */}
                <div className="absolute opacity-0 -z-10 h-0 overflow-hidden" aria-hidden="true">
                  <input type="text" name="website" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" />
                </div>
                <AnimatePresence mode="wait">
                  {mode === 'callback' ? (
                    <motion.div
                      key="callback"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      <div className="relative">
                        {diagResult && !submitted && (
                          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="absolute -left-20 sm:-left-[5.5rem] top-[68%] -translate-y-1/2 z-20 hidden md:block">
                            <motion.div animate={{ x: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
                              <svg width="36" height="28" viewBox="0 0 36 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><filter id="gf" x="-30%" y="-50%" width="160%" height="200%"><feGaussianBlur stdDeviation="2" result="b"/><feColorMatrix in="b" type="matrix" values="1 0 0 0 0 0 .18 0 0 0 0 0 0 0 0 0 0 0 .7 0" result="g"/><feMerge><feMergeNode in="g"/><feMergeNode in="SourceGraphic"/></feMerge></filter><linearGradient id="ag1" x1="2" y1="14" x2="34" y2="14" gradientUnits="userSpaceOnUse"><stop stopColor="#FF5A5A"/><stop offset="1" stopColor="#FF2D2D"/></linearGradient></defs><g filter="url(#gf)"><path d="M2 7a3 3 0 0 1 3-3h14V1.5a2 2 0 0 1 3.1-1.67l12.5 11.5a2 2 0 0 1 0 3.34l-12.5 11.5A2 2 0 0 1 19 24.5V22H5a3 3 0 0 1-3-3V7Z" fill="url(#ag1)"/><path d="M6 14h11" stroke="white" strokeOpacity=".4" strokeWidth="2" strokeLinecap="round"><animate attributeName="stroke-opacity" values=".2;.5;.2" dur="1.6s" repeatCount="indefinite"/></path></g></svg>
                            </motion.div>
                          </motion.div>
                        )}
                        <div className="space-y-3">
                          <label className="text-sm font-bold text-slate-300 uppercase tracking-widest ml-1">Téléphone</label>
                          <input name="phone" value={formData.phone} onChange={handleChange} required className={inputClass} placeholder="06 12 34 56 78" type="tel" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-bold text-slate-300 uppercase tracking-widest ml-1">Email</label>
                        <input name="email" value={formData.email} onChange={handleChange} required className={inputClass} placeholder="jean@entreprise.fr" type="email" />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="message"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      <div className="relative">
                        {diagResult && !submitted && (
                          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="absolute -left-20 sm:-left-[5.5rem] top-[68%] -translate-y-1/2 z-20 hidden md:block">
                            <motion.div animate={{ x: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
                              <svg width="36" height="28" viewBox="0 0 36 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><filter id="gf" x="-30%" y="-50%" width="160%" height="200%"><feGaussianBlur stdDeviation="2" result="b"/><feColorMatrix in="b" type="matrix" values="1 0 0 0 0 0 .18 0 0 0 0 0 0 0 0 0 0 0 .7 0" result="g"/><feMerge><feMergeNode in="g"/><feMergeNode in="SourceGraphic"/></feMerge></filter><linearGradient id="ag1" x1="2" y1="14" x2="34" y2="14" gradientUnits="userSpaceOnUse"><stop stopColor="#FF5A5A"/><stop offset="1" stopColor="#FF2D2D"/></linearGradient></defs><g filter="url(#gf)"><path d="M2 7a3 3 0 0 1 3-3h14V1.5a2 2 0 0 1 3.1-1.67l12.5 11.5a2 2 0 0 1 0 3.34l-12.5 11.5A2 2 0 0 1 19 24.5V22H5a3 3 0 0 1-3-3V7Z" fill="url(#ag1)"/><path d="M6 14h11" stroke="white" strokeOpacity=".4" strokeWidth="2" strokeLinecap="round"><animate attributeName="stroke-opacity" values=".2;.5;.2" dur="1.6s" repeatCount="indefinite"/></path></g></svg>
                            </motion.div>
                          </motion.div>
                        )}
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <label className="text-sm font-bold text-slate-300 uppercase tracking-widest ml-1">Nom Complet</label>
                            <input name="name" value={formData.name} onChange={handleChange} required className={inputClass} placeholder="Jean Dupont" type="text" />
                          </div>
                          <div className="space-y-3">
                            <label className="text-sm font-bold text-slate-300 uppercase tracking-widest ml-1">Entreprise</label>
                            <input name="company" value={formData.company} onChange={handleChange} className={inputClass} placeholder="Nom de votre société" type="text" />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-bold text-slate-300 uppercase tracking-widest ml-1">Email Professionnel</label>
                        <input name="email" value={formData.email} onChange={handleChange} required className={inputClass} placeholder="jean@entreprise.fr" type="email" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-bold text-slate-300 uppercase tracking-widest ml-1">Message</label>
                        <textarea name="message" value={formData.message} onChange={handleChange} className="w-full px-6 py-4 rounded-2xl border border-white/10 focus:border-optical-blue focus:ring-optical-blue bg-white/5 text-white placeholder:text-slate-600 transition-[border-color,box-shadow] duration-200 outline-none" placeholder="Décrivez votre besoin (audit, conseil, optimisation...)" rows={4}></textarea>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="relative">
                  {diagResult && !submitted && (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.7 }} className="absolute -left-20 sm:-left-[5.5rem] top-1/2 -translate-y-1/2 z-20 hidden md:block">
                      <motion.div animate={{ x: [0, 6, 0] }} transition={{ duration: 1.6, delay: 0.3, repeat: Infinity, ease: 'easeInOut' }}>
                        <svg width="36" height="28" viewBox="0 0 36 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><filter id="gf2" x="-30%" y="-50%" width="160%" height="200%"><feGaussianBlur stdDeviation="2" result="b"/><feColorMatrix in="b" type="matrix" values="1 0 0 0 0 0 .18 0 0 0 0 0 0 0 0 0 0 0 .7 0" result="g"/><feMerge><feMergeNode in="g"/><feMergeNode in="SourceGraphic"/></feMerge></filter><linearGradient id="ag2" x1="2" y1="14" x2="34" y2="14" gradientUnits="userSpaceOnUse"><stop stopColor="#FF5A5A"/><stop offset="1" stopColor="#FF2D2D"/></linearGradient></defs><g filter="url(#gf2)"><path d="M2 7a3 3 0 0 1 3-3h14V1.5a2 2 0 0 1 3.1-1.67l12.5 11.5a2 2 0 0 1 0 3.34l-12.5 11.5A2 2 0 0 1 19 24.5V22H5a3 3 0 0 1-3-3V7Z" fill="url(#ag2)"/><path d="M6 14h11" stroke="white" strokeOpacity=".4" strokeWidth="2" strokeLinecap="round"><animate attributeName="stroke-opacity" values=".2;.5;.2" dur="1.6s" repeatCount="indefinite"/></path></g></svg>
                      </motion.div>
                    </motion.div>
                  )}
                  <button type="submit" disabled={submitting} className="glow-button w-full h-14 sm:h-16 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-600 to-accent-violet text-white font-bold text-sm sm:text-xl uppercase tracking-wider sm:tracking-widest cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed">
                    {submitting ? 'Envoi en cours…' : (mode === 'callback' ? 'Demander un rappel' : 'Envoyer ma demande')}
                  </button>
                </div>
                {submitError && (
                  <p className="text-center text-sm text-red-400">{submitError}</p>
                )}
                <p className="text-center text-xs text-slate-400">Nous vous répondons sous 24 heures.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-background-deep py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <AegisLogo className="w-8 h-8" />
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-[0.06em] text-white leading-none" style={{ wordSpacing: '0.2em' }}>
                AEGIS <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">NETWORK</span>
              </span>
              <span className="text-[8px] uppercase tracking-[0.25em] text-slate-300 font-bold mt-0.5">Conseil & Optimisation IT</span>
            </div>
          </div>
          <div className="flex gap-8 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <a href="/mentions-legales/" className="hover:text-optical-blue transition-colors cursor-pointer">Mentions légales</a>
          </div>
          <p className="text-xs text-slate-400 font-medium">© 2026 Aegis Network.</p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [diagResult, setDiagResult] = useState<DiagResult | null>(null);
  const [contactMode, setContactMode] = useState<'callback' | 'message'>('callback');

  const handleDiagComplete = (result: DiagResult) => {
    setDiagResult(result);
  };

  const handleContactFromDiag = () => {
    setContactMode('callback');
    scrollToSection('contact');
  };

  return (
    <div className="min-h-screen bg-background-deep selection:bg-blue-600 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <GainBlock />
        <DiagnosticExpress onComplete={handleDiagComplete} onContact={handleContactFromDiag} />
        <CostControl />
        <TimeLoss />
        <RootCause />
        <WhyAegis />
        <ImpactCalculator />
        <EvolutionConseil />
        <FAQSection />
        <CTASection />
        <ContactSection diagResult={diagResult} contactMode={contactMode} />
      </main>
      <Footer />
    </div>
  );
}
