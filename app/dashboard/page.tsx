"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  ShieldAlert, 
  Laptop, 
  Ban, 
  ArrowUpRight, 
  Cpu, 
  GitPullRequest, 
  Zap, 
  Bot, 
  FileText,
  AlertTriangle,
  ChevronRight,
  TrendingUp,
  Activity
} from "lucide-react";
import { INITIAL_CYBER_NODES } from "@/lib/mockData";

export default function DashboardOverview() {
  const compromisedCount = INITIAL_CYBER_NODES.filter(n => n.data.status === "red").length;
  const suspiciousCount = INITIAL_CYBER_NODES.filter(n => n.data.status === "orange").length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-950 border border-cyber-border shadow-cyber">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono font-bold text-cyber-cyan uppercase tracking-widest mb-1">
            <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-ping" />
            <span>NetworX Security Posture Monitor</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Security Posture: <span className="text-cyber-cyan">84/100</span> (Optimal)
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            1 Active Critical Threat Path detected on Finance Laptop (192.168.1.104). Immediate containment recommended.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/dashboard/cyber-twin"
            className="px-4 py-2.5 rounded-xl bg-cyber-cyan text-black font-extrabold text-xs shadow-cyber hover:scale-105 transition-all flex items-center gap-2"
          >
            <Cpu className="w-4 h-4" />
            <span>Launch Cyber Twin</span>
          </Link>
          <Link
            href="/dashboard/decision-lab"
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-gray-200 font-bold text-xs border border-slate-700 transition-colors flex items-center gap-2"
          >
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Simulate Strategy</span>
          </Link>
        </div>
      </div>

      {/* STAT CARDS MATRIX */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Security Score */}
        <div className="glass-card glass-card-hover p-6 rounded-2xl border border-cyber-border/40 space-y-3">
          <div className="flex justify-between items-center text-xs font-mono text-gray-400">
            <span>Overall Score</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-white">84</span>
            <span className="text-xs text-emerald-400 font-mono font-bold flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" /> +4 pts
            </span>
          </div>
          <p className="text-[11px] text-gray-500">Based on NIST & MITRE ATT&CK risk benchmarks</p>
        </div>

        {/* Active Threats */}
        <div className="glass-card glass-card-hover p-6 rounded-2xl border border-red-500/30 space-y-3 bg-red-950/20">
          <div className="flex justify-between items-center text-xs font-mono text-gray-400">
            <span>Active Threats</span>
            <ShieldAlert className="w-4 h-4 text-red-400 animate-pulse" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-red-400">{compromisedCount}</span>
            <span className="text-xs text-orange-400 font-mono">({suspiciousCount} Suspicious)</span>
          </div>
          <p className="text-[11px] text-red-300">Cobalt Strike beacon on Finance Laptop</p>
        </div>

        {/* Protected Devices */}
        <div className="glass-card glass-card-hover p-6 rounded-2xl border border-cyber-border/40 space-y-3">
          <div className="flex justify-between items-center text-xs font-mono text-gray-400">
            <span>Protected Devices</span>
            <Laptop className="w-4 h-4 text-cyber-cyan" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-white">482</span>
            <span className="text-xs text-gray-500">/ 500 limit</span>
          </div>
          <p className="text-[11px] text-gray-500">Agent health 99.8% across endpoints</p>
        </div>

        {/* Blocked Attacks */}
        <div className="glass-card glass-card-hover p-6 rounded-2xl border border-cyber-border/40 space-y-3">
          <div className="flex justify-between items-center text-xs font-mono text-gray-400">
            <span>Blocked Attacks (24h)</span>
            <Ban className="w-4 h-4 text-purple-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-white">4,280</span>
            <span className="text-xs text-purple-400 font-mono">+12%</span>
          </div>
          <p className="text-[11px] text-gray-500">Edge firewall & automated macro blocks</p>
        </div>
      </div>

      {/* MAIN TWO-COLUMN CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Active Threat Incidents Table */}
        <div className="lg:col-span-2 glass-card p-6 rounded-2xl border border-cyber-border/40 space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-cyber-border/40">
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-cyber-cyan" />
              <h3 className="font-bold text-lg text-white">Real-Time Threat Vector Feed</h3>
            </div>
            <Link href="/dashboard/attack-gps" className="text-xs font-bold text-cyber-cyan hover:underline flex items-center gap-1">
              View Attack GPS Map <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="text-gray-500 border-b border-slate-800 uppercase font-semibold">
                  <th className="py-2.5 px-3">Severity</th>
                  <th className="py-2.5 px-3">Target Node</th>
                  <th className="py-2.5 px-3">Technique</th>
                  <th className="py-2.5 px-3">AI Confidence</th>
                  <th className="py-2.5 px-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                <tr className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/40 uppercase animate-pulse">
                      Critical
                    </span>
                  </td>
                  <td className="py-3 px-3 text-gray-200 font-bold">192.168.1.104 (Finance)</td>
                  <td className="py-3 px-3 text-gray-400">T1059.001 (PowerShell)</td>
                  <td className="py-3 px-3 text-cyber-cyan font-bold">97%</td>
                  <td className="py-3 px-3">
                    <Link href="/dashboard/decision-lab" className="text-xs font-bold text-amber-400 hover:underline">
                      Simulate Response →
                    </Link>
                  </td>
                </tr>
                <tr className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-500/20 text-orange-400 border border-orange-500/40 uppercase">
                      High
                    </span>
                  </td>
                  <td className="py-3 px-3 text-gray-200 font-bold">10.0.2.50 (App Server)</td>
                  <td className="py-3 px-3 text-gray-400">T1021.002 (Kerberos)</td>
                  <td className="py-3 px-3 text-cyber-cyan font-bold">88%</td>
                  <td className="py-3 px-3">
                    <Link href="/dashboard/ai-copilot" className="text-xs font-bold text-cyber-cyan hover:underline">
                      Ask Copilot →
                    </Link>
                  </td>
                </tr>
                <tr className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-500/20 text-sky-400 border border-sky-500/40 uppercase">
                      Isolated
                    </span>
                  </td>
                  <td className="py-3 px-3 text-gray-200 font-bold">192.168.1.140 (Dev PC)</td>
                  <td className="py-3 px-3 text-gray-400">Policy Sweep</td>
                  <td className="py-3 px-3 text-cyber-cyan font-bold">99%</td>
                  <td className="py-3 px-3">
                    <span className="text-xs text-gray-500">Contained</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 1 Col: Quick Feature Navigation */}
        <div className="glass-card p-6 rounded-2xl border border-cyber-border/40 space-y-4">
          <h3 className="font-bold text-lg text-white">Decision Intelligence Modules</h3>
          <p className="text-xs text-gray-400">Jump directly to NetworX decision tools:</p>

          <div className="space-y-3">
            <Link
              href="/dashboard/cyber-twin"
              className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyber-cyan/40 hover:bg-slate-800 transition-all group"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-200 group-hover:text-cyber-cyan">Cyber Twin</div>
                  <div className="text-[11px] text-gray-500">Interactive topology map</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-white" />
            </Link>

            <Link
              href="/dashboard/attack-gps"
              className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyber-cyan/40 hover:bg-slate-800 transition-all group"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-red-500/10 text-red-400">
                  <GitPullRequest className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-200 group-hover:text-cyber-cyan">Attack GPS</div>
                  <div className="text-[11px] text-gray-500">Visual attack propagation</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-white" />
            </Link>

            <Link
              href="/dashboard/decision-lab"
              className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyber-cyan/40 hover:bg-slate-800 transition-all group"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-200 group-hover:text-cyber-cyan">Decision Lab</div>
                  <div className="text-[11px] text-gray-500">Simulate response tradeoffs</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-white" />
            </Link>

            <Link
              href="/dashboard/ai-copilot"
              className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyber-cyan/40 hover:bg-slate-800 transition-all group"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-200 group-hover:text-cyber-cyan">AI Copilot</div>
                  <div className="text-[11px] text-gray-500">Interactive chat assistant</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-white" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
