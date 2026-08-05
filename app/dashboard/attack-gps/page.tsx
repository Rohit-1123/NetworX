"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ATTACK_GPS_STAGES } from "@/lib/mockData";
import { GitPullRequest, Play, Pause, RotateCcw, AlertTriangle, ShieldCheck, Clock, ShieldAlert, ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AttackGPSPage() {
  const [currentStep, setCurrentStep] = useState<number>(4); // Default at Stage 4 (LSASS dump)
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStep((prev) => (prev >= ATTACK_GPS_STAGES.length ? 1 : prev + 1));
      }, 3000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const activeStage = ATTACK_GPS_STAGES.find((s) => s.id === currentStep) || ATTACK_GPS_STAGES[3];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-cyber-dark/90 border border-cyber-border shadow-cyber">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
            <GitPullRequest className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-xl text-white">Attack GPS Propagation Visualizer</h1>
            <p className="text-xs text-gray-400">
              Predictive vector path mapping initial entry, lateral spread, and forecasted database breach.
            </p>
          </div>
        </div>

        {/* Player Controls */}
        <div className="flex items-center space-x-3 bg-slate-900/80 p-2 rounded-xl border border-slate-800">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyber-cyan text-black font-bold text-xs shadow-cyber hover:scale-105 transition-all"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isPlaying ? "Pause Simulation" : "Play Propagation"}</span>
          </button>
          <button
            onClick={() => { setCurrentStep(1); setIsPlaying(false); }}
            className="p-2 rounded-lg bg-slate-800 text-gray-300 hover:text-white"
            title="Reset to Stage 1"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* METRICS SUMMARY CARD */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card p-4 rounded-xl border border-cyber-border/40 space-y-1">
          <span className="text-xs font-mono text-gray-400 uppercase">Current Stage</span>
          <div className="text-sm font-bold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            Stage {activeStage.id}: {activeStage.title}
          </div>
        </div>

        <div className="glass-card p-4 rounded-xl border border-cyber-border/40 space-y-1">
          <span className="text-xs font-mono text-gray-400 uppercase">Predicted Next Vector</span>
          <div className="text-sm font-bold text-orange-400">
            {currentStep < ATTACK_GPS_STAGES.length ? ATTACK_GPS_STAGES[currentStep].title : "Exfiltration Complete"}
          </div>
        </div>

        <div className="glass-card p-4 rounded-xl border border-cyber-border/40 space-y-1">
          <span className="text-xs font-mono text-gray-400 uppercase">AI Prediction Confidence</span>
          <div className="text-2xl font-extrabold text-cyber-cyan font-mono">
            {activeStage.confidenceScore}%
          </div>
        </div>

        <div className="glass-card p-4 rounded-xl border border-cyber-border/40 space-y-1">
          <span className="text-xs font-mono text-gray-400 uppercase">Est. Remaining Time to Breach</span>
          <div className="text-sm font-bold text-red-400 flex items-center gap-1.5 font-mono">
            <Clock className="w-4 h-4" />
            {activeStage.estimatedTimeRemaining || "0 mins (Contained)"}
          </div>
        </div>
      </div>

      {/* VISUAL PROPAGATION TIMELINE TRAIL */}
      <div className="glass-card p-8 rounded-2xl border border-cyber-border/40 space-y-8">
        <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-cyber-cyan">
          Interactive Attack Propagation Path
        </h3>

        <div className="relative">
          {/* Connector Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-800 -translate-y-1/2 z-0 hidden lg:block" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 relative z-10">
            {ATTACK_GPS_STAGES.map((stage) => {
              const isActive = stage.id === currentStep;
              const isPast = stage.id < currentStep;
              const isPredicted = stage.status === "predicted";

              return (
                <motion.div
                  key={stage.id}
                  onClick={() => setCurrentStep(stage.id)}
                  whileHover={{ scale: 1.03 }}
                  className={cn(
                    "p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between h-48",
                    isActive
                      ? "bg-red-950/60 border-red-500 shadow-cyber-red"
                      : isPast
                      ? "bg-slate-900/90 border-emerald-500/40 text-gray-300"
                      : "bg-slate-950/60 border-slate-800 text-gray-500"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        "w-7 h-7 rounded-full text-xs font-mono font-bold flex items-center justify-center border",
                        isActive
                          ? "bg-red-500 text-white border-red-400 animate-pulse"
                          : isPast
                          ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                          : "bg-slate-800 text-gray-500 border-slate-700"
                      )}
                    >
                      {stage.id}
                    </span>
                    <span
                      className={cn(
                        "text-[9px] uppercase font-bold px-1.5 py-0.5 rounded border",
                        stage.status === "completed" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40" :
                        stage.status === "current" ? "bg-red-500/20 text-red-400 border-red-500/40" :
                        "bg-amber-500/20 text-amber-300 border-amber-500/40"
                      )}
                    >
                      {stage.status}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="text-xs font-bold text-white line-clamp-2">{stage.title}</div>
                    <div className="text-[10px] font-mono text-gray-400">{stage.nodeId}</div>
                  </div>

                  <div className="text-[10px] font-mono text-gray-400 pt-2 border-t border-slate-800/80 flex items-center justify-between">
                    <span>{stage.techniqueId}</span>
                    <span className="text-cyber-cyan">{stage.confidenceScore}%</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* STAGE DETAILS FOCUS CARD */}
        <div className="p-6 rounded-xl bg-slate-900/90 border border-cyber-border space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-cyber-cyan font-bold flex items-center gap-2">
              <ShieldAlert className="w-4 h-4" />
              Stage {activeStage.id} Intelligence Breakdown
            </span>
            <span className="text-gray-400">{activeStage.timestamp}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-gray-500 block mb-1">Vector Category</span>
              <p className="text-gray-200 font-bold">{activeStage.vector}</p>
            </div>
            <div>
              <span className="text-gray-500 block mb-1">MITRE ATT&CK Technique</span>
              <p className="text-gray-200 font-bold">{activeStage.techniqueId}</p>
            </div>
          </div>

          <div className="pt-2">
            <span className="text-gray-500 block mb-1">Attack Description & Evidence</span>
            <p className="text-gray-300 leading-relaxed font-sans">{activeStage.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
