"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShieldAlert, Cpu, GitPullRequest, Bot, FileText, Zap, X, Terminal, Users, Settings } from "lucide-react";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled externally or trigger parent
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const commands = [
    {
      icon: Cpu,
      title: "Cyber Twin Topology Map",
      category: "Navigation",
      action: () => { router.push("/dashboard/cyber-twin"); onClose(); }
    },
    {
      icon: GitPullRequest,
      title: "Attack GPS Vector Propagation",
      category: "Navigation",
      action: () => { router.push("/dashboard/attack-gps"); onClose(); }
    },
    {
      icon: Zap,
      title: "Decision Lab Strategy Simulator",
      category: "Navigation",
      action: () => { router.push("/dashboard/decision-lab"); onClose(); }
    },
    {
      icon: Bot,
      title: "AI Copilot Security Assistant",
      category: "Navigation",
      action: () => { router.push("/dashboard/ai-copilot"); onClose(); }
    },
    {
      icon: FileText,
      title: "Incident Reports & Executive Summaries",
      category: "Navigation",
      action: () => { router.push("/dashboard/incidents"); onClose(); }
    },
    {
      icon: ShieldAlert,
      title: "Live Threat Intelligence (CVEs & Zero-Days)",
      category: "Navigation",
      action: () => { router.push("/dashboard/threat-intel"); onClose(); }
    },
    {
      icon: Terminal,
      title: "Isolate Finance Laptop (192.168.1.104)",
      category: "Quick Actions",
      action: () => {
        alert("Action Dispatched: Host 192.168.1.104 isolated successfully via NetworX Agent.");
        onClose();
      }
    },
    {
      icon: Users,
      title: "Organization Management & RBAC",
      category: "Settings",
      action: () => { router.push("/dashboard/organization"); onClose(); }
    },
    {
      icon: Settings,
      title: "System & AI Security Settings",
      category: "Settings",
      action: () => { router.push("/dashboard/settings"); onClose(); }
    }
  ];

  const filteredCommands = commands.filter(c => 
    c.title.toLowerCase().includes(query.toLowerCase()) || 
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-2xl bg-cyber-dark/95 border border-cyber-border rounded-xl shadow-cyber overflow-hidden"
        >
          {/* Search Header */}
          <div className="flex items-center px-4 py-3 border-b border-cyber-border bg-slate-900/50">
            <Search className="w-5 h-5 text-cyber-cyan mr-3" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command, query host IP, or jump to feature... (ESC to exit)"
              className="w-full bg-transparent text-gray-100 placeholder-gray-500 focus:outline-none text-sm"
              autoFocus
            />
            <button onClick={onClose} className="p-1 text-gray-400 hover:text-white rounded-lg">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Results List */}
          <div className="max-h-80 overflow-y-auto p-2">
            {filteredCommands.length === 0 ? (
              <div className="py-8 text-center text-gray-400 text-sm">
                No commands matching &quot;{query}&quot;
              </div>
            ) : (
              filteredCommands.map((cmd, idx) => {
                const Icon = cmd.icon;
                return (
                  <button
                    key={idx}
                    onClick={cmd.action}
                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-sky-500/10 hover:border hover:border-cyber-cyan/30 text-left group transition-all"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-slate-800 text-cyber-cyan group-hover:bg-cyber-cyan group-hover:text-black transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-200 group-hover:text-cyber-cyan">
                          {cmd.title}
                        </div>
                        <div className="text-xs text-gray-500">
                          {cmd.category}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 group-hover:text-gray-300">
                      Press ↵
                    </span>
                  </button>
                );
              })
            )}
          </div>

          <div className="px-4 py-2 bg-slate-950 border-t border-cyber-border/50 flex justify-between text-xs text-gray-500">
            <span>Navigation: ↑ ↓ | Select: ↵</span>
            <span className="text-cyber-cyan">NetworX Command Palette</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
