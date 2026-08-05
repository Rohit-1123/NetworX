"use client";

import React, { useState } from "react";
import { THREAT_INTEL_FEED } from "@/lib/mockData";
import { ShieldAlert, ExternalLink, Flame, Shield, Search, Filter, Bug, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ThreatIntelPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFeed = THREAT_INTEL_FEED.filter((item) => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesQuery = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         (item.cveId || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.affectedComponent.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-cyber-dark/90 border border-cyber-border shadow-cyber">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-xl text-white">Live Threat Intelligence & CVE Feed</h1>
            <p className="text-xs text-gray-400">
              Curated zero-day exploits, OWASP risk updates, and MITRE ATT&CK enterprise techniques.
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search CVE-2026, OWASP, technique..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-gray-100 focus:outline-none focus:border-cyber-cyan"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {["All", "Zero-Day", "CVE", "OWASP", "MITRE"].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all shrink-0",
              activeCategory === cat
                ? "bg-cyber-cyan text-black shadow-cyber"
                : "bg-slate-900 border border-slate-800 text-gray-400 hover:text-white"
            )}
          >
            {cat} {cat === "Zero-Day" && "🔥"}
          </button>
        ))}
      </div>

      {/* THREAT INTEL CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredFeed.map((item) => (
          <div
            key={item.id}
            className="glass-card glass-card-hover p-6 rounded-2xl border border-cyber-border/40 space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    "px-2.5 py-0.5 rounded text-[10px] uppercase font-mono font-bold border",
                    item.category === "Zero-Day" ? "bg-red-500/20 text-red-400 border-red-500/40 animate-pulse" :
                    item.category === "CVE" ? "bg-orange-500/20 text-orange-400 border-orange-500/40" :
                    item.category === "OWASP" ? "bg-purple-500/20 text-purple-400 border-purple-500/40" :
                    "bg-cyber-cyan/20 text-cyber-cyan border-cyber-cyan/40"
                  )}
                >
                  {item.category} {item.cveId ? `• ${item.cveId}` : ""}
                </span>
                <span className="text-xs font-mono font-extrabold text-red-400">
                  CVSS {item.cvssScore} ({item.severity})
                </span>
              </div>

              <h3 className="font-bold text-base text-white">{item.title}</h3>
              <p className="text-xs text-gray-300 leading-relaxed font-sans">{item.description}</p>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
              <span className="text-gray-500 text-[11px]">Affected: {item.affectedComponent}</span>
              <a
                href={item.mitigationUrl}
                target="_blank"
                rel="noreferrer"
                className="text-cyber-cyan font-bold hover:underline flex items-center gap-1"
              >
                Advisory <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
