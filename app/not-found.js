import Link from "next/link";
import { ShieldAlert, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#171717] flex flex-col items-center justify-center p-4 font-mono">
      <div className="w-12 h-12 rounded-xl bg-[#365CF5]/10 border border-[#365CF5]/20 flex items-center justify-center text-[#365CF5] mb-4 shadow-xs">
        <ShieldAlert className="w-6 h-6" />
      </div>
      <h1 className="text-4xl font-extrabold text-[#171717] mb-2 font-sans">404</h1>
      <p className="text-sm text-[#666666] mb-6 text-center max-w-sm font-sans">
        The requested endpoint or resource could not be found on this domain.
      </p>
      <Link
        href="/"
        className="px-5 py-2.5 rounded-xl bg-[#365CF5] hover:bg-[#2B4CD9] text-white font-mono font-bold text-xs transition-colors flex items-center gap-2 shadow-xs"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Homepage</span>
      </Link>
    </div>
  );
}
