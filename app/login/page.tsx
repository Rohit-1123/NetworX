"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Shield, Lock, Mail, ArrowRight, Eye, EyeOff } from "lucide-react";
import { CyberTwinBackgroundCanvas } from "@/components/cyber/CyberTwinBackgroundCanvas";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("rohit@acme-cyber.com");
  const [password, setPassword] = useState("••••••••••••");
  const [showPassword, setShowPassword] = useState(false);
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
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan">
              <Shield className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold tracking-wider text-white">
              NETWOR<span className="text-cyber-cyan">X</span>
            </span>
          </Link>
          <h1 className="text-lg font-bold text-gray-200">Sign in to Cyber Decision Portal</h1>
          <p className="text-xs text-gray-400">Enter your enterprise credentials to access NetworX</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-gray-400 mb-1.5 uppercase font-bold">Work Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-cyber-border/60 text-sm text-gray-100 placeholder-gray-600 focus:outline-none focus:border-cyber-cyan transition-colors"
                placeholder="name@company.com"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-mono text-gray-400 uppercase font-bold">Password</label>
              <a href="#" className="text-xs text-cyber-cyan hover:underline">Forgot password?</a>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-900/90 border border-cyber-border/60 text-sm text-gray-100 focus:outline-none focus:border-cyber-cyan transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyber-cyan to-sky-400 text-black font-extrabold text-sm shadow-cyber hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            {loading ? "Authenticating..." : "Sign In to Platform"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="border-t border-slate-800 w-full" />
          <span className="bg-slate-950 px-3 text-[10px] uppercase font-mono text-gray-500 absolute">Or continue with</span>
        </div>

        {/* Google SSO Button */}
        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-gray-200 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
          Google Enterprise SSO
        </button>

        <p className="text-center text-xs text-gray-500">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-cyber-cyan font-bold hover:underline">
            Start Free Trial
          </Link>
        </p>
      </div>
    </div>
  );
}
