"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, 
  Lock, 
  ArrowRight, 
  Terminal, 
  Cpu, 
  Zap, 
  Bot, 
  Fingerprint, 
  Building2, 
  Key, 
  Sparkles,
  ShieldAlert,
  Activity,
  CheckCircle2,
  Globe
} from "lucide-react";
import { CyberTwinBackgroundCanvas } from "@/components/cyber/CyberTwinBackgroundCanvas";

export default function AccessPortalPage() {
  const router = useRouter();
  const [authMode, setAuthMode] = useState<"quick" | "sso">("quick");
  const [loadingPersona, setLoadingPersona] = useState<string | null>(null);

  const handleLaunchDashboard = (persona: string, path: string = "/dashboard") => {
    setLoadingPersona(persona);
    setTimeout(() => {
      router.push(path);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-cyber-dark text-gray-100 relative overflow-hidden flex flex-col items-center justify-center p-4 sm:p-6">
      {/* Background Animated Canvas */}
      <CyberTwinBackgroundCanvas />

      {/* Background Ambient Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-cyan/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Glassmorphic Access Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl glass-card p-6 sm:p-10 rounded-3xl border border-cyber-border/60 shadow-cyber z-10 relative space-y-8"
      >
        {/* Brand Header & Live System Ticker */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-cyber-border/40">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-2xl bg-gradient-to-tr from-cyber-cyan/20 to-sky-500/30 border border-cyber-cyan/50 shadow-cyber">
              <Shield className="w-8 h-8 text-cyber-cyan" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-extrabold tracking-wider text-white">
                  NETWOR<span className="text-cyber-cyan">X</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-cyber-cyan/20 text-cyber-cyan font-mono border border-cyber-cyan/40">
                  AI DECISION PLATFORM
                </span>
              </div>
              <p className="text-xs text-gray-400 font-mono mt-0.5">
                Cyber Decision Intelligence Portal • v2.4 Enterprise
              </p>
            </div>
          </div>

          {/* System Ticker Badge */}
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-cyber-border text-xs font-mono">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-gray-300">SOC Alpha Live</span>
            <span className="text-gray-600">|</span>
            <span className="text-cyber-cyan font-bold">1 Active Threat Path</span>
          </div>
        </div>

        {/* Access Gateway Main Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left Column: Quick Launch Personas */}
          <div className="md:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyber-cyan flex items-center gap-1.5 mb-2">
                <Sparkles className="w-4 h-4" /> Instant SOC Workspace Launcher
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                Enter NetworX <br />
                <span className="bg-gradient-to-r from-cyber-cyan via-sky-400 to-purple-400 bg-clip-text text-transparent">
                  Decision Intelligence Portal
                </span>
              </h1>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                One-click authentication into the live Cyber Twin graph, predictive Attack GPS, Decision Lab simulator, and AI Copilot engine.
              </p>
            </div>

            {/* Persona Access Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => handleLaunchDashboard("soc", "/dashboard")}
                disabled={loadingPersona !== null}
                className="w-full p-4 rounded-2xl bg-gradient-to-r from-cyber-cyan via-sky-400 to-cyber-blue text-black font-extrabold text-sm shadow-cyber hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-between group"
              >
                <div className="flex items-center space-x-3 text-left">
                  <div className="p-2 rounded-xl bg-black/20 text-black">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-extrabold">Launch Tier-3 SOC Dashboard</div>
                    <div className="text-[11px] opacity-80 font-mono font-medium">Full Cyber Twin & Real-Time Isolation Console</div>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleLaunchDashboard("twin", "/dashboard/cyber-twin")}
                  disabled={loadingPersona !== null}
                  className="p-3.5 rounded-xl bg-slate-900/90 border border-cyber-border hover:border-cyber-cyan/50 text-left hover:bg-slate-800 transition-all group"
                >
                  <div className="flex items-center space-x-2 text-cyber-cyan font-bold text-xs mb-1">
                    <Activity className="w-4 h-4" />
                    <span>Cyber Twin Map</span>
                  </div>
                  <p className="text-[10px] text-gray-400">Interactive Node Graph</p>
                </button>

                <button
                  onClick={() => handleLaunchDashboard("copilot", "/dashboard/ai-copilot")}
                  disabled={loadingPersona !== null}
                  className="p-3.5 rounded-xl bg-slate-900/90 border border-cyber-border hover:border-purple-400/50 text-left hover:bg-slate-800 transition-all group"
                >
                  <div className="flex items-center space-x-2 text-purple-400 font-bold text-xs mb-1">
                    <Bot className="w-4 h-4" />
                    <span>AI Copilot Engine</span>
                  </div>
                  <p className="text-[10px] text-gray-400">Human-In-The-Loop</p>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Biometric / SSO Quick Access Card */}
          <div className="md:col-span-5 p-6 rounded-2xl bg-slate-950/80 border border-cyber-border/60 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono font-bold uppercase text-gray-300 flex items-center gap-1.5">
                <Fingerprint className="w-4 h-4 text-cyber-cyan" /> Access Authentication
              </span>
              <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Verified
              </span>
            </div>

            {/* Preset Credentials Display */}
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] text-gray-500 block uppercase">Active Enterprise Workspace</span>
                <div className="font-bold text-white flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5 text-cyber-cyan" />
                  Acme Cyber Security Corp
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] text-gray-500 block uppercase">Assigned Security Clearance</span>
                <div className="font-bold text-cyber-cyan flex items-center gap-2">
                  <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                  Level 5 • Lead Security Analyst
                </div>
              </div>
            </div>

            {/* Direct 1-Click Launch Button */}
            <button
              onClick={() => handleLaunchDashboard("sso", "/dashboard")}
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyber-cyan/40 text-gray-100 font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-cyber"
            >
              {loadingPersona ? (
                <span className="flex items-center gap-2 text-cyber-cyan">
                  <Terminal className="w-4 h-4 animate-spin" /> Authenticating Session...
                </span>
              ) : (
                <>
                  <Key className="w-4 h-4 text-cyber-cyan" />
                  <span>Enter Platform directly →</span>
                </>
              )}
            </button>

            {/* Pricing & Settings Footer Links */}
            <div className="flex items-center justify-between text-[11px] text-gray-500 pt-2 border-t border-slate-900">
              <Link href="/pricing" className="hover:text-cyber-cyan">Pricing Plans</Link>
              <Link href="/login" className="hover:text-cyber-cyan">Classic Login</Link>
              <Link href="/dashboard/settings" className="hover:text-cyber-cyan">System Settings</Link>
            </div>
          </div>
        </div>

        {/* Live Platform Security Metrics Footer */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-cyber-border/30 text-xs font-mono">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-gray-500 block text-[10px] uppercase">Overall Posture</span>
            <span className="font-bold text-emerald-400 text-sm">84 / 100</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-gray-500 block text-[10px] uppercase">Compromised Nodes</span>
            <span className="font-bold text-red-400 text-sm">1 Host (Finance)</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-gray-500 block text-[10px] uppercase">Protected Endpoints</span>
            <span className="font-bold text-white text-sm">482 Devices</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-gray-500 block text-[10px] uppercase">Cyber Twin Status</span>
            <span className="font-bold text-cyber-cyan text-sm">99.98% Active</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
