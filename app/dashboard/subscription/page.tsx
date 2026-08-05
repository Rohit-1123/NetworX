"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Crown, Check, Zap, Cpu, GitPullRequest, Bot, Shield, CreditCard, ArrowUpRight, Download, Laptop, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SubscriptionPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");

  const invoices = [
    { id: "INV-2026-08", date: "Aug 1, 2026", amount: "$479.00", status: "Paid", plan: "Professional Tier (Yearly)" },
    { id: "INV-2026-07", date: "Jul 1, 2026", amount: "$479.00", status: "Paid", plan: "Professional Tier (Yearly)" },
    { id: "INV-2026-06", date: "Jun 1, 2026", amount: "$479.00", status: "Paid", plan: "Professional Tier (Yearly)" },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-cyber-dark/90 border border-cyber-border shadow-cyber">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-amber-500/20 to-purple-500/30 border border-amber-500/40 text-amber-400">
            <Crown className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-xl text-white flex items-center gap-2">
              Subscription & License Management
              <span className="px-2 py-0.5 rounded text-[10px] uppercase font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                Professional Tier Active
              </span>
            </h1>
            <p className="text-xs text-gray-400">
              Manage your active subscription plan, device quotas, billing cycles, and feature entitlements.
            </p>
          </div>
        </div>

        <Link
          href="/pricing"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyber-cyan to-sky-400 text-black font-extrabold text-xs shadow-cyber hover:scale-105 transition-all"
        >
          <span>Upgrade to Enterprise Plan</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      {/* ACTIVE PROFESSIONAL TIER CARD */}
      <div className="glass-card p-8 rounded-2xl border-2 border-cyber-cyan shadow-cyber space-y-6 bg-slate-900/90 relative overflow-hidden">
        <div className="absolute top-0 right-0 px-6 py-1.5 bg-cyber-cyan text-black font-mono font-extrabold text-[10px] uppercase tracking-widest rounded-bl-xl shadow-cyber">
          Active Subscription
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-6 border-b border-slate-800 pb-6">
          <div>
            <span className="text-xs font-mono font-bold uppercase text-cyber-cyan">Selected SaaS Plan</span>
            <h2 className="text-3xl font-extrabold text-white mt-1">Professional Plan</h2>
            <p className="text-xs text-gray-400 mt-1">Tailored for medium companies & enterprise security teams.</p>
          </div>

          <div className="text-left md:text-right">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-white">$479</span>
              <span className="text-xs text-gray-400 font-mono">/ month (Billed Yearly)</span>
            </div>
            <span className="text-[11px] text-emerald-400 font-mono font-bold mt-1 block">
              ✓ 20% Annual Discount Applied • Next Renewal Aug 1, 2027
            </span>
          </div>
        </div>

        {/* DEVICE QUOTA PROGRESS */}
        <div className="space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs">
          <div className="flex justify-between items-center text-gray-300">
            <span className="flex items-center gap-2 font-bold text-white">
              <Laptop className="w-4 h-4 text-cyber-cyan" /> Endpoint Device Usage Quota
            </span>
            <span className="text-cyber-cyan font-bold">482 / 500 Devices (96.4% Utilized)</span>
          </div>
          <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
            <div className="bg-gradient-to-r from-cyber-cyan to-amber-400 h-full w-[96.4%]" />
          </div>
          <p className="text-[10px] text-gray-400 pt-1">
            Need more than 500 endpoints? <Link href="/pricing" className="text-cyber-cyan font-bold hover:underline">Upgrade to Enterprise for Unlimited Devices</Link>
          </p>
        </div>

        {/* FEATURE ENTITLEMENTS GRID */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-cyber-cyan">
            Included Professional Tier Decision Modules
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/40 space-y-1">
              <div className="flex items-center justify-between font-bold text-white">
                <span className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-emerald-400" /> Cyber Twin
                </span>
                <span className="text-[10px] text-emerald-400">ENABLED</span>
              </div>
              <p className="text-[11px] text-gray-400 font-sans">Interactive node map with healthy, suspicious, compromised, and isolated states.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/40 space-y-1">
              <div className="flex items-center justify-between font-bold text-white">
                <span className="flex items-center gap-2">
                  <GitPullRequest className="w-4 h-4 text-red-400" /> Attack GPS
                </span>
                <span className="text-[10px] text-emerald-400">ENABLED</span>
              </div>
              <p className="text-[11px] text-gray-400 font-sans">Predictive attack vector propagation & breach forecasting.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/40 space-y-1">
              <div className="flex items-center justify-between font-bold text-white">
                <span className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-purple-400" /> AI Copilot
                </span>
                <span className="text-[10px] text-emerald-400">ENABLED</span>
              </div>
              <p className="text-[11px] text-gray-400 font-sans">Human-in-the-loop CLI action recommendations and rollback scripts.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/40 space-y-1">
              <div className="flex items-center justify-between font-bold text-white">
                <span className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" /> Decision Lab
                </span>
                <span className="text-[10px] text-emerald-400">ENABLED</span>
              </div>
              <p className="text-[11px] text-gray-400 font-sans">Response strategy simulation comparing downtime vs containment %.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/40 space-y-1">
              <div className="flex items-center justify-between font-bold text-white">
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-cyber-cyan" /> Email & Slack Alerts
                </span>
                <span className="text-[10px] text-emerald-400">ENABLED</span>
              </div>
              <p className="text-[11px] text-gray-400 font-sans">Instant webhook dispatch on critical threat detection.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1 opacity-60">
              <div className="flex items-center justify-between font-bold text-gray-400">
                <span>Multi-Org & Custom Policies</span>
                <span className="text-[10px] text-amber-400">ENTERPRISE</span>
              </div>
              <p className="text-[11px] text-gray-500 font-sans">Custom AI guardrails and multi-tenant RBAC management.</p>
            </div>
          </div>
        </div>
      </div>

      {/* BILLING HISTORY */}
      <div className="glass-card p-6 rounded-2xl border border-cyber-border/40 space-y-4 font-mono text-xs">
        <h3 className="font-bold text-base text-white font-sans flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-cyber-cyan" /> Payment Method & Invoices
        </h3>

        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="px-3 py-1.5 rounded bg-slate-800 text-white font-bold text-xs border border-slate-700">
              VISA
            </div>
            <div>
              <div className="font-bold text-white">Visa ending in 8842</div>
              <div className="text-[10px] text-gray-500">Expires 09/2028 • Billed annually</div>
            </div>
          </div>
          <button className="px-3 py-1.5 rounded-lg bg-slate-800 text-gray-200 font-bold hover:bg-slate-700">
            Edit Payment
          </button>
        </div>

        <div className="overflow-x-auto pt-2">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-gray-500 border-b border-slate-800 uppercase font-semibold">
                <th className="py-2.5 px-3">Invoice ID</th>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Description</th>
                <th className="py-2.5 px-3">Amount</th>
                <th className="py-2.5 px-3">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-3 px-3 font-bold text-cyber-cyan">{inv.id}</td>
                  <td className="py-3 px-3 text-gray-400">{inv.date}</td>
                  <td className="py-3 px-3 text-gray-200">{inv.plan}</td>
                  <td className="py-3 px-3 font-bold text-white">{inv.amount}</td>
                  <td className="py-3 px-3">
                    <button className="text-xs font-bold text-cyber-cyan hover:underline flex items-center gap-1">
                      <Download className="w-3.5 h-3.5" /> PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
