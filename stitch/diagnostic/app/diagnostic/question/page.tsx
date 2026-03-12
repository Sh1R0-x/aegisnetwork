'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight, Shield, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';

const questions = [
  {
    id: 1,
    title: "VOTRE ENVIRONNEMENT IT EST-IL ADAPTÉ À VOTRE ACTIVITÉ ACTUELLE ?",
    options: [
      { id: 'A', title: 'PARFAITEMENT ADAPTÉ', desc: 'Aucun frein opérationnel. L\'infrastructure soutient la croissance.' },
      { id: 'B', title: 'PLUTÔT ADAPTÉ', desc: 'Satisfaisant globalement, mais quelques lenteurs ou ajustements nécessaires.' },
      { id: 'C', title: 'PEU ADAPTÉ', desc: 'Des freins structurels ralentissent quotidiennement l\'activité.' },
      { id: 'D', title: 'INADAPTÉ', desc: 'Refonte complète nécessaire. L\'environnement bloque la production.' }
    ]
  },
  {
    id: 2,
    title: "COMMENT GÉREZ-VOUS ACTUELLEMENT LES ACCÈS DISTANTS ?",
    options: [
      { id: 'A', title: 'VPN + MFA', desc: 'Accès sécurisé avec authentification multifacteur pour tous.' },
      { id: 'B', title: 'VPN SIMPLE', desc: 'Accès par mot de passe uniquement, sans double validation.' },
      { id: 'C', title: 'ACCÈS DIRECT', desc: 'Services exposés directement sur internet sans protection.' },
      { id: 'D', title: 'AUCUN ACCÈS', desc: 'Pas de télétravail ou d\'accès distant possible.' }
    ]
  },
  {
    id: 3,
    title: "À QUAND REMONTE VOTRE DERNIER AUDIT DE SÉCURITÉ ?",
    options: [
      { id: 'A', title: 'MOINS DE 6 MOIS', desc: 'Audits réguliers et tests d\'intrusion fréquents.' },
      { id: 'B', title: 'IL Y A 1 AN', desc: 'Audit annuel de conformité.' },
      { id: 'C', title: 'PLUS DE 2 ANS', desc: 'Audit ancien, infrastructure potentiellement vulnérable.' },
      { id: 'D', title: 'JAMAIS', desc: 'Aucune évaluation formelle de la sécurité n\'a été réalisée.' }
    ]
  }
];

export default function QuestionPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  
  const currentQuestion = questions[currentIndex];
  const selected = answers[currentQuestion.id];
  const progress = Math.round(((currentIndex + 1) / questions.length) * 100);

  const handleSelect = (optionId: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: optionId }));
  };

  const handleNext = () => {
    if (!selected) return;
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      router.push('/diagnostic/insight');
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      <header className="flex items-center justify-between border-b border-white/5 bg-slate-950/80 backdrop-blur-md px-6 py-4 lg:px-12 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Shield className="h-6 w-6 text-blue-500" />
          <h2 className="text-sm font-bold tracking-widest uppercase text-slate-300">Aegis Network</h2>
        </div>
        <button onClick={handlePrev} className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 border border-white/5 text-slate-400 hover:text-white hover:bg-slate-800 transition-all">
          <ArrowLeft className="h-5 w-5" />
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center py-12 px-6 lg:px-20 w-full max-w-5xl mx-auto overflow-hidden">
        <div className="w-full mb-12">
          <div className="flex justify-between items-end mb-4">
            <div>
              <span className="text-blue-500 text-[10px] font-black uppercase tracking-[0.2em]">Diagnostic Module</span>
              <h3 className="text-lg font-bold mt-1 text-white uppercase">Étape {currentIndex + 1} <span className="text-slate-500 font-medium">/ {questions.length}</span></h3>
            </div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{progress}% complété</p>
          </div>
          <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-blue-500 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.5)]" 
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full flex flex-col items-center"
          >
            <div className="w-full mb-12">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-black leading-tight tracking-tight text-white max-w-3xl uppercase">
                {currentQuestion.title}
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-12">
              {currentQuestion.options.map((opt, i) => {
                const isSelected = selected === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelect(opt.id)}
                    className={`relative flex flex-col p-6 rounded-2xl border-2 text-left transition-all duration-200 group ${
                      isSelected 
                        ? 'border-blue-500 bg-blue-500/10 shadow-[0_0_30px_-10px_rgba(37,99,235,0.3)]' 
                        : 'border-white/5 bg-slate-900/50 hover:border-slate-700 hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4 w-full">
                      <span className={`flex items-center justify-center h-8 w-8 rounded-lg font-black text-sm transition-colors ${
                        isSelected ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700 group-hover:text-white'
                      }`}>
                        {opt.id}
                      </span>
                      <CheckCircle2 className={`h-6 w-6 transition-colors ${isSelected ? 'text-blue-500' : 'text-transparent'}`} />
                    </div>
                    <div className="flex flex-col">
                      <p className={`text-lg font-bold mb-2 uppercase transition-colors ${isSelected ? 'text-white' : 'text-slate-200 group-hover:text-white'}`}>
                        {opt.title}
                      </p>
                      <p className={`text-sm leading-relaxed transition-colors ${isSelected ? 'text-blue-200/70' : 'text-slate-500 group-hover:text-slate-400'}`}>
                        {opt.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="w-full flex items-center justify-between pt-8 border-t border-white/5 mt-auto">
          <button onClick={handlePrev} className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors font-semibold text-sm uppercase tracking-wider">
            <ArrowLeft className="h-4 w-4" />
            Précédent
          </button>
          <button 
            onClick={handleNext}
            disabled={!selected}
            className={`flex items-center justify-center gap-2 rounded-xl h-14 px-8 text-sm font-black uppercase tracking-wider transition-all ${
              selected 
                ? 'bg-blue-600 text-white shadow-[0_0_20px_-5px_rgba(37,99,235,0.4)] hover:bg-blue-500 hover:scale-105' 
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            {currentIndex < questions.length - 1 ? 'Suivant' : 'Voir l\'Insight'}
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </main>
    </div>
  );
}
