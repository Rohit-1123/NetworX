"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Bell, Command, Building2, Crown, User, Check, ShieldAlert, Sparkles } from "lucide-react";
import { CommandPalette } from "@/components/ui/CommandPalette";

export function Header() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);

  const notifications = [
    {
      id: 1,
      title: "Critical Threat Detected",
      desc: "PowerShell beacon spawn on Finance Laptop (192.168.1.104)",
      time: "2m ago",
      type: "critical"
    },
    {
      id: 2,
      title: "Cyber Twin Isolation Triggered",
      desc: "Dev Laptop 192.168.1.140 automatically isolated",
      time: "15m ago",
      type: "info"
    },
    {
      id: 3,
      title: "Decision Strategy Recommended",
      desc: "AI Copilot ready with 3 containment scenarios for INC-8841",
      time: "32m ago",
      type: "ai"
    }
  ];

  return (
    <>
      <header className="h-16 border-b border-cyber-border/40 bg-cyber-dark/80 backdrop-blur-xl px-6 flex items-center justify-between sticky top-0 z-20">
        {/* Left: Search / Command Palette trigger */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setCommandPaletteOpen(true)}
            aria-label="Open command palette"
            className="flex items-center space-x-3 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-cyber-border/60 text-gray-400 hover:text-white hover:border-cyber-cyan/40 transition-all text-xs font-mono w-64 md:w-80 group"
          >
            <Search className="w-4 h-4 text-cyber-cyan group-hover:scale-110 transition-transform" />
            <span className="flex-1 text-left truncate">Search devices, CVEs, commands...</span>
            <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] rounded bg-slate-800 border border-slate-700 text-gray-400">
              <Command className="w-3 h-3" /> K
            </kbd>
          </button>
        </div>

        {/* Right Controls */}
        <div className="flex items-center space-x-4">
          {/* Org selector */}
          <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-cyber-border/40 text-xs">
            <Building2 className="w-4 h-4 text-cyber-cyan" />
            <span className="text-gray-200 font-semibold">Acme Corp HQ</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono">SOC Alpha</span>
          </div>

          {/* Subscription badge */}
          <Link
            href="/dashboard/subscription"
            className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500/10 to-purple-500/10 border border-amber-500/30 text-xs text-amber-300 hover:border-amber-500/60 transition-colors"
          >
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold">Professional Tier</span>
          </Link>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => {
                setNotificationsOpen(!notificationsOpen);
                if (unreadCount > 0) setUnreadCount(0);
              }}
              aria-label="Toggle security alerts"
              aria-expanded={notificationsOpen}
              className="p-2 rounded-lg bg-slate-900/60 border border-cyber-border/40 text-gray-300 hover:text-cyber-cyan hover:border-cyber-cyan/40 transition-colors relative"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Popover */}
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-cyber-dark/95 border border-cyber-border rounded-xl shadow-cyber p-3 z-50">
                <div className="flex items-center justify-between pb-2 border-b border-cyber-border/40 text-xs font-semibold text-gray-200">
                  <span>Recent Security Alerts</span>
                  <span className="text-cyber-cyan">NetworX AI</span>
                </div>
                <div className="space-y-2 mt-2">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-xs">
                      <div className="flex items-center justify-between text-gray-200 font-medium">
                        <span className="flex items-center gap-1.5">
                          {n.type === "critical" ? <ShieldAlert className="w-3.5 h-3.5 text-red-400" /> : <Sparkles className="w-3.5 h-3.5 text-cyber-cyan" />}
                          {n.title}
                        </span>
                        <span className="text-[10px] text-gray-500">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-gray-400 mt-1">{n.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Avatar */}
          <div className="flex items-center space-x-2 pl-2 border-l border-cyber-border/40">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyber-cyan to-cyber-purple p-0.5 shadow-cyber cursor-pointer">
              <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-xs font-bold text-cyber-cyan">
                RM
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Command Palette Component */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onOpen={() => setCommandPaletteOpen(true)}
        onClose={() => setCommandPaletteOpen(false)}
      />
    </>
  );
}
