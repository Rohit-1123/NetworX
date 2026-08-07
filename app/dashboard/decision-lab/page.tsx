"use client";

import React, { useState } from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar 
} from "recharts";
import { RESPONSE_SCENARIOS } from "@/lib/mockData";
import { Zap, Play, CheckCircle2, AlertTriangle, ShieldCheck, Clock, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DecisionLabPage() {
  const [selectedScenarioId, setSelectedScenarioId] = useState<"A" | "B" | "C">("A");
  const [simulating, setSimulating] = useState(false);
  const [simResult, setSimResult] = useState<string | null>(null);
  const [simulationError, setSimulationError] = useState<string | null>(null);

  const activeScenario = RESPONSE_SCENARIOS.find((s) => s.id === selectedScenarioId) || RESPONSE_SCENARIOS[0];

  const handleRunSimulation = async () => {
    setSimulating(true);
    setSimResult(null);
    setSimulationError(null);

    try {
      const res = await fetch("/api/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scenarioId: selectedScenarioId }),
      });
      const data = await res.json();

      if (!res.ok || !data.metrics) {
        throw new Error(typeof data.error === "string" ? data.error : "The simulation could not be completed.");
      }

      setSimResult(`Simulation Complete: Strategy ${selectedScenarioId} achieves ${data.metrics.successProbability} containment with ${data.metrics.containedIn} downtime.`);
    } catch (error) {
      setSimulationError(error instanceof Error ? error.message : "The simulation could not be completed.");
    } finally {
      setSimulating(false);
    }
  };

  // Chart dataset
  const chartData = RESPONSE_SCENARIOS.map((s) => ({
    name: `Scenario ${s.id}`,
    successRate: s.successRate,
    downtime: s.downtimeMinutes,
    riskScore: s.riskScore,
  }));

  const radarData = [
    { metric: "Containment %", ScenarioA: 96, ScenarioB: 70, ScenarioC: 100 },
    { metric: "Low Downtime", ScenarioA: 90, ScenarioB: 100, ScenarioC: 20 },
    { metric: "Business Safety", ScenarioA: 95, ScenarioB: 80, ScenarioC: 15 },
    { metric: "Speed to Execute", ScenarioA: 92, ScenarioB: 95, ScenarioC: 40 },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-cyber-dark/90 border border-cyber-border shadow-cyber">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-xl text-white">Decision Lab Response Strategy Simulator</h1>
            <p className="text-xs text-gray-400">
              Evaluate containment tradeoffs side-by-side using real-time predictive risk models.
            </p>
          </div>
        </div>

        <button
          onClick={handleRunSimulation}
          disabled={simulating}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-cyber-cyan text-black font-extrabold text-xs shadow-cyber hover:scale-105 transition-all"
        >
          <Play className="w-4 h-4" />
          <span>{simulating ? "Calculating Decision Matrix..." : `Run Scenario ${selectedScenarioId} Simulation`}</span>
        </button>
      </div>

      {/* Simulation Feedback Alert */}
      {simResult && (
        <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-mono flex items-center gap-2 shadow-cyber-green">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{simResult}</span>
        </div>
      )}
      {simulationError && (
        <div role="alert" className="p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-mono flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          <span>{simulationError}</span>
        </div>
      )}

      {/* SCENARIO COMPARISON CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {RESPONSE_SCENARIOS.map((s) => {
          const isSelected = s.id === selectedScenarioId;

          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setSelectedScenarioId(s.id)}
              aria-pressed={isSelected}
              className={cn(
                "p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-4",
                isSelected
                  ? "bg-slate-900/90 border-cyber-cyan shadow-cyber scale-[1.02]"
                  : "bg-slate-950/60 border-cyber-border/40 hover:border-slate-700"
              )}
            >
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    "text-xs font-mono font-bold px-2.5 py-1 rounded border uppercase",
                    s.id === "A" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40" :
                    s.id === "B" ? "bg-amber-500/20 text-amber-400 border-amber-500/40" :
                    "bg-red-500/20 text-red-400 border-red-500/40"
                  )}
                >
                  Scenario {s.id} {s.id === "A" && "(AI Pick)"}
                </span>
                <span className="text-xs text-gray-400 font-mono">{s.costEstimate}</span>
              </div>

              <div>
                <h3 className="font-bold text-base text-white">{s.name}</h3>
                <p className="text-xs text-gray-400 mt-1 font-mono">{s.action}</p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div>
                  <span className="text-gray-500 block text-[10px]">Success Rate</span>
                  <span className="font-bold text-emerald-400 text-sm">{s.successRate}%</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px]">Downtime</span>
                  <span className="font-bold text-gray-200 text-sm">{s.downtimeMinutes} min</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px]">Business Impact</span>
                  <span className={cn("font-bold text-sm", s.businessImpact === "Low" ? "text-emerald-400" : "text-red-400")}>
                    {s.businessImpact}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px]">Residual Risk</span>
                  <span className="font-bold text-orange-400 text-sm">{s.riskScore}/100</span>
                </div>
              </div>

              <p className="text-xs text-gray-300 font-sans italic border-t border-slate-800 pt-3">
                {s.aiRecommendation}
              </p>
            </button>
          );
        })}
      </div>

      {/* CHARTS COMPARISON SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recharts Bar Chart */}
        <div className="glass-card p-6 rounded-2xl border border-cyber-border/40 space-y-4">
          <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-cyber-cyan">
            Strategy Containment Success % vs Risk Score
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0f172a", borderColor: "#38bdf8", borderRadius: "8px", fontSize: "12px" }}
                />
                <Bar dataKey="successRate" fill="#00f0ff" radius={[4, 4, 0, 0]} name="Success Rate %" />
                <Bar dataKey="riskScore" fill="#ef4444" radius={[4, 4, 0, 0]} name="Residual Risk Score" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recharts Radar Tradeoff Chart */}
        <div className="glass-card p-6 rounded-2xl border border-cyber-border/40 space-y-4">
          <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400">
            Multi-Dimensional Risk Tradeoff Radar
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="metric" stroke="#94a3b8" fontSize={11} />
                <PolarRadiusAxis stroke="#475569" fontSize={10} />
                <Radar name="Scenario A" dataKey="ScenarioA" stroke="#00f0ff" fill="#00f0ff" fillOpacity={0.4} />
                <Radar name="Scenario B" dataKey="ScenarioB" stroke="#f97316" fill="#f97316" fillOpacity={0.2} />
                <Radar name="Scenario C" dataKey="ScenarioC" stroke="#ef4444" fill="#ef4444" fillOpacity={0.2} />
                <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#00f0ff" }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
