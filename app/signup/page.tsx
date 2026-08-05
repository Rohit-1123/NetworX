"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Shield, Lock, Mail, User, Building, ArrowRight } from "lucide-react";
import { CyberTwinBackgroundCanvas } from "@/components/cyber/CyberTwinBackgroundCanvas";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-cyber-dark text-gray-100 relative flex items-center justify-center p-4 overflow-hidden">
      <CyberTwinBackgroundCanvas />

      <div className="w-full max-w-md glass-card p-8 rounded-2xl border border-cyber-border shadow-cyber z-10 space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan">
              <Shield className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold tracking-wider text-white">
              NETWOR<span className="text-cyber-cyan">X</span>
            </span>
          </Link>
          <h1 className="text-lg font-bold text-gray-200">Start 14-Day Free Trial</h1>
          <p className="text-xs text-gray-400">Deploy NetworX Decision Intelligence for your SOC</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-gray-400 mb-1 uppercase font-bold">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
              <input
                type="text"
                required
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900/90 border border-cyber-border/60 text-sm text-gray-100 focus:outline-none focus:border-cyber-cyan"
                placeholder="Rohit Miller"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-gray-400 mb-1 uppercase font-bold">Company Name</label>
            <div className="relative">
              <Building className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
              <input
                type="text"
                required
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900/90 border border-cyber-border/60 text-sm text-gray-100 focus:outline-none focus:border-cyber-cyan"
                placeholder="Acme Cyber Corp"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-gray-400 mb-1 uppercase font-bold">Work Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
              <input
                type="email"
                required
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900/90 border border-cyber-border/60 text-sm text-gray-100 focus:outline-none focus:border-cyber-cyan"
                placeholder="rohit@acme-cyber.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-gray-400 mb-1 uppercase font-bold">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
              <input
                type="password"
                required
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900/90 border border-cyber-border/60 text-sm text-gray-100 focus:outline-none focus:border-cyber-cyan"
                placeholder="••••••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyber-cyan to-sky-400 text-black font-extrabold text-sm shadow-cyber hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
          >
            {loading ? "Creating Workspace..." : "Create NetworX Workspace"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="text-cyber-cyan font-bold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
