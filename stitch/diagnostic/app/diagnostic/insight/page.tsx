'use client';

import { Lightbulb, ArrowRight, CheckCircle2, Lock } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'motion/react';

export default function InsightPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      <header className="flex items-center justify-between border-b border-white/5 bg-slate-950/80 backdrop-blur-md px-6 py-4 lg:px-12 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-bold tracking-widest uppercase text-slate-300">Aegis Network</h2>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center py-12 px-6 lg:px-20 w-full max-w-5xl mx-auto">
        <div className="w-full mb-8">
          <h1 className="text-2xl font-black tracking-tight text-white mb-1">Diagnostic Réseau Premium</h1>
          <p className="text-slate-400 text-sm font-medium">Phase 3 : Évaluation de la structure des coûts</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative w-full rounded-3xl border border-blue-500/20 bg-slate-900/80 backdrop-blur-xl shadow-[0_0_50px_-15px_rgba(37,99,235,0.2)] overflow-hidden mb-8"
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(37,99,235,0.03)_50%)] bg-[length:100%_4px] pointer-events-none" />
          
          <div className="grid lg:grid-cols-12 min-h-[360px]">
            <div className="lg:col-span-4 relative bg-slate-950 flex flex-col items-center justify-center p-8 border-r border-white/5 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.15),transparent_70%)]" />
              <motion.div 
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 size-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20 mb-6"
              >
                <Lightbulb className="h-8 w-8" />
              </motion.div>
              <div className="text-center relative z-10">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-2">MICRO-INSIGHT</p>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">ANALYSE CONTEXTUELLE</p>
              </div>
            </div>

            <div className="lg:col-span-8 p-8 lg:p-12 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-[0.2em] uppercase mb-6 w-fit">
                <span className="size-1.5 rounded-full bg-blue-500 animate-pulse" />
                STRATÉGIE & OPTIMISATION
              </div>
              
              <h2 className="text-2xl lg:text-3xl font-black leading-tight text-white tracking-tight mb-4 uppercase">
                SAVOIR CE QUE L&apos;ON PAIE N&apos;EST PAS SAVOIR CE QU&apos;IL FAUT CHALLENGER.
              </h2>
              
              <p className="text-slate-400 leading-relaxed text-base mb-8 max-w-xl font-medium">
                DISPARITÉ DE 14% DÉTECTÉE ENTRE FACTURATION ET USAGE RÉEL. PASSEZ À UNE VISION STRATÉGIQUE.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 mt-auto">
                <Link href="/diagnostic/result" className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-black uppercase tracking-wider text-white shadow-[0_0_20px_-5px_rgba(37,99,235,0.4)] hover:bg-blue-500 transition-all hover:scale-105">
                  Continuer l&apos;analyse
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <div className="p-5 rounded-2xl border border-white/5 bg-slate-900/50 flex items-center gap-4">
            <div className="size-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-0.5">Audit Infrastructure</h4>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Validé • 100%</p>
            </div>
          </div>
          <div className="p-5 rounded-2xl border border-white/5 bg-slate-900/30 flex items-center gap-4 opacity-60">
            <div className="size-10 rounded-xl bg-slate-800 text-slate-500 flex items-center justify-center border border-white/5">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-0.5">Sécurité des Données</h4>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">En attente • Phase 4</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
