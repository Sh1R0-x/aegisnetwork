import { Shield, Bell, User } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  return (
    <header className="flex items-center justify-between border-b border-white/5 bg-slate-950/50 backdrop-blur-md px-6 py-4 lg:px-12 sticky top-0 z-50">
      <Link href="/" className="flex items-center gap-3 group">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20 group-hover:scale-105 transition-transform">
          <Shield className="h-5 w-5" />
        </div>
        <h2 className="text-xl font-black tracking-tight text-white">
          AEGIS <span className="text-blue-500">NETWORK</span>
        </h2>
      </Link>
      <nav className="hidden md:flex items-center gap-8">
        <Link href="/" className="text-sm font-medium text-blue-500 border-b-2 border-blue-500 pb-1">Accueil</Link>
        <Link href="/diagnostic/question" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Diagnostic</Link>
        <Link href="/dashboard" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Rapports</Link>
      </nav>
      <div className="flex items-center gap-4">
        <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 border border-white/5 text-slate-400 hover:text-white hover:bg-slate-800 transition-all">
          <Bell className="h-5 w-5" />
        </button>
        <div className="h-10 w-10 rounded-xl border border-white/10 bg-slate-800 overflow-hidden flex items-center justify-center text-slate-400">
          <User className="h-5 w-5" />
        </div>
      </div>
    </header>
  );
}
