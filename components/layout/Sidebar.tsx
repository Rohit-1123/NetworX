"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Shield, 
  Cpu, 
  GitPullRequest, 
  Zap, 
  Bot, 
  Clock, 
  FileText, 
  ShieldAlert, 
  Users, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Activity,
  Layers,
  CreditCard
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { label: "Dashboard", icon: Activity, href: "/dashboard" },
    { label: "Cyber Twin", icon: Cpu, href: "/dashboard/cyber-twin", badge: "Live" },
    { label: "Attack GPS", icon: GitPullRequest, href: "/dashboard/attack-gps", badge: "Critical" },
    { label: "Decision Lab", icon: Zap, href: "/dashboard/decision-lab" },
    { label: "AI Copilot", icon: Bot, href: "/dashboard/ai-copilot", badge: "AI" },
    { label: "Threat Timeline", icon: Clock, href: "/dashboard/timeline" },
    { label: "Incident Reports", icon: FileText, href: "/dashboard/incidents" },
    { label: "Threat Intel", icon: ShieldAlert, href: "/dashboard/threat-intel" },
    { label: "Subscription", icon: CreditCard, href: "/dashboard/subscription", badge: "Pro" },
    { label: "Organization", icon: Users, href: "/dashboard/organization" },
    { label: "Settings", icon: Settings, href: "/dashboard/settings" },
  ];

  return (
    <aside
      className={cn(
        "relative flex flex-col h-screen bg-cyber-dark/95 border-r border-cyber-border/50 backdrop-blur-xl transition-all duration-300 z-30 select-none",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-cyber-border/40">
        <Link href="/" className="flex items-center space-x-3 overflow-hidden">
          <div className="p-2 rounded-xl bg-cyber-cyan/10 border border-cyber-cyan/40 shadow-cyber shrink-0">
            <Shield className="w-5 h-5 text-cyber-cyan" />
          </div>
          {!collapsed && (
            <span className="font-bold text-lg text-white tracking-wider">
              NETWOR<span className="text-cyber-cyan">X</span>
            </span>
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}
          aria-expanded={!collapsed}
          className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all group relative",
                isActive
                  ? "bg-gradient-to-r from-cyber-cyan/20 to-sky-500/10 text-cyber-cyan border border-cyber-cyan/30 shadow-cyber"
                  : "text-gray-400 hover:text-gray-100 hover:bg-slate-800/60"
              )}
            >
              <Icon className={cn("w-5 h-5 shrink-0 transition-transform group-hover:scale-110", isActive ? "text-cyber-cyan" : "text-gray-400")} />
              
              {!collapsed && (
                <span className="ml-3 truncate">{item.label}</span>
              )}

              {!collapsed && item.badge && (
                <span
                  className={cn(
                    "ml-auto text-[10px] px-1.5 py-0.5 rounded font-semibold uppercase tracking-wider",
                    item.badge === "Critical" ? "bg-red-500/20 text-red-400 border border-red-500/40" :
                    item.badge === "Live" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40" :
                    "bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan/40"
                  )}
                >
                  {item.badge}
                </span>
              )}

              {collapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-slate-900 text-xs font-semibold text-white rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none z-50 whitespace-nowrap">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}
      </div>

      {/* System Status Footnote */}
      {!collapsed && (
        <div className="p-4 border-t border-cyber-border/40 bg-slate-900/40">
          <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Cyber Twin Engine
            </span>
            <span className="text-emerald-400 font-mono">99.98%</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-400 h-full w-[99.98%]" />
          </div>
        </div>
      )}
    </aside>
  );
}
