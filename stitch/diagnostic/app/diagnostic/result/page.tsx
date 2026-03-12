'use client';

import { ShieldAlert, Activity, ShieldCheck, Zap, Download, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'motion/react';

export default function ResultPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      <header className="flex items-center justify-between border-b border-white/5 bg-slate-950/80 backdrop-blur-md px-6 py-4 lg:px-12 sticky top-0 z-50">
        <h2 className="text-sm font-bold tracking-widest uppercase text-slate-300">Aegis Network</h2>
      </header>

      <main className="flex-1 flex flex-col items-center py-12 px-6 lg:px-20 w-full max-w-5xl mx-auto">
        <div className="text-center space-y-3 mb-12">
          <p className="text-blue-500 font-black tracking-[0.3em] uppercase text-[10px]">RAPPORT DE DIAGNOSTIC</p>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase">VOTRE SCORE DE MAÎTRISE</h1>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-8 md:p-12 rounded-3xl shadow-2xl mb-8 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
            <div className="flex flex-col items-center md:items-start space-y-6 max-w-lg text-center md:text-left">
              <div className="px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em]">
                DIAGNOSTIC GLOBAL
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white leading-tight uppercase">
                BASE CORRECTE, MAIS <span className="text-blue-500">ENCORE FRAGILE</span>
              </h2>
              <p className="text-slate-400 text-base leading-relaxed font-medium uppercase">
                PILIERS SOLIDES, MAIS VULNÉRABILITÉS CRITIQUES À TRAITER IMMÉDIATEMENT.
              </p>
            </div>
            
            <div className="relative flex items-center justify-center shrink-0">
              <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl" />
              <div className="relative flex flex-col items-center justify-center w-56 h-56 rounded-full border-[3px] border-slate-800 bg-slate-950 shadow-[0_0_50px_rgba(37,99,235,0.15)]">
                <span className="text-7xl font-black text-white tracking-tighter">62</span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-2">Sur 100</span>
                <div className="absolute -bottom-3 bg-blue-600 px-4 py-1.5 rounded-full shadow-lg shadow-blue-600/30">
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">Indice AEGIS</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="w-full space-y-6 mb-8">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-500" />
              Diagnostic Détaillé
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'Sécurité', score: 78, icon: ShieldCheck, colorClass: 'text-emerald-500', bgClass: 'bg-emerald-500', desc: 'Protection périmétrique robuste' },
              { title: 'Performance', score: 54, icon: Zap, colorClass: 'text-amber-500', bgClass: 'bg-amber-500', desc: 'Latences identifiées sur le réseau' },
              { title: 'Résilience', score: 42, icon: ShieldAlert, colorClass: 'text-rose-500', bgClass: 'bg-rose-500', desc: 'Plan de reprise d\'activité incomplet' }
            ].map((stat, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                key={i} 
                className="p-6 bg-slate-900/50 border border-white/5 rounded-2xl hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-center gap-3 mb-6">
                  <stat.icon className={`h-5 w-5 ${stat.colorClass}`} />
                  <span className="font-bold text-[10px] uppercase tracking-widest text-slate-400">{stat.title}</span>
                </div>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-black text-white">{stat.score}</span>
                  <span className="text-sm font-bold text-slate-500">%</span>
                </div>
                <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden mb-4">
                  <div className={`${stat.bgClass} h-full rounded-full`} style={{ width: `${stat.score}%` }} />
                </div>
                <p className="text-xs text-slate-400 font-medium">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="w-full bg-slate-900/80 border border-blue-500/20 rounded-2xl p-6 md:p-8 relative overflow-hidden mb-8">
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20" />
          <div className="flex flex-col md:flex-row items-start gap-6 relative z-10">
            <div className="bg-blue-500/10 text-blue-400 p-4 rounded-2xl border border-blue-500/20 shrink-0">
              <Lightbulb className="h-6 w-6" />
            </div>
            <div className="space-y-3">
              <h4 className="text-lg font-black text-white uppercase">ACTION PRIORITAIRE RECOMMANDÉE</h4>
              <p className="text-slate-400 text-sm leading-relaxed font-medium uppercase">
                CONCENTREZ-VOUS SUR LE <span className="text-white font-bold bg-slate-800 px-1.5 py-0.5 rounded">CLOISONNEMENT DES ACCÈS</span>. <span className="text-blue-400 font-bold">80%</span> DES VULNÉRABILITÉS PROVIENNENT DE PRIVILÈGES TROP PERMISSIFS.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <Link href="/diagnostic/estimator" className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-black py-4 px-8 rounded-xl transition-all shadow-[0_0_20px_-5px_rgba(37,99,235,0.4)] hover:scale-[1.02] uppercase tracking-wider text-sm">
            <ShieldCheck className="h-5 w-5" />
            ESTIMER L&apos;IMPACT FINANCIER
          </Link>
          <button className="flex-1 flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 border border-white/10 text-white font-black py-4 px-8 rounded-xl transition-all uppercase tracking-wider text-sm">
            <Download className="h-5 w-5" />
            TÉLÉCHARGER LE RAPPORT
          </button>
        </div>
      </main>
    </div>
  );
}
