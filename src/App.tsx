import {
  Zap,
  ShieldCheck,
  Activity,
  Cpu,
  Clock,
  Network,
  PhoneCall,
  Mail,
  MapPin,
  ArrowRight,
  BarChart3,
  Layers,
  Globe,
  Settings2,
  X
} from 'lucide-react';
import { motion, useSpring, useTransform, useInView } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { AegisLogo } from './components/AegisLogo';

const CountUp = ({ value, suffix = "", prefix = "" }: { value: string, suffix?: string, prefix?: string }) => {
// ... (rest of CountUp remains same)
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState(0);

  // Extract number from string (e.g., "< 1ms" -> 1, "99.9%" -> 99.9)
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = numericValue;
      const duration = 2000;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out quad
        const easedProgress = 1 - (1 - progress) * (1 - progress);
        const current = easedProgress * end;

        setDisplayValue(current);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, numericValue]);

  return (
    <span ref={ref}>
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

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 bg-background-deep/80 backdrop-blur-md border-b border-white/5">
    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <AegisLogo className="w-9 h-9" />
        <div className="flex flex-col">
          <h1 className="text-lg font-black tracking-[0.15em] text-white leading-none">
            AEGIS <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">NETWORK</span>
          </h1>
          <span className="text-[8px] uppercase tracking-[0.25em] text-slate-500 font-bold mt-0.5">High-Performance Connectivity</span>
        </div>
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-400">
        <a href="#solutions" className="hover:text-optical-blue transition-colors py-1 border-b border-transparent hover:border-optical-blue/50">Nos Solutions</a>
        <a href="#telephonie" className="hover:text-optical-blue transition-colors py-1 border-b border-transparent hover:border-optical-blue/50">Téléphonie</a>
        <a href="#reseau" className="hover:text-optical-blue transition-colors py-1 border-b border-transparent hover:border-optical-blue/50">Infrastructure</a>
        <a href="#contact" className="hover:text-optical-blue transition-colors py-1 border-b border-transparent hover:border-optical-blue/50">Contact</a>
      </div>
      <a href="#contact" className="glow-button flex items-center justify-center rounded-lg h-10 px-6 bg-gradient-to-r from-blue-600 to-accent-violet text-white text-sm font-bold">
        Contactez-nous
      </a>
    </div>
  </nav>
);

const Hero = () => (
  <section className="relative pt-28 pb-24 lg:pt-36 lg:pb-40 overflow-hidden">
    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-violet/10 blur-[120px] rounded-full pointer-events-none" />

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
          Internet & Téléphonie Professionnelle
        </div>
        <h1 className="text-5xl lg:text-7xl font-black text-white leading-[1.05] mb-8">
          Optimisez votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-600 to-violet-500">Connectivité</span> simplement.
        </h1>
        <p className="text-lg text-slate-400 leading-relaxed max-w-xl mb-12">
          Nous simplifions vos infrastructures critiques. Profitez d'une connexion internet ultra-rapide et d'une téléphonie IP qui booste réellement votre productivité.
        </p>
        <div className="flex flex-wrap gap-5">
          <a href="#contact" className="glow-button h-14 px-8 rounded-xl bg-gradient-to-r from-blue-600 to-accent-violet text-white font-bold text-lg flex items-center justify-center gap-3">
            Demander un audit
            <Zap size={20} />
          </a>
          <a href="#solutions" className="h-14 px-8 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-lg flex items-center justify-center hover:bg-white/10 transition-all backdrop-blur-sm">
            Voir nos solutions
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
            src="https://images.unsplash.com/photo-1551703599-6b3e8379aa8c?auto=format&fit=crop&q=80&w=1200"
            alt="Fiber Optic Technology"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background-deep via-transparent to-transparent" />

          {/* Overlaying dynamic elements */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-64 h-64 border-2 border-optical-blue/30 rounded-full blur-sm"
            />
            <motion.div
              animate={{
                rotate: 360
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute w-80 h-80 border border-dashed border-white/10 rounded-full"
            />
          </div>
        </div>
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-blue-600/30 rounded-full blur-[100px] animate-pulse-slow" />
      </motion.div>
    </div>
  </section>
);

const Stats = () => (
  <section className="py-12 relative z-20">
    <FiberBeams />
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: <Globe size={48} />, label: "Navigation Web", value: "2", prefix: "Jusqu'à ", suffix: "x plus rapide", sub: "Vitesse optimisée", color: "text-optical-blue" },
          { icon: <PhoneCall size={48} />, label: "Appels perdus", value: "50", prefix: "Réduction jusqu'à ", suffix: "%", sub: "Gestion intelligente", color: "text-accent-violet" },
          { icon: <Zap size={48} />, label: "Efficacité globale", value: "2", prefix: "Jusqu'à ", suffix: "x plus productif", sub: "Performance accrue", color: "text-blue-600" }
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="glass-card p-10 rounded-3xl flex flex-col gap-3 group hover:border-optical-blue/40 transition-all relative overflow-hidden"
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
        <h2 className="text-optical-blue font-bold text-sm uppercase tracking-[0.3em] mb-4">Nos Solutions Concrètes</h2>
        <h3 className="text-4xl lg:text-5xl font-black text-white mb-6">Deux piliers pour votre entreprise.</h3>
        <p className="text-slate-400 text-lg">Nous avons simplifié notre offre pour répondre directement à vos besoins de performance et de communication.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Solution 1: Internet */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-card p-12 rounded-[3rem] border-white/5 hover:border-blue-500/30 transition-all group"
        >
          <div className="w-16 h-16 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
            <Globe size={32} />
          </div>
          <h4 className="text-3xl font-black text-white mb-6">Internet & Réseau</h4>
          <p className="text-slate-400 text-lg leading-relaxed mb-8">
            Une connexion stable et ultra-rapide. Nous optimisons vos configurations réseau pour garantir un débit maximal et une latence minimale.
          </p>
          <ul className="space-y-4 mb-10">
            {[
              "Audit et optimisation de configuration",
              "Connexion fibre haute disponibilité",
              "Sécurisation des flux de données",
              "Support technique ultra-réactif"
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
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-card p-12 rounded-[3rem] border-white/5 hover:border-violet-500/30 transition-all group"
        >
          <div className="w-16 h-16 rounded-2xl bg-violet-600/20 text-violet-400 flex items-center justify-center mb-8 group-hover:bg-violet-600 group-hover:text-white transition-all duration-500">
            <PhoneCall size={32} />
          </div>
          <h4 className="text-3xl font-black text-white mb-6">Téléphonie IP (VoIP)</h4>
          <p className="text-slate-400 text-lg leading-relaxed mb-8">
            Ne perdez plus aucun appel. Nous transformons votre téléphonie en un outil de productivité simple, fiable et intelligent.
          </p>
          <ul className="space-y-4 mb-10">
            {[
              "Réduction des appels perdus (> 50%)",
              "Redirection intelligente des appels",
              "Qualité audio HD sans coupure",
              "Interface de gestion simplifiée"
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
        src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200"
        alt="Network background"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background-deep via-background-deep/60 to-transparent" />
    </div>
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="grid lg:grid-cols-2 gap-24 items-center">
        <div>
          <h2 className="text-violet-400 font-bold text-sm uppercase tracking-[0.3em] mb-6">Téléphonie IP Optimisée</h2>
          <h3 className="text-5xl lg:text-6xl font-black mb-10 leading-[1.1] text-white">
            Ne perdez plus <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-500">aucun appel.</span>
          </h3>
          <div className="space-y-10">
            {[
              { icon: <PhoneCall />, title: "Réduction des appels perdus", desc: "Éliminez plus de 50% des appels manqués grâce à une gestion intelligente des flux entrants." },
              { icon: <Activity />, title: "Gestion 2x plus pertinente", desc: "Redirigez vos clients vers le bon interlocuteur instantanément, sans attente inutile." },
              { icon: <ShieldCheck />, title: "Fiabilité Totale", desc: "Une qualité sonore HD garantie, même en cas de forte charge réseau." }
            ].map((item, i) => (
              <div key={i} className="flex gap-6 group">
                <div className="shrink-0 w-12 h-12 rounded-2xl bg-violet-600/30 flex items-center justify-center text-violet-400 border border-violet-600/40 group-hover:bg-violet-600 group-hover:text-white transition-all duration-500">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2 text-white">{item.title}</h4>
                  <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-14 flex flex-wrap gap-5">
            <a href="#contact" className="glow-button h-14 px-8 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white font-bold flex items-center justify-center transition-all">
              Optimiser ma téléphonie
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="glass-card rounded-[3rem] p-6 shadow-2xl border-white/10 premium-glow">
            {/* IMAGE: VoIP Section Feature - Professional using digital tools */}
            <img
              className="rounded-[2rem] w-full h-auto"
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800"
              alt="Digital professional"
              referrerPolicy="no-referrer"
            />
          </div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -bottom-10 -left-10 glass-card rounded-[2rem] p-8 shadow-2xl text-white border-white/20 premium-glow"
          >
            <p className="text-xs font-bold text-optical-blue uppercase tracking-widest mb-2">Efficiency Boost</p>
            <p className="text-4xl font-black">
              <CountUp value="25" prefix="+" suffix="%" />
            </p>
            <p className="text-sm text-slate-400 mt-1">Taux de résolution</p>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
);

const InfrastructureSection = () => (
  <section id="reseau" className="py-32 relative bg-background-deep">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="lg:w-1/2 order-2 lg:order-1">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="relative rounded-3xl overflow-hidden group">
                {/* IMAGE: Infrastructure Section - Modern Server Room/Data Center */}
                <img
                  className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                  src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=600"
                  alt="Modern Server Room"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-blue-600/20 mix-blend-overlay" />
              </div>
              <div className="glass-card p-8 rounded-3xl border-blue-600/20 hover:border-optical-blue/40 transition-all">
                <Network className="text-optical-blue mb-4" size={32} />
                <p className="font-bold text-white text-lg">Fibre Optique Dédiée</p>
                <p className="text-sm text-slate-400 mt-2">Débit symétrique garanti par transport photonique.</p>
              </div>
            </div>
            <div className="space-y-6 pt-16">
              <div className="glass-card p-8 rounded-3xl border-accent-violet/20 hover:border-accent-violet/40 transition-all">
                <Globe className="text-accent-violet mb-4" size={32} />
                <p className="font-bold text-white text-lg">SD-WAN Intelligent</p>
                <p className="text-sm text-slate-400 mt-2">Distribution dynamique des flux pour une agilité totale.</p>
              </div>
              <div className="relative rounded-3xl overflow-hidden group">
                {/* IMAGE: Infrastructure Section - Global Connectivity/Satellite */}
                <img
                  className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600"
                  alt="Satellite"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-accent-violet/20 mix-blend-overlay" />
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 order-1 lg:order-2">
          <h2 className="text-optical-blue font-bold text-sm uppercase tracking-[0.3em] mb-6">Infrastructure Haute-Vitesse</h2>
          <h3 className="text-5xl font-black text-white mb-8 leading-tight">Le moteur photonique de votre entreprise.</h3>
          <p className="text-slate-400 text-lg mb-10 leading-relaxed">
            Nous déployons des solutions de connectivité de pointe, basées sur l'Ethernet ultra-performant et l'optique transportée, assurant une vélocité sans compromis pour vos données critiques.
          </p>
          <ul className="space-y-6 mb-12">
            {[
              "Surveillance proactive des flux 24/7",
              "Temps de réponse garanti par SLA",
              "Experts réseau locaux disponibles en flux tendu"
            ].map((text, i) => (
              <li key={i} className="flex items-center gap-4 font-semibold text-slate-300 group">
                <Zap className="text-optical-blue group-hover:scale-125 transition-transform" size={20} />
                {text}
              </li>
            ))}
          </ul>
          <a href="#contact" className="glow-button inline-flex h-14 px-10 rounded-xl bg-blue-600 text-white font-bold items-center justify-center hover:bg-blue-700 transition-all">
            Contactez-nous
          </a>
        </div>
      </div>
    </div>
  </section>
);

const CTASection = () => (
  <section className="py-32 relative">
    <div className="max-w-7xl mx-auto px-6">
      <div className="bg-gradient-to-br from-blue-600/80 via-blue-700 to-accent-violet rounded-[3rem] p-12 lg:p-24 text-white flex flex-col lg:flex-row items-center gap-16 relative overflow-hidden premium-glow">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full -mr-64 -mt-64 blur-[120px]" />
        <div className="relative z-10 lg:w-3/5">
          <h3 className="text-4xl lg:text-6xl font-black mb-8 leading-tight">Accélérez votre transformation.</h3>
          <p className="text-xl text-white/90 mb-12 leading-relaxed">
            Bénéficiez d'un audit de performance complet. Nos experts cartographient vos flux actuels pour identifier chaque milliseconde d'optimisation possible.
          </p>
          <button className="h-16 px-10 rounded-2xl bg-white text-blue-700 font-bold text-xl hover:shadow-2xl transition-all hover:scale-105">
            Demander mon audit de flux
          </button>
        </div>
        <div className="relative z-10 lg:w-2/5 grid grid-cols-2 gap-6">
          <div className="bg-white/10 backdrop-blur-xl p-8 rounded-[2rem] border border-white/20">
            <p className="text-4xl font-black mb-2 text-optical-blue">
              <CountUp value="0" />
            </p>
            <p className="text-xs uppercase font-bold text-white/70 tracking-widest leading-relaxed">Latence résiduelle constatée</p>
          </div>
          <div className="bg-white/10 backdrop-blur-xl p-8 rounded-[2rem] border border-white/20">
            <p className="text-4xl font-black mb-2 text-optical-blue">
              <CountUp value="15" suffix="min" />
            </p>
            <p className="text-xs uppercase font-bold text-white/70 tracking-widest leading-relaxed">Réponse aux flux critiques</p>
          </div>
          <div className="bg-white/10 backdrop-blur-xl p-8 rounded-[2rem] border border-white/20 col-span-2">
            <p className="text-lg font-bold mb-4">Indicateur de Performance Flux</p>
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
          <h3 className="text-5xl font-black text-white mb-10 leading-tight">Connectez-vous à l'excellence.</h3>
          <p className="text-slate-400 text-lg mb-12 leading-relaxed">Besoin d'une étude d'optimisation ou d'un conseil en architecture de flux ? Nos ingénieurs sont à votre écoute.</p>
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
              <textarea className="w-full px-6 py-4 rounded-2xl border border-white/10 focus:border-optical-blue focus:ring-optical-blue bg-white/5 text-white placeholder:text-slate-600 transition-all outline-none" placeholder="Décrivez vos besoins de performance..." rows={4}></textarea>
            </div>
            <button type="button" className="glow-button w-full h-16 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-600 to-accent-violet text-white font-bold text-xl uppercase tracking-widest">
              Envoyer ma demande
            </button>
            <p className="text-center text-xs text-slate-500">Transmis via canal sécurisé haute priorité.</p>
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
            <p>Aegis Network</p>
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
                <span className="text-[8px] uppercase tracking-[0.25em] text-slate-500 font-bold mt-0.5">High-Performance Connectivity</span>
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
    <div className="min-h-screen bg-background-deep selection:bg-blue-600 selection:text-white scroll-smooth">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Solutions />
        <VoIPSection />
        <InfrastructureSection />
        <CTASection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
