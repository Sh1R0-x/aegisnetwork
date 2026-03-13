import { 
  Server, 
  Wifi, 
  LifeBuoy, 
  CheckCircle2, 
  Phone, 
  Mail, 
  MapPin,
  Globe,
  ShieldCheck
} from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

function AegisLogo({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="aegis-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#2563EB"/>
          <stop offset="100%" stop-color="#7C3AED"/>
        </linearGradient>
      </defs>
      <path d="M15 85 L50 15 L85 85" stroke="url(#aegis-gradient)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="82" cy="18" r="4" fill="#60A5FA"/>
      <circle cx="92" cy="32" r="3" fill="#60A5FA" opacity="0.6"/>
      <circle cx="72" cy="8" r="3" fill="#7C3AED" opacity="0.8"/>
      <path d="M65 35 L82 18" stroke="url(#aegis-gradient)" strokeWidth="1.5" strokeDasharray="4 4"/>
    </svg>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#070b14] p-4 md:p-8 flex items-center justify-center font-['Inter',sans-serif] text-slate-200">
      
      {/* Container Principal du Flyer Digital */}
      <div className="max-w-4xl w-full bg-[#020617] rounded-[24px] shadow-[0_0_80px_-20px_rgba(37,99,235,0.2)] overflow-hidden border border-white/10 relative">
        
        {/* Glow Effect Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

        {/* Header Section */}
        <div className="relative h-80 md:h-[350px] overflow-hidden">
          <div className="absolute inset-0 bg-[#020617]">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1739054730201-4b6463484e3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBkYXRhJTIwY2VudGVyJTIwYmx1ZXxlbnwxfHx8fDE3NzM0MDIyOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Infrastructure Data Center"
              className="w-full h-full object-cover opacity-50 mix-blend-lighten"
            />
            {/* Overlay Gradient (from-background-deep) */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/20 via-[#020617]/70 to-[#020617]" />
            <div className="absolute inset-0 bg-blue-600/10 mix-blend-overlay" />
          </div>
          
          <div className="relative h-full flex flex-col items-center justify-center px-6 text-center z-10 pt-8">
            <div className="flex flex-col items-center gap-5 mb-4">
              <div className="relative">
                {/* Glow behind logo */}
                <div className="absolute inset-0 bg-blue-500/30 blur-2xl rounded-full scale-150"></div>
                <AegisLogo className="w-16 h-16 md:w-20 md:h-20 relative z-10 drop-shadow-[0_0_15px_rgba(37,99,235,0.5)]" />
              </div>
              <div>
                <h1 className="text-[2.5rem] md:text-[3.5rem] font-black tracking-[0.06em] leading-[1.1] text-white" style={{ wordSpacing: '0.2em' }}>
                  AEGIS <span className="bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] bg-clip-text text-transparent">NETWORK</span>
                </h1>
                <p className="mt-3 text-sm md:text-base font-bold uppercase tracking-[0.25em] text-[#94A3B8]">
                  Conseil & Optimisation IT
                </p>
              </div>
            </div>
            <p className="mt-4 text-[#E2E8F0] max-w-2xl text-lg font-medium leading-[1.5]">
              Simplifiez votre connectivité professionnelle.
            </p>
          </div>
        </div>

        {/* Services Grid Section */}
        <div className="px-6 md:px-12 py-16 relative z-10">
          <div className="text-center mb-16">
            <span className="font-bold uppercase tracking-[0.3em] text-[#3B82F6] mb-3 block text-[16px]">CONSEIL IT</span>
            <h2 className="text-[2rem] md:text-[2.5rem] font-black tracking-[-0.02em] leading-[1.2] text-white">Comment on vous rend plus performant ?</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {/* Service 1 */}
            <div className="bg-[#0F172A]/80 backdrop-blur-[12px] p-8 rounded-[24px] border border-white/5 flex flex-col items-center text-center shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]">
              <div className="bg-gradient-to-br from-[#2563EB]/20 to-transparent p-5 rounded-[20px] mb-6 border border-[#3B82F6]/30 shadow-[inset_0_0_20px_rgba(37,99,235,0.2)]">
                <Server className="w-12 h-12 text-[#3B82F6]" strokeWidth={1.5} />
              </div>
              <h3 className="text-[1.5rem] font-black text-white tracking-tight mb-2">Réseau & Infra</h3>
              <p className="text-[#94A3B8] font-medium text-lg">Fondations fiables</p>
            </div>

            {/* Service 2 */}
            <div className="bg-[#0F172A]/80 backdrop-blur-[12px] p-8 rounded-[24px] border border-white/5 flex flex-col items-center text-center shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]">
              <div className="bg-gradient-to-br from-[#7C3AED]/20 to-transparent p-5 rounded-[20px] mb-6 border border-[#7C3AED]/30 shadow-[inset_0_0_20px_rgba(124,58,237,0.2)]">
                <ShieldCheck className="w-12 h-12 text-[#7C3AED]" strokeWidth={1.5} />
              </div>
              <h3 className="text-[1.5rem] font-black text-white tracking-tight mb-2">Cyber Sécurité</h3>
              <p className="text-[#94A3B8] font-medium text-lg">Données protégées</p>
            </div>

            {/* Service 3 */}
            <div className="bg-[#0F172A]/80 backdrop-blur-[12px] p-8 rounded-[24px] border border-white/5 flex flex-col items-center text-center shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]">
              <div className="bg-gradient-to-br from-[#3B82F6]/20 to-transparent p-5 rounded-[20px] mb-6 border border-[#3B82F6]/30 shadow-[inset_0_0_20px_rgba(37,99,235,0.2)]">
                <Wifi className="w-12 h-12 text-[#3B82F6]" strokeWidth={1.5} />
              </div>
              <h3 className="text-[1.5rem] font-black text-white tracking-tight mb-2">Connectivité</h3>
              <p className="text-[#94A3B8] font-medium text-lg">Zéro coupure</p>
            </div>

            {/* Service 4 */}
            <div className="bg-[#0F172A]/80 backdrop-blur-[12px] p-8 rounded-[24px] border border-white/5 flex flex-col items-center text-center shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]">
              <div className="bg-gradient-to-br from-[#7C3AED]/20 to-transparent p-5 rounded-[20px] mb-6 border border-[#7C3AED]/30 shadow-[inset_0_0_20px_rgba(124,58,237,0.2)]">
                <LifeBuoy className="w-12 h-12 text-[#7C3AED]" strokeWidth={1.5} />
              </div>
              <h3 className="text-[1.5rem] font-black text-white tracking-tight mb-2">Accompagnement</h3>
              <p className="text-[#94A3B8] font-medium text-lg">Interlocuteur unique</p>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 mb-20 px-4">
            <div className="flex items-center gap-4">
              <CheckCircle2 className="w-8 h-8 text-[#3B82F6]" strokeWidth={2} />
              <span className="text-white text-lg font-bold">Moins de temps perdu</span>
            </div>
            <div className="hidden md:block w-px h-12 bg-white/10"></div>
            <div className="flex items-center gap-4">
              <CheckCircle2 className="w-8 h-8 text-[#3B82F6]" strokeWidth={2} />
              <span className="text-white text-lg font-bold">Coûts maîtrisés</span>
            </div>
            <div className="hidden md:block w-px h-12 bg-white/10"></div>
            <div className="flex items-center gap-4">
              <CheckCircle2 className="w-8 h-8 text-[#3B82F6]" strokeWidth={2} />
              <span className="text-white text-lg font-bold">Clarté totale</span>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-gradient-to-br from-[#2563EB] to-[#7C3AED] rounded-[24px] p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="text-left max-w-sm">
                <h3 className="text-[2.5rem] font-black tracking-[-0.02em] leading-[1.1] mb-4">Contactez<br/>nos experts.</h3>
                <p className="text-blue-100 text-lg font-medium mb-6">Audit et analyse de votre infrastructure.</p>
                <div className="flex items-center gap-2 text-blue-200 text-sm font-bold uppercase tracking-widest">
                  <MapPin className="w-4 h-4" />
                  Lyon, France
                </div>
              </div>

              <div className="flex flex-col gap-4 w-full md:w-auto">
                <div className="flex items-center gap-5 bg-[#020617]/30 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10">
                  <div className="bg-white/10 p-2.5 rounded-xl">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-200 block mb-0.5">Téléphone</span>
                    <span className="text-lg font-black tracking-wider">06 52 95 00 10</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-5 bg-[#020617]/30 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10">
                  <div className="bg-white/10 p-2.5 rounded-xl">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-200 block mb-0.5">Email</span>
                    <span className="text-base font-bold">contact@aegisnetwork.fr</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-5 bg-[#020617]/30 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10">
                  <div className="bg-white/10 p-2.5 rounded-xl">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-200 block mb-0.5">Site web</span>
                    <span className="text-base font-bold">aegisnetwork.fr</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#020617]/90 backdrop-blur-xl border-t border-white/5 text-[#64748B] text-center py-6 px-6 relative z-10">
          <p className="text-xs font-medium tracking-[0.05em]">© 2026 Aegis Network — Connectivité & Téléphonie d'entreprise</p>
        </div>
      </div>
    </div>
  );
}
