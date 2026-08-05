"use client";

import React, { useState } from "react";
import { Settings, Key, Bell, Shield, Moon, Check, Copy } from "lucide-react";

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState("nx_live_9f83a2c41890e72b49d6");
  const [copied, setCopied] = useState(false);
  const [humanInLoop, setHumanInLoop] = useState(true);

  const handleGenerateKey = () => {
    const newKey = `nx_live_${Math.random().toString(36).substring(2, 18)}`;
    setApiKey(newKey);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-3 p-6 rounded-2xl bg-cyber-dark/90 border border-cyber-border shadow-cyber">
        <div className="p-2 rounded-xl bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan">
          <Settings className="w-6 h-6" />
        </div>
        <div>
          <h1 className="font-bold text-xl text-white">System & AI Decision Settings</h1>
          <p className="text-xs text-gray-400">
            Configure notification channels, API access keys, and AI guardrail execution policy.
          </p>
        </div>
      </div>

      {/* AI GUARDRAILS */}
      <div className="glass-card p-6 rounded-2xl border border-cyber-border/40 space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-cyber-cyan" />
              AI Decision Guardrails (Human-in-the-Loop)
            </h3>
            <p className="text-xs text-gray-400">
              When enabled, AI Copilot will NEVER auto-execute containment CLI actions without explicit human approval.
            </p>
          </div>

          <button
            onClick={() => setHumanInLoop(!humanInLoop)}
            className={`w-12 h-6 rounded-full transition-colors p-1 flex items-center ${
              humanInLoop ? "bg-cyber-cyan justify-end" : "bg-slate-800 justify-start"
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-black shadow" />
          </button>
        </div>
      </div>

      {/* API KEYS GENERATOR */}
      <div className="glass-card p-6 rounded-2xl border border-cyber-border/40 space-y-4">
        <h3 className="font-bold text-base text-white flex items-center gap-2">
          <Key className="w-4 h-4 text-amber-400" />
          NetworX REST API Keys
        </h3>
        <p className="text-xs text-gray-400">Use this secret key to authenticate SIEM webhooks and CrowdStrike EDR integrations.</p>

        <div className="flex items-center gap-2 font-mono text-xs">
          <input
            type="text"
            readOnly
            value={apiKey}
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 focus:outline-none"
          />
          <button
            onClick={handleCopy}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-gray-200 font-bold border border-slate-700 flex items-center gap-1.5"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? "Copied!" : "Copy"}</span>
          </button>
          <button
            onClick={handleGenerateKey}
            className="px-4 py-2.5 rounded-xl bg-cyber-cyan text-black font-bold shadow-cyber hover:scale-105 transition-all"
          >
            Roll Key
          </button>
        </div>
      </div>

      {/* NOTIFICATIONS PREFERENCES */}
      <div className="glass-card p-6 rounded-2xl border border-cyber-border/40 space-y-4 text-xs font-mono">
        <h3 className="font-bold text-base text-white flex items-center gap-2 font-sans">
          <Bell className="w-4 h-4 text-purple-400" />
          Alert Channels
        </h3>
        <div className="space-y-3">
          <label className="flex items-center space-x-3 text-gray-300 cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded accent-cyber-cyan" />
            <span>Email Critical Threat Alerts (Immediate dispatch)</span>
          </label>
          <label className="flex items-center space-x-3 text-gray-300 cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded accent-cyber-cyan" />
            <span>Slack #soc-alerts Webhook Integration</span>
          </label>
          <label className="flex items-center space-x-3 text-gray-300 cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded accent-cyber-cyan" />
            <span>Cyber Twin Automatic Isolation Notifications</span>
          </label>
        </div>
      </div>
    </div>
  );
}
