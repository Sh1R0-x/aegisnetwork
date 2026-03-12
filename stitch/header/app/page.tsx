'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { TrendingDown, Zap, ShieldCheck, ArrowRight, Activity } from 'lucide-react';

export default function Home() {
  // Animation variants
  const containerVariants: import('motion/react').Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: import('motion/react').Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const floatVariants: import('motion/react').Variants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const floatVariantsDelayed: import('motion/react').Variants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 4.5,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: 1,
      },
    },
  };

  const floatVariantsMoreDelayed: import('motion/react').Variants = {
    animate: {
      y: [0, -8, 0],
      transition: {
        duration: 3.5,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: 2,
      },
    },
  };

  return (
    <main className="min-h-screen bg-[#0f1923] text-slate-100 font-sans overflow-hidden flex flex-col justify-center relative">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Navbar placeholder - simple integration */}
      <header className="absolute top-0 w-full z-50 border-b border-white/5 bg-[#0f1923]/80 backdrop-blur-md px-6 lg:px-20 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-blue-500 w-8 h-8 flex items-center justify-center">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z" fill="currentColor"></path>
              </svg>
            </div>
            <h2 className="text-xl font-black tracking-tight uppercase">AEGIS NETWORK</h2>
          </div>
          <nav className="hidden md:flex items-center gap-10">
            <a className="text-sm font-medium text-slate-300 hover:text-blue-500 transition-colors" href="#">Expertise</a>
            <a className="text-sm font-medium text-slate-300 hover:text-blue-500 transition-colors" href="#">Solutions</a>
            <a className="text-sm font-medium text-slate-300 hover:text-blue-500 transition-colors" href="#">Audit</a>
            <a className="text-sm font-medium text-slate-300 hover:text-blue-500 transition-colors" href="#">Contact</a>
          </nav>
          <div className="hidden md:flex items-center gap-4">
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-all">
              Démarrer un Audit
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-20 py-32 w-full grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Content */}
        <motion.div 
          className="flex flex-col gap-8 max-w-2xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Tag */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Performance Opérationnelle
          </motion.div>

          {/* Title & Subtitle */}
          <div className="space-y-6">
            <motion.h1 variants={itemVariants} className="text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight text-white">
              Reprenez le <span className="text-blue-500 italic">contrôle</span> de votre infrastructure IT.
            </motion.h1>
            <motion.p variants={itemVariants} className="text-lg lg:text-xl text-slate-400 max-w-xl leading-relaxed">
              Optimisez votre réseau avec une maîtrise opérationnelle sans précédent. Réduisez vos coûts et boostez votre efficacité stratégique.
            </motion.p>
          </div>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-lg text-base font-bold transition-all shadow-lg shadow-blue-600/20">
              <span>Démarrer un Audit</span>
              <Activity className="w-5 h-5" />
            </button>
            <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-lg text-base font-bold transition-all backdrop-blur-sm">
              <span>Voir nos Solutions</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>

          {/* Social Proof */}
          <motion.div variants={itemVariants} className="pt-12 flex items-center gap-8 group">
            <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-slate-500 border-r border-white/10 pr-8">
              Trusted by
            </div>
            <div className="flex items-center gap-8 opacity-50 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0">
              {/* Placeholder logos using simple shapes/text for now */}
              <div className="flex items-center gap-2 text-slate-300 font-bold text-xl tracking-tighter">
                <div className="w-6 h-6 rounded-full bg-slate-300" /> ACME Corp
              </div>
              <div className="flex items-center gap-2 text-slate-300 font-bold text-xl tracking-tighter">
                <div className="w-6 h-6 rotate-45 bg-slate-300" /> GLOBEX
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Content - Visual & KPIs */}
        <div className="relative hidden lg:block h-[600px] w-full">
          {/* Main Image Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="absolute inset-0 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
          >
            <Image
              src="https://picsum.photos/seed/datacenter/800/600?blur=2"
              alt="Data Center Infrastructure"
              fill
              className="object-cover mix-blend-luminosity opacity-60"
              referrerPolicy="no-referrer"
            />
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0f1923]/90 via-[#0f1923]/40 to-blue-600/20" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0f1923_100%)] opacity-80" />
          </motion.div>

          {/* KPI Card 1: Costs */}
          <motion.div 
            variants={floatVariants}
            animate="animate"
            className="absolute top-12 -left-12 bg-slate-900/60 backdrop-blur-md border border-white/10 p-6 rounded-xl shadow-2xl flex flex-col gap-1 w-52 z-30"
          >
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-4 h-4 text-orange-500" />
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Coûts IT</span>
            </div>
            <span className="text-4xl font-black text-white">-30%</span>
            <div className="w-full bg-white/5 h-1.5 rounded-full mt-3 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "30%" }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                className="bg-orange-500 h-full rounded-full" 
              />
            </div>
          </motion.div>

          {/* KPI Card 2: Efficiency */}
          <motion.div 
            variants={floatVariantsDelayed}
            animate="animate"
            className="absolute bottom-24 -right-8 bg-slate-900/60 backdrop-blur-md border border-white/10 p-6 rounded-xl shadow-2xl flex flex-col gap-1 w-56 z-30"
          >
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-emerald-500" />
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Efficacité</span>
            </div>
            <span className="text-4xl font-black text-white">+45%</span>
            <div className="w-full bg-white/5 h-1.5 rounded-full mt-3 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "45%" }}
                transition={{ duration: 1.5, delay: 0.7, ease: "easeOut" }}
                className="bg-emerald-500 h-full rounded-full" 
              />
            </div>
          </motion.div>

          {/* KPI Card 3: Center Badge */}
          <motion.div 
            variants={floatVariantsMoreDelayed}
            animate="animate"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900/60 backdrop-blur-md border border-blue-500/30 p-4 rounded-xl shadow-2xl flex items-center gap-4 z-30 w-max"
          >
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 border border-blue-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-white leading-none">Audit Stratégique</div>
              <div className="text-[10px] text-slate-400 mt-1.5 uppercase tracking-widest font-semibold">Certifié Aegis</div>
            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
}
