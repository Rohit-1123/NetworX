"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Shield, Zap, Sparkles, HelpCircle, ArrowRight, Star } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { CyberTwinBackgroundCanvas } from "@/components/cyber/CyberTwinBackgroundCanvas";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const starterPrice = billingCycle === "yearly" ? 159 : 199;
  const proPrice = billingCycle === "yearly" ? 479 : 599;

  const faqs = [
    {
      q: "How does the 14-day free trial work?",
      a: "You get full access to all Professional tier features including Cyber Twin, Attack GPS, and Decision Lab for 14 days. No credit card required to start."
    },
    {
      q: "Can I upgrade or downgrade my plan at any time?",
      a: "Yes, you can upgrade, downgrade, or adjust your device limits directly from your Subscription settings page in the dashboard."
    },
    {
      q: "How does NetworX integrate with existing EDR or SIEM tools?",
      a: "NetworX includes ready-made API integrations for CrowdStrike, SentinelOne, Microsoft Defender XDR, Palo Alto Panorama, Splunk, and AWS Security Hub."
    },
    {
      q: "Does AI Copilot execute actions automatically?",
      a: "Never. NetworX follows a strict Human-in-the-Loop decision intelligence protocol. AI Copilot recommends containment actions, CLI scripts, and rollback steps, requiring your security team's approval before execution."
    }
  ];

  return (
    <div className="min-h-screen bg-cyber-dark text-gray-100 relative overflow-hidden flex flex-col">
      <CyberTwinBackgroundCanvas />
      <Navbar />

      <main className="flex-1 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="px-3 py-1 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono font-bold uppercase tracking-widest">
            Predictable B2B SaaS Plans
          </span>
          <h1 className="mt-4 text-4xl sm:text-6xl font-extrabold text-white">
            Cyber Decision Intelligence for Every Team
          </h1>
          <p className="mt-4 text-gray-400 text-lg">
            Deploy NetworX in minutes. Scalable plans tailored from fast-growing startups to global enterprises.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="mt-8 inline-flex items-center p-1.5 rounded-full bg-slate-900 border border-cyber-border/60">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                billingCycle === "monthly"
                  ? "bg-cyber-cyan text-black shadow-cyber"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-bold transition-all ${
                billingCycle === "yearly"
                  ? "bg-cyber-cyan text-black shadow-cyber"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <span>Yearly Billing</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] uppercase border border-emerald-500/40">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* PRICING CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 items-stretch">
          {/* Starter Plan */}
          <div className="glass-card glass-card-hover p-8 rounded-2xl flex flex-col justify-between border border-cyber-border/40">
            <div>
              <div className="text-sm font-mono font-bold text-gray-400 uppercase">Starter Plan</div>
              <p className="text-xs text-gray-500 mt-1">Ideal for small businesses & startups</p>
              <div className="my-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">${starterPrice}</span>
                <span className="text-xs text-gray-400">/ month</span>
              </div>
              <ul className="space-y-3 text-xs text-gray-300 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Up to <strong>20 devices</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>AI Threat Detection Engine</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Basic Security Reports & IoCs</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Standard Email Support</span>
                </li>
              </ul>
            </div>
            <Link
              href="/signup?plan=starter"
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs text-center border border-slate-700 transition-colors"
            >
              Start Free Trial
            </Link>
          </div>

          {/* Professional Plan (POPULAR) */}
          <div className="glass-card p-8 rounded-2xl flex flex-col justify-between border-2 border-cyber-cyan shadow-cyber relative transform md:-translate-y-2 bg-slate-900/90">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-cyber-cyan to-sky-400 text-black text-[10px] font-extrabold uppercase tracking-widest shadow-cyber">
              Most Popular
            </div>
            <div>
              <div className="flex items-center justify-between">
                <div className="text-sm font-mono font-bold text-cyber-cyan uppercase">Professional Plan</div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyber-cyan/20 text-cyber-cyan font-bold uppercase border border-cyber-cyan/40">
                  Medium Companies
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Full decision intelligence suite for up to 500 devices</p>
              <div className="my-6 flex items-baseline gap-1">
                <span className="text-5xl font-extrabold text-white">${proPrice}</span>
                <span className="text-xs text-gray-400">/ month</span>
              </div>

              {/* Core Features list */}
              <ul className="space-y-3 text-xs text-gray-200 mb-8">
                <li className="flex items-center gap-2 font-semibold text-white">
                  <Check className="w-4 h-4 text-cyber-cyan shrink-0" />
                  <span>Up to <strong>500 devices</strong></span>
                </li>
                <li className="flex items-center gap-2 font-semibold text-white">
                  <Check className="w-4 h-4 text-cyber-cyan shrink-0" />
                  <span>Interactive <strong>Cyber Twin</strong> Network Map</span>
                </li>
                <li className="flex items-center gap-2 font-semibold text-white">
                  <Check className="w-4 h-4 text-cyber-cyan shrink-0" />
                  <span><strong>Attack GPS</strong> Vector Propagation</span>
                </li>
                <li className="flex items-center gap-2 font-semibold text-white">
                  <Check className="w-4 h-4 text-cyber-cyan shrink-0" />
                  <span><strong>AI Copilot</strong> Assistant (Human-in-the-Loop)</span>
                </li>
                <li className="flex items-center gap-2 font-semibold text-white">
                  <Check className="w-4 h-4 text-cyber-cyan shrink-0" />
                  <span><strong>Decision Lab</strong> Strategy Simulator</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyber-cyan shrink-0" />
                  <span>Instant <strong>Email & Slack Alerts</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyber-cyan shrink-0" />
                  <span>Standard Threat Intelligence & CVE Feed</span>
                </li>
              </ul>
            </div>
            <Link
              href="/signup?plan=pro"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyber-cyan to-sky-400 text-black font-extrabold text-xs text-center shadow-cyber hover:scale-105 transition-all"
            >
              Start Free Trial
            </Link>
          </div>

          {/* Enterprise Plan */}
          <div className="glass-card glass-card-hover p-8 rounded-2xl flex flex-col justify-between border border-cyber-border/40">
            <div>
              <div className="text-sm font-mono font-bold text-purple-400 uppercase">Enterprise Plan</div>
              <p className="text-xs text-gray-500 mt-1">For global enterprises & Defense</p>
              <div className="my-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">Custom</span>
                <span className="text-xs text-gray-400">/ tailored SLA</span>
              </div>
              <ul className="space-y-3 text-xs text-gray-300 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-400 shrink-0" />
                  <span><strong>Unlimited devices & users</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>Custom AI Guardrail Policies</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>Multi-Organization & RBAC</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>Full SOC Integrations & REST API</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>24/7 Dedicated Priority Support</span>
                </li>
              </ul>
            </div>
            <Link
              href="/signup?plan=enterprise"
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs text-center border border-slate-700 transition-colors"
            >
              Contact Enterprise Sales
            </Link>
          </div>
        </div>

        {/* FAQs SECTION */}
        <div className="max-w-3xl mx-auto mt-20 pt-16 border-t border-cyber-border/40">
          <div className="text-center mb-12">
            <h2 className="text-xs font-mono font-bold text-cyber-cyan uppercase tracking-widest mb-2">Got Questions?</h2>
            <h3 className="text-3xl font-bold text-white">Frequently Asked Questions</h3>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="glass-card rounded-xl border border-cyber-border/40 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between font-semibold text-sm text-gray-200 hover:text-cyber-cyan transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className="text-cyber-cyan text-lg">{openFaq === index ? "−" : "+"}</span>
                </button>
                {openFaq === index && (
                  <div className="px-5 pb-5 text-xs text-gray-400 leading-relaxed border-t border-slate-800 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="bg-slate-950 border-t border-cyber-border/40 py-8 px-4 text-xs text-gray-500 text-center z-10">
        © 2026 NetworX Inc. Production-grade Cyber Decision Platform.
      </footer>
    </div>
  );
}
