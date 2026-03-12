'use client';

import { History, LayoutDashboard, Settings, Shield, Bell, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r border-white/5 bg-slate-950 flex flex-col p-6 shrink-0 hidden md:flex">
        <Link href="/" className="flex items-center gap-3 mb-12 group">
          <Shield className="h-8 w-8 text-blue-500 group-hover:scale-105 transition-transform" />
          <h2 className="text-lg font-black tracking-tight uppercase text-white">Aegis Network</h2>
        </Link>
        
        <div className="flex flex-col gap-2">
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2 px-3">Menu Principal</p>
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-900 text-slate-400 hover:text-white transition-colors font-bold text-sm">
            <LayoutDashboard className="h-5 w-5" />
            Tableau de bord
          </Link>
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-600 text-white shadow-[0_0_20px_-5px_rgba(37,99,235,0.4)] font-bold text-sm">
            <History className="h-5 w-5" />
            Historique
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-900 text-slate-400 hover:text-white transition-colors font-bold text-sm">
            <Settings className="h-5 w-5" />
            Paramètres
          </Link>
        </div>

        <div className="mt-auto pt-8">
          <div className="p-5 rounded-2xl bg-blue-500/10 border border-blue-500/20">
            <p className="text-[10px] font-black text-blue-400 mb-1 uppercase tracking-widest">Pro Plan Active</p>
            <p className="text-xs text-slate-400 mb-3 font-medium">Réseau sécurisé à 98%.</p>
            <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
              <div className="w-[98%] h-full bg-blue-500" />
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col max-h-screen overflow-y-auto">
        <header className="flex items-center justify-between border-b border-white/5 bg-slate-950/80 backdrop-blur-md px-8 py-4 sticky top-0 z-50">
          <h1 className="text-xl font-black text-white md:hidden">Historique</h1>
          <div className="hidden md:block" />
          <div className="flex items-center gap-4">
            <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 border border-white/5 text-slate-400 hover:text-white transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            <div className="h-10 w-10 rounded-xl border border-white/10 bg-slate-800 overflow-hidden">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" className="h-full w-full object-cover" />
            </div>
          </div>
        </header>

        <div className="p-8 lg:p-12 max-w-6xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-3">Historique des Sessions</h1>
              <p className="text-slate-400 text-base max-w-lg leading-relaxed font-medium">Retrouvez l&apos;intégralité de vos diagnostics passés et suivez l&apos;évolution de votre sécurité réseau.</p>
            </div>
            <Link href="/diagnostic/question" className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-black py-3.5 px-6 rounded-xl transition-all shadow-[0_0_20px_-5px_rgba(37,99,235,0.4)] hover:scale-105 shrink-0 text-sm uppercase tracking-wider">
              <RefreshCw className="h-4 w-4" />
              Nouveau Diagnostic
            </Link>
          </div>

          <div className="mb-10 rounded-3xl bg-slate-900/80 border border-white/5 overflow-hidden flex flex-col md:flex-row items-stretch shadow-2xl">
            <div className="md:w-2/5 relative min-h-[250px] bg-slate-800">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-slate-900/80 mix-blend-overlay" />
              <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000&auto=format&fit=crop" alt="Server" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity" />
              <div className="absolute top-6 left-6">
                <span className="bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg flex items-center gap-2 border border-blue-500/50">
                  <span className="size-1.5 rounded-full bg-white animate-pulse" />
                  Dernière Session
                </span>
              </div>
            </div>
            <div className="p-8 md:p-10 flex-1 flex flex-col justify-center">
              <div className="flex items-center justify-between mb-4">
                <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">24 Mai 2024</span>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <span className="text-[10px] font-black uppercase tracking-widest">Excellent</span>
                </div>
              </div>
              <h3 className="text-3xl font-black text-white mb-4 tracking-tight">Score : <span className="text-blue-500">84</span><span className="text-slate-500 text-xl font-bold">/100</span></h3>
              <p className="text-slate-400 mb-8 text-sm leading-relaxed font-medium">Votre niveau de protection est globalement solide. Quelques optimisations sur le pare-feu externe ont été identifiées pour atteindre un score de 95+.</p>
              <div className="flex flex-wrap gap-4">
                <Link href="/diagnostic/result" className="bg-blue-600 px-6 py-3 rounded-xl text-white font-bold text-sm hover:bg-blue-500 transition-all shadow-[0_0_20px_-5px_rgba(37,99,235,0.4)] hover:scale-105">
                  Consulter le Rapport
                </Link>
                <button className="bg-slate-900 border border-white/10 px-6 py-3 rounded-xl text-slate-300 font-bold text-sm hover:bg-slate-800 hover:text-white transition-all">
                  Partager
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Session Mensuelle', date: '12 Avril 2024', score: 92, colorClass: 'text-emerald-500', desc: 'Analyse complète des endpoints terminée sans menaces critiques détectées.' },
              { title: 'Diagnostic Rapide', date: '05 Mars 2024', score: 67, colorClass: 'text-amber-500', desc: '3 vulnérabilités mineures détectées sur le port 443. Mise à jour requise.' }
            ].map((session, i) => (
              <div key={i} className="bg-slate-900/50 border border-white/5 p-8 rounded-3xl hover:bg-slate-800/50 transition-colors group">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h4 className="text-white font-black text-lg mb-1">{session.title}</h4>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{session.date}</p>
                  </div>
                  <span className={`text-3xl font-black ${session.colorClass}`}>{session.score}</span>
                </div>
                <p className="text-sm text-slate-400 mb-8 font-medium leading-relaxed">{session.desc}</p>
                <button className="w-full py-3.5 bg-slate-950 border border-white/5 group-hover:border-blue-500/30 rounded-xl text-[10px] font-black text-slate-400 group-hover:text-blue-400 transition-all uppercase tracking-widest">
                  Revoir les détails
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
