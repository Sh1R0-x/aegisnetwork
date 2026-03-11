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
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { AegisLogo } from './components/AegisLogo';

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
  { id: 'gains', label: 'Vos gains' },
  { id: 'enjeux', label: 'Vos enjeux' },
  { id: 'approche', label: 'Notre approche' },
  { id: 'simulateur', label: 'Simulateur' },
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
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
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
          Reprenez le contrôle <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-600 to-violet-500">de votre IT.</span>
        </h1>
        <p className="text-lg text-slate-400 leading-relaxed max-w-xl mb-12">
          Contrats opaques, prestataires jamais challengés, temps perdu en gestion d'incidents… Aegis Network vous aide à y voir clair, réduire vos coûts et vous recentrer sur votre activité.
        </p>
        <div className="flex flex-wrap gap-5">
          <button onClick={() => scrollToSection('contact')} className="glow-button h-14 px-8 rounded-xl bg-gradient-to-r from-blue-600 to-accent-violet text-white font-bold text-lg flex items-center justify-center gap-3 cursor-pointer">
            Demander un diagnostic gratuit
            <Zap size={20} />
          </button>
          <button onClick={() => scrollToSection('enjeux')} className="h-14 px-8 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-lg flex items-center justify-center hover:bg-white/10 transition-all backdrop-blur-sm cursor-pointer">
            Comprendre nos axes
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative animate-float"
      >
        <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 premium-glow bg-slate-900">
          <img
            className="w-full h-[550px] object-cover opacity-80"
            src="/img/photo-1551703599-6b3e8379aa8c.jfif"
            alt="Infrastructure réseau"
            fetchPriority="high"
            width={800}
            height={550}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background-deep via-transparent to-transparent" />

          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ duration: 6, repeat: Infinity }}
              className="w-64 h-64 border-2 border-optical-blue/30 rounded-full blur-sm"
            />

          </div>
        </div>
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-blue-600/30 rounded-full blur-[100px] animate-pulse-slow" />


      </motion.div>
    </div>
  </section>
);

const GainBlock = () => (
  <section id="gains" className="py-24 relative overflow-hidden">
    <FiberBeams />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-600/[0.04] blur-[150px] rounded-full pointer-events-none" />
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <h2 className="text-optical-blue font-bold text-sm uppercase tracking-[0.3em] mb-4">Résultats concrets</h2>
        <h3 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
          Ce que vous allez{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">y gagner.</span>
        </h3>
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
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto mb-20"
      >
        <h2 className="text-optical-blue font-bold text-sm uppercase tracking-[0.3em] mb-4">Vos enjeux</h2>
        <h3 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
          Vos contrats IT méritent un{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">regard neuf.</span>
        </h3>
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
            initial={{ opacity: 0, y: 25, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: i * 0.12, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
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
        src="/img/photo-1550751827-4bd374c3f58b.jfif"
        alt="Réseau de données"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background-deep via-background-deep/60 to-transparent" />
    </div>
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="grid lg:grid-cols-2 gap-24 items-center">
        <div>
          <h2 className="text-accent-violet font-bold text-sm uppercase tracking-[0.3em] mb-6">Temps perdu</h2>
          <h3 className="text-5xl lg:text-6xl font-black mb-10 leading-[1.1] text-white">
            Le temps passé à gérer vos prestataires{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-500">a un coût.</span>
          </h3>
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
                  <h4 className="text-xl font-bold mb-2 text-white">{item.title}</h4>
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
  <section className="py-32 relative bg-background-deep">
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
          <h2 className="text-optical-blue font-bold text-sm uppercase tracking-[0.3em] mb-6">Le vrai problème</h2>
          <h3 className="text-5xl font-black text-white mb-8 leading-tight">On colmate. Rarement on diagnostique.</h3>
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
        <h2 className="text-optical-blue font-bold text-sm uppercase tracking-[0.3em] mb-4">Notre approche</h2>
        <h3 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
          Un consultant indépendant.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">Pas un revendeur.</span>
        </h3>
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
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
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
    <section id="simulateur" className="py-32 relative bg-background-deep">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-optical-blue font-bold text-sm uppercase tracking-[0.3em] mb-4">Simulateur</h2>
          <h3 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
            Estimez vos gains{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">concrets.</span>
          </h3>
          <p className="text-slate-400 text-lg leading-relaxed">
            Ajustez les curseurs selon votre situation. Les résultats sont des estimations, pas des promesses.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Inputs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-8 border-white/10"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-blue-600/15 flex items-center justify-center">
                <BarChart3 size={18} className="text-optical-blue" />
              </div>
              <h4 className="font-bold text-white">Vos paramètres</h4>
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
            initial={{ opacity: 0, y: 20 }}
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
              <h4 className="font-bold text-white">Résultats estimés</h4>
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
  <section className="py-32 relative bg-background-deep">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        <div>
          <h2 className="text-optical-blue font-bold text-sm uppercase tracking-[0.3em] mb-6">Accompagnement durable</h2>
          <h3 className="text-5xl font-black text-white mb-8 leading-tight">Un accompagnement qui évolue avec votre activité.</h3>
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
                  <h4 className="text-xl font-bold mb-2 text-white">{item.title}</h4>
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
          className="relative"
        >
          <div className="glass-card rounded-[3rem] p-6 shadow-2xl border-white/10 premium-glow">
            <img
              className="rounded-[2rem] w-full h-auto"
              src="/img/photo-1516321318423-f06f85e504b3.jfif"
              alt="Accompagnement professionnel"
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const DiagnosticQuestions = () => {
  const questions = [
    "Savez-vous exactement ce que vous payez chaque mois en IT et télécom ?",
    "Avez-vous comparé vos contrats avec les offres actuelles du marché ?",
    "Avez-vous un interlocuteur unique pour tout ce qui touche à votre infrastructure ?",
    "Connaissez-vous la date de fin de chacun de vos engagements ?",
    "En cas de panne, savez-vous qui appeler et quoi exiger ?",
    "Avez-vous déjà estimé le temps que votre équipe passe à gérer des problèmes IT ?"
  ];

  return (
    <section id="diagnostic" className="py-32 relative overflow-hidden">
      <FiberBeams />
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-optical-blue font-bold text-sm uppercase tracking-[0.3em] mb-4">Auto-diagnostic</h2>
          <h3 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
            Ces questions vous{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">parlent ?</span>
          </h3>
          <p className="text-slate-400 text-lg leading-relaxed">
            Prenez 30 secondes. Si vous répondez « non » à au moins deux de ces questions, un diagnostic pourrait vous faire gagner du temps, et de l'argent.
          </p>
        </motion.div>

        <div className="space-y-4 mb-12">
          {questions.map((q, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-6 border-white/5 hover:border-optical-blue/20 transition-all flex items-start gap-4"
            >
              <div className="shrink-0 w-8 h-8 rounded-lg bg-blue-600/15 flex items-center justify-center text-optical-blue text-sm font-bold">
                {i + 1}
              </div>
              <p className="text-slate-300 font-medium leading-relaxed">{q}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-slate-400 mb-8">Deux « non » ou plus ? Parlons-en.</p>
          <button
            onClick={() => scrollToSection('contact')}
            className="glow-button h-14 px-10 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold inline-flex items-center justify-center transition-all cursor-pointer"
          >
            Demander un diagnostic gratuit
          </button>
        </motion.div>
      </div>
    </section>
  );
};

const CTASection = () => (
  <section className="py-32 relative">
    <div className="max-w-7xl mx-auto px-6">
      <div className="bg-gradient-to-br from-blue-600/80 via-blue-700 to-accent-violet rounded-[3rem] p-12 lg:p-24 text-white relative overflow-hidden premium-glow">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full -mr-64 -mt-64 blur-[120px]" />
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <h3 className="text-4xl lg:text-6xl font-black mb-8 leading-tight">Un premier échange, gratuit et sans engagement.</h3>
          <p className="text-xl text-white/90 mb-6 leading-relaxed">
            Parlez-nous de votre situation. Nous vous dirons honnêtement si nous pouvons vous aider, et comment.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-white/70 mb-12">
            <span className="flex items-center gap-2"><MapPin size={16} /> Déplacements Lyon, Ain, Isère</span>
            <span className="flex items-center gap-2"><Users size={16} /> Aussi en visio</span>
          </div>
          <button onClick={() => scrollToSection('contact')} className="h-16 px-10 rounded-2xl bg-white text-blue-700 font-bold text-xl hover:shadow-2xl transition-all hover:scale-105 cursor-pointer">
            Prendre rendez-vous
          </button>
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
          <h3 className="text-5xl font-black text-white mb-10 leading-tight">Parlons de votre situation.</h3>
          <p className="text-slate-400 text-lg mb-8 leading-relaxed">Un diagnostic, un conseil, une question sur vos contrats ? Nous sommes disponibles pour en discuter.</p>
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
            <p>Aegis Network. Conseil et optimisation en infrastructures IT et télécommunications</p>
            <p>Contact : <a href="mailto:contact@aegisnetwork.fr" className="text-optical-blue hover:underline">contact@aegisnetwork.fr</a></p>
            <p>Téléphone : <a href="tel:+33781438123" className="text-optical-blue hover:underline">07 81 43 81 23</a></p>
            <p>Centre opérationnel : Lyon, France</p>
            <p className="mt-2 text-yellow-500/80 text-xs">TODO: compléter : forme juridique, SIRET/RCS, capital social, nom du directeur de publication</p>
          </div>

          <div>
            <h3 className="text-white font-bold mb-2">Hébergement</h3>
            <p>OVHcloud, 2 rue Kellermann, 59100 Roubaix, France</p>
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
        <GainBlock />
        <CostControl />
        <TimeLoss />
        <RootCause />
        <WhyAegis />
        <ImpactCalculator />
        <EvolutionConseil />
        <DiagnosticQuestions />
        <CTASection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
