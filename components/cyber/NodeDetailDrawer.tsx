"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldAlert, Cpu, Terminal, ShieldCheck, Activity, AlertCircle, Lock } from "lucide-react";
import { CyberNodeData } from "@/types/cyber";
import { cn } from "@/lib/utils";

interface NodeDetailDrawerProps {
  nodeData: CyberNodeData | null;
  onClose: () => void;
  onIsolateNode: (nodeIp: string) => void;
}

export function NodeDetailDrawer({ nodeData, onClose, onIsolateNode }: NodeDetailDrawerProps) {
  if (!nodeData) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs">
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="w-full max-w-md bg-cyber-dark/95 border-l border-cyber-border/60 shadow-cyber h-full overflow-y-auto flex flex-col p-6 text-gray-200"
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between pb-4 border-b border-cyber-border/40">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">{nodeData.label}</h3>
                <p className="text-xs font-mono text-gray-400">{nodeData.ip} • {nodeData.os || "Enterprise OS"}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="py-4 space-y-6 flex-1">
            {/* Risk Score & Status */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-cyber-border/40">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-semibold uppercase text-gray-400 tracking-wider">Device Health & Risk</span>
                <span
                  className={cn(
                    "px-2 py-0.5 rounded text-xs font-mono font-bold uppercase border",
                    nodeData.status === "red" ? "bg-red-500/20 text-red-400 border-red-500/40" :
                    nodeData.status === "orange" ? "bg-orange-500/20 text-orange-400 border-orange-500/40" :
                    nodeData.status === "blue" ? "bg-sky-500/20 text-sky-400 border-sky-500/40" :
                    "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                  )}
                >
                  {nodeData.status}
                </span>
              </div>
              <div className="flex items-end gap-3 mb-2">
                <span className="text-3xl font-bold font-mono text-white">{nodeData.riskScore}</span>
                <span className="text-xs text-gray-400 mb-1">/ 100 Risk Score</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                <div
                  className={cn(
                    "h-full transition-all duration-500",
                    nodeData.riskScore > 75 ? "bg-red-500" : nodeData.riskScore > 40 ? "bg-orange-500" : "bg-emerald-400"
                  )}
                  style={{ width: `${nodeData.riskScore}%` }}
                />
              </div>
            </div>

            {/* AI Explanation */}
            <div className="p-4 rounded-xl bg-sky-950/20 border border-cyber-cyan/30 space-y-2">
              <div className="flex items-center space-x-2 text-cyber-cyan text-xs font-semibold uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4" />
                <span>NetworX AI Decision Explanation</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed font-sans">
                {nodeData.aiExplanation}
              </p>
            </div>

            {/* Device Details */}
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase text-gray-400 tracking-wider">Device Metadata</span>
              <div className="grid grid-cols-2 gap-2 text-xs bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                <div>
                  <span className="text-gray-500 block">Department</span>
                  <span className="font-medium text-gray-200">{nodeData.department || "IT Ops"}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Assigned Owner</span>
                  <span className="font-medium text-gray-200">{nodeData.owner || "Unassigned"}</span>
                </div>
              </div>
            </div>

            {/* Threat History */}
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase text-gray-400 tracking-wider">Recent Threat Events</span>
              <div className="space-y-2">
                {nodeData.threatHistory.length === 0 ? (
                  <p className="text-xs text-gray-500 italic">No historical threats detected for this node.</p>
                ) : (
                  nodeData.threatHistory.map((t, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-start justify-between text-xs">
                      <div>
                        <div className="font-medium text-gray-200">{t.event}</div>
                        <div className="text-[10px] text-gray-500 font-mono mt-0.5">{t.timestamp}</div>
                      </div>
                      <span className="px-1.5 py-0.5 rounded text-[9px] uppercase font-bold bg-red-500/20 text-red-400 border border-red-500/40">
                        {t.severity}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Attack Timeline */}
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase text-gray-400 tracking-wider">Node Execution Timeline</span>
              <div className="space-y-2 relative border-l border-slate-800 ml-2 pl-3">
                {nodeData.attackTimeline.map((item, idx) => (
                  <div key={idx} className="relative pb-2">
                    <div className="absolute -left-[17px] top-1 w-2 h-2 rounded-full bg-cyber-cyan shadow-cyber" />
                    <div className="text-xs font-medium text-gray-200">{item.action}</div>
                    <div className="flex items-center gap-2 text-[10px] text-gray-400 font-mono">
                      <span>{item.time}</span> • <span className="text-cyber-cyan">{item.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Drawer Actions */}
          <div className="pt-4 border-t border-cyber-border/40 space-y-2">
            {nodeData.isIsolated || nodeData.status === "blue" ? (
              <div className="w-full py-2.5 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-bold text-center flex items-center justify-center gap-2">
                <Lock className="w-4 h-4" /> Node Currently Isolated
              </div>
            ) : (
              <button
                onClick={() => onIsolateNode(nodeData.ip)}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-semibold text-xs shadow-cyber-red transition-all flex items-center justify-center gap-2"
              >
                <Terminal className="w-4 h-4" /> Simulate Host Isolation
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
