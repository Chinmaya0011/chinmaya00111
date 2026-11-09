import Link from "next/link";
import { ShieldAlert, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#03070A] text-[#F0F6FC] flex flex-col items-center justify-center p-4 font-mono">
      <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
        <ShieldAlert className="w-6 h-6" />
      </div>
      <h1 className="text-4xl font-extrabold text-white mb-2">404</h1>
      <p className="text-sm text-slate-400 mb-6 text-center max-w-sm font-sans">
        The requested endpoint or resource could not be found in this workspace.
      </p>
      <Link
        href="/"
        className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#03070A] font-semibold text-xs transition-colors flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Homepage</span>
      </Link>
    </div>
  );
}

