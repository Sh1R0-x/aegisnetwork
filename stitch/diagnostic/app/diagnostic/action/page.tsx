'use client';

import { Calendar, FileText, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'motion/react';

export default function ActionPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      <header className="flex items-center justify-between border-b border-white/5 bg-slate-950/80 backdrop-blur-md px-6 py-4 lg:px-12 sticky top-0 z-50">
        <h2 className="text-sm font-bold tracking-widest uppercase text-slate-300">Aegis Network</h2>
        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-slate-900 rounded-full border border-white/5">
          <span className="size-2 rounded-full bg-emerald-500" />
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Réseau Sécurisé</span>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center py-12 px-6 lg:px-20 w-full max-w-4xl mx-auto relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.08),transparent_60%)] pointer-events-none" />
        
        <div className="w-full flex flex-col items-center text-center space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">
            <CheckCircle2 className="h-4 w-4" />
            Diagnostic Terminé
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-white max-w-3xl">
            Vous voulez une lecture plus <span className="text-blue-500">concrète</span> de votre situation ?
          </h1>
          
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl leading-relaxed font-medium">
            Nos experts sont à votre disposition pour analyser vos résultats et définir une stratégie de protection sur mesure, adaptée à vos enjeux réels.
          </p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-xl mt-8"
          >
            <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 p-6 rounded-3xl flex flex-col md:flex-row items-center gap-6 text-left hover:border-blue-500/30 transition-all duration-300 shadow-2xl">
              <div className="size-24 rounded-2xl overflow-hidden border-2 border-blue-500/20 shrink-0">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Marc" alt="Expert" className="w-full h-full object-cover bg-slate-800" />
              </div>
              <div className="flex-1 space-y-2 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <h3 className="text-white text-xl font-black flex items-center justify-center md:justify-start gap-2">
                    Marc Lefebvre
                    <span className="size-2 rounded-full bg-emerald-500" />
                  </h3>
                  <span className="px-2 py-1 rounded bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-wider w-fit mx-auto md:mx-0 border border-blue-500/20">
                    Expert Cyber-Sérénité
                  </span>
                </div>
                <p className="text-slate-400 text-sm italic font-medium">
                  &quot;Ma mission est de transformer vos vulnérabilités en une infrastructure résiliente.&quot;
                </p>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md pt-6">
            <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-black py-4 px-8 rounded-xl transition-all shadow-[0_0_30px_-5px_rgba(37,99,235,0.5)] hover:scale-105">
              <Calendar className="h-5 w-5" />
              Faire le point
            </button>
            <Link href="/dashboard" className="flex-1 flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 border border-white/10 text-white font-black py-4 px-8 rounded-xl transition-all">
              <FileText className="h-5 w-5" />
              Voir le rapport
            </Link>
          </div>
          
          <p className="text-slate-500 text-sm font-medium">
            Un échange de 15 minutes pour transformer vos diagnostics en plan d&apos;action concret.<br />
            <span className="text-slate-400">Confidentiel et sans engagement.</span>
          </p>
        </div>
      </main>
    </div>
  );
}
