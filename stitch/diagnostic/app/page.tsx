import { Header } from '@/components/layout/Header';
import { ArrowRight, CheckCircle2, Activity, Zap, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-blue-500/30">
      <Header />
      <main className="relative flex flex-col items-center justify-center px-6 py-20 lg:px-20 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="grid w-full max-w-7xl grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center relative z-10">
          <div className="flex flex-col gap-8">
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-blue-500/10 px-4 py-2 border border-blue-500/20">
              <Zap className="h-4 w-4 text-blue-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Diagnostic Express</span>
            </div>
            
            <div className="flex flex-col gap-6">
              <h1 className="text-5xl font-black leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl">
                Reprenez le contrôle.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Devenez performant.</span>
              </h1>
              <p className="max-w-lg text-lg leading-relaxed text-slate-400 font-medium">
                Identifiez les failles et optimisez votre infrastructure réseau en moins de 2 minutes. Une analyse claire, stratégique et actionnable.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 mt-4">
              <Link href="/diagnostic/question" className="group flex h-14 items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 text-base font-bold text-white shadow-[0_0_30px_-5px_rgba(37,99,235,0.4)] hover:bg-blue-500 hover:shadow-[0_0_40px_-5px_rgba(37,99,235,0.6)] transition-all">
                Lancer le diagnostic
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="flex h-14 items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/50 px-8 text-base font-bold text-slate-300 hover:bg-slate-800 hover:text-white transition-all">
                Découvrir le module
              </button>
            </div>
            
            <div className="flex items-center gap-6 pt-4 text-slate-400">
              {['Gratuit', 'Sans installation', 'Rapport PDF'].map((text) => (
                <div key={text} className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  <span className="text-sm font-medium">{text}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative hidden lg:block">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-blue-500/20 to-indigo-500/10 blur-2xl" />
            <div className="relative rounded-2xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">
              <div className="mb-8 flex items-center justify-between border-b border-white/5 pb-6">
                <div className="flex flex-col gap-1">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Aperçu en direct</h3>
                  <p className="text-xl font-bold text-white">Analyse de performance</p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                  <Activity className="h-6 w-6 text-blue-400" />
                </div>
              </div>
              
              <div className="space-y-4">
                {[
                  { label: 'Latence Réseau', value: '12ms', trend: '-4%', color: 'bg-emerald-500' },
                  { label: 'Bande passante', value: '942 Mbps', trend: '+2%', color: 'bg-blue-500' },
                  { label: 'Stabilité', value: '99.98%', trend: 'Stable', color: 'bg-indigo-500' }
                ].map((stat, i) => (
                  <div key={i} className="flex items-center justify-between rounded-xl border border-white/5 bg-slate-950/50 p-4 hover:bg-slate-800/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`h-2.5 w-2.5 rounded-full ${stat.color} shadow-[0_0_10px_rgba(0,0,0,0.5)]`} />
                      <span className="text-sm font-medium text-slate-300">{stat.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-white">{stat.value}</span>
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">{stat.trend}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="absolute -bottom-6 -right-6 rounded-2xl border border-white/10 bg-slate-800 p-5 shadow-2xl backdrop-blur-xl flex items-center gap-4">
                <div className="rounded-xl bg-blue-500/20 p-3 text-blue-400 border border-blue-500/20">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Score Global</span>
                  <span className="text-2xl font-black text-white">92<span className="text-sm text-slate-500">/100</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
