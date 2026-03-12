'use client';

import { useState } from 'react';
import { Settings2, Info, ArrowRight, Activity } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'motion/react';

export default function EstimatorPage() {
  const [employees, setEmployees] = useState(75);
  const [severity, setSeverity] = useState('MODEREE');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      <header className="flex items-center justify-between border-b border-white/5 bg-slate-950/80 backdrop-blur-md px-6 py-4 lg:px-12 sticky top-0 z-50">
        <h2 className="text-sm font-bold tracking-widest uppercase text-slate-300">Aegis Network</h2>
      </header>

      <main className="flex-1 flex flex-col items-center py-12 px-6 lg:px-20 w-full max-w-6xl mx-auto">
        <div className="w-full mb-10 text-center md:text-left">
          <h1 className="text-3xl lg:text-4xl font-black text-white mb-3 tracking-tight uppercase">IMPACT ESTIMATOR</h1>
          <p className="text-slate-400 text-base font-medium uppercase">ÉVALUEZ LA CRITICITÉ D&apos;UN INCIDENT SUR VOS OPÉRATIONS.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="bg-slate-900/80 p-8 rounded-3xl border border-white/5 shadow-2xl">
              <h3 className="text-lg font-black text-white mb-8 flex items-center gap-2 uppercase">
                <Settings2 className="h-5 w-5 text-blue-500" />
                PARAMÈTRES DE L&apos;INCIDENT
              </h3>
              
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-slate-300 uppercase tracking-wider">COLLABORATEURS IMPACTÉS</label>
                    <span className="text-blue-500 font-black text-lg">{employees}</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="500" 
                    value={employees}
                    onChange={(e) => setEmployees(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 uppercase font-bold">
                    <span>1</span>
                    <span>250</span>
                    <span>500+</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-300 uppercase tracking-wider">DURÉE D&apos;INTERRUPTION (H)</label>
                    <div className="relative">
                      <input 
                        type="number" 
                        placeholder="ex: 4" 
                        className="w-full bg-slate-950 border border-white/10 rounded-xl py-3.5 px-4 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all font-medium"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-medium">heures</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-300 uppercase tracking-wider">SECTEUR CRITIQUE</label>
                    <select className="w-full bg-slate-950 border border-white/10 rounded-xl py-3.5 px-4 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all font-medium appearance-none uppercase text-xs">
                      <option>SERVICES FINANCIERS</option>
                      <option>LOGISTIQUE & SUPPLY CHAIN</option>
                      <option>INFRASTRUCTURES IT</option>
                      <option>RESSOURCES HUMAINES</option>
                    </select>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5">
                  <label className="text-sm font-bold text-slate-300 mb-4 block uppercase tracking-wider">GRAVITÉ DE LA COMPROMISSION</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['FAIBLE', 'MODEREE', 'CRITIQUE'].map((level) => (
                      <button 
                        key={level}
                        onClick={() => setSeverity(level)}
                        className={`py-3.5 px-2 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-wider transition-all ${
                          severity === level 
                            ? 'bg-blue-500/10 border-2 border-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.2)]' 
                            : 'bg-slate-950 border border-white/5 text-slate-500 hover:border-slate-700 hover:text-slate-300'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-5 border border-white/5 bg-slate-900/30 rounded-2xl">
              <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
              <p className="text-xs leading-relaxed text-slate-400 font-medium uppercase">
                ESTIMATION BASÉE SUR LES STANDARDS NIST CSF ET MOYENNES SECTORIELLES.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="sticky top-24 bg-slate-900/80 border border-white/5 rounded-3xl p-8 flex flex-col items-center text-center relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                <Activity className="w-48 h-48" />
              </div>
              
              <h4 className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-8">Score de Risque Estimé</h4>
              
              <div className="relative size-48 mb-8">
                <svg className="size-48 transform -rotate-90 drop-shadow-[0_0_20px_rgba(37,99,235,0.3)]" viewBox="0 0 100 100">
                  <circle className="text-slate-800" strokeWidth="8" stroke="currentColor" fill="transparent" r="42" cx="50" cy="50" />
                  <circle className="text-blue-500" strokeWidth="8" strokeDasharray="264" strokeDashoffset="84" strokeLinecap="round" stroke="currentColor" fill="transparent" r="42" cx="50" cy="50" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-6xl font-black text-white tracking-tighter">68</span>
                  <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mt-1">Indice Risque</span>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-black border border-blue-500/20 mb-8">
                <span className="size-2 rounded-full bg-blue-500 animate-pulse" />
                IMPACT MODÉRÉ
              </div>

              <div className="w-full space-y-3 text-left mb-8">
                <div className="flex justify-between items-center p-4 rounded-xl bg-slate-950 border border-white/5">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Temps de Reprise</span>
                  <span className="text-sm font-black text-white">~12.4h</span>
                </div>
                <div className="flex justify-between items-center p-4 rounded-xl bg-slate-950 border border-white/5">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Urgence Action</span>
                  <span className="text-sm font-black text-white">Haut</span>
                </div>
              </div>

              <Link href="/diagnostic/action" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-xl transition-all shadow-[0_0_20px_-5px_rgba(37,99,235,0.4)] hover:scale-[1.02] flex items-center justify-center gap-2 text-sm uppercase tracking-wider">
                GÉNÉRER LE RAPPORT
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
