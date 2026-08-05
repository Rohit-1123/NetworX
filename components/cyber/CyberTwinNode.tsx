"use client";

import React, { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import { Server, Shield, Laptop, Cloud, Database, Network, Layers, AlertTriangle, CheckCircle2, ShieldOff, Zap } from "lucide-react";
import { CyberNodeData } from "@/types/cyber";
import { cn } from "@/lib/utils";

const iconMap = {
  server: Server,
  firewall: Shield,
  pc: Laptop,
  cloud: Cloud,
  database: Database,
  router: Network,
  switch: Layers,
};

export const CyberTwinNode = memo(({ data, selected }: { data: CyberNodeData; selected?: boolean }) => {
  const Icon = iconMap[data.type] || Server;

  const statusStyles = {
    green: "border-emerald-500/60 bg-emerald-950/40 text-emerald-400 shadow-cyber-green node-green",
    orange: "border-orange-500/60 bg-orange-950/40 text-orange-400 shadow-orange-500/20 node-orange",
    red: "border-red-500/80 bg-red-950/60 text-red-400 shadow-cyber-red node-red",
    blue: "border-sky-500/60 bg-sky-950/40 text-sky-400 shadow-cyber node-blue",
  };

  const statusBadge = {
    green: { label: "Healthy", bg: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40" },
    orange: { label: "Suspicious", bg: "bg-orange-500/20 text-orange-400 border-orange-500/40" },
    red: { label: "Compromised", bg: "bg-red-500/20 text-red-400 border-red-500/40 animate-pulse" },
    blue: { label: "Isolated", bg: "bg-sky-500/20 text-sky-400 border-sky-500/40" },
  };

  return (
    <div
      className={cn(
        "relative px-4 py-3 rounded-xl backdrop-blur-md border transition-all duration-300 min-w-[210px] cursor-pointer group",
        statusStyles[data.status],
        selected && "ring-2 ring-cyber-cyan scale-105"
      )}
    >
      <Handle type="target" position={Position.Top} className="!bg-cyber-cyan !w-2 !h-2" />
      <Handle type="source" position={Position.Bottom} className="!bg-cyber-cyan !w-2 !h-2" />
      <Handle type="target" position={Position.Left} className="!bg-cyber-cyan !w-2 !h-2" />
      <Handle type="source" position={Position.Right} className="!bg-cyber-cyan !w-2 !h-2" />

      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-slate-900/80 border border-slate-800">
            <Icon className="w-4 h-4 text-cyber-cyan" />
          </div>
          <span className="text-xs font-mono font-bold text-gray-200 truncate max-w-[120px]">
            {data.label}
          </span>
        </div>
      </div>

      {/* IP & Status Badge */}
      <div className="flex items-center justify-between text-[11px] mb-2 font-mono">
        <span className="text-gray-400">{data.ip}</span>
        <span className={cn("px-1.5 py-0.5 rounded text-[10px] uppercase font-bold border", statusBadge[data.status].bg)}>
          {statusBadge[data.status].label}
        </span>
      </div>

      {/* Risk Score Progress Bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-[10px] text-gray-400">
          <span>Threat Score</span>
          <span className={cn("font-bold font-mono", data.riskScore > 75 ? "text-red-400" : data.riskScore > 40 ? "text-orange-400" : "text-emerald-400")}>
            {data.riskScore}/100
          </span>
        </div>
        <div className="w-full bg-slate-900/80 h-1.5 rounded-full overflow-hidden border border-slate-800">
          <div
            className={cn(
              "h-full transition-all duration-500",
              data.riskScore > 75 ? "bg-gradient-to-r from-orange-500 to-red-500" :
              data.riskScore > 40 ? "bg-orange-400" : "bg-emerald-400"
            )}
            style={{ width: `${data.riskScore}%` }}
          />
        </div>
      </div>

      {/* Glowing pulse ring if compromised */}
      {data.status === "red" && (
        <div className="absolute -inset-1 rounded-xl bg-red-500/20 blur-sm pointer-events-none -z-10 animate-pulse" />
      )}
    </div>
  );
});

CyberTwinNode.displayName = "CyberTwinNode";
