"use client";

import React, { useState } from "react";
import { Clock, Play, Pause, SkipBack, SkipForward, ShieldAlert, FileCode, Mail, Key, Server, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ThreatTimelinePage() {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(3); // Default at PowerShell
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const timelineEvents = [
    {
      time: "10:24:18 AM",
      title: "Email Received",
      category: "Initial Access",
      icon: Mail,
      target: "sarah.m@company.com",
      detail: "Spear-phishing email delivered containing weaponized attachment 'Invoice_Q3.xlsm'."
    },
    {
      time: "10:25:01 AM",
      title: "Payload Downloaded & Dropped",
      category: "Execution",
      icon: FileCode,
      target: "C:\\Users\\Public\\Update.ps1",
      detail: "Excel macro executed wscript.exe dropping obfuscated PowerShell stager."
    },
    {
      time: "10:25:33 AM",
      title: "PowerShell Spawned",
      category: "Execution",
      icon: Terminal,
      target: "PID 4892 (powershell.exe)",
      detail: "PowerShell executed with -encodedCommand launching HTTPS C2 beacon to 45.142.214.8."
    },
    {
      time: "10:26:00 AM",
      title: "Registry Edit (Persistence)",
      category: "Persistence",
      icon: Key,
      target: "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run",
      detail: "Added registry key 'WindowsUpdate' pointing to dropped stager."
    },
    {
      time: "10:26:12 AM",
      title: "Credential Theft (LSASS Dump)",
      category: "Credential Access",
      icon: ShieldAlert,
      target: "LSASS.exe Memory",
      detail: "Mimikatz dump executed to harvest domain administrator Kerberos tickets."
    },
    {
      time: "10:27:12 AM",
      title: "Lateral Movement Attempt",
      category: "Lateral Spread",
      icon: Server,
      target: "10.0.2.50 (Internal App Server)",
      detail: "Stolen Kerberos TGS ticket used for service account authentication attempt."
    }
  ];

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setActiveStepIndex((prev) => (prev >= timelineEvents.length - 1 ? 0 : prev + 1));
      }, 2500);
    }
    return () => clearInterval(timer);
  }, [isPlaying, timelineEvents.length]);

  const activeEvent = timelineEvents[activeStepIndex];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-cyber-dark/90 border border-cyber-border shadow-cyber">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-xl text-white">Threat Replay Timeline</h1>
            <p className="text-xs text-gray-400">
              Interactive forensic timeline replay player for Incident INC-8841.
            </p>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center space-x-2 bg-slate-900/80 p-2 rounded-xl border border-slate-800 font-mono text-xs">
          <button
            onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
            className="p-2 rounded-lg bg-slate-800 text-gray-300 hover:text-white"
          >
            <SkipBack className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyber-cyan text-black font-bold shadow-cyber hover:scale-105 transition-all"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isPlaying ? "Pause Replay" : "Play Timeline"}</span>
          </button>
          <button
            onClick={() => setActiveStepIndex((prev) => Math.min(timelineEvents.length - 1, prev + 1))}
            className="p-2 rounded-lg bg-slate-800 text-gray-300 hover:text-white"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* TIMELINE SCRUBBER BAR */}
      <div className="glass-card p-6 rounded-2xl border border-cyber-border/40 space-y-6">
        <div className="flex justify-between items-center text-xs font-mono text-gray-400">
          <span>Replay Scrubber</span>
          <span className="text-cyber-cyan font-bold">Step {activeStepIndex + 1} of {timelineEvents.length}</span>
        </div>

        <div className="relative">
          <div className="h-2 bg-slate-800 rounded-full w-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyber-cyan via-sky-400 to-red-500 transition-all duration-300"
              style={{ width: `${((activeStepIndex + 1) / timelineEvents.length) * 100}%` }}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-2 mt-4">
            {timelineEvents.map((evt, idx) => {
              const Icon = evt.icon;
              const isActive = idx === activeStepIndex;
              const isPast = idx < activeStepIndex;

              return (
                <button
                  key={idx}
                  onClick={() => setActiveStepIndex(idx)}
                  className={cn(
                    "p-3 rounded-xl border text-left transition-all space-y-2",
                    isActive
                      ? "bg-slate-900 border-cyber-cyan shadow-cyber scale-105"
                      : isPast
                      ? "bg-slate-950/80 border-slate-800 text-gray-400"
                      : "bg-slate-950/40 border-slate-900 text-gray-600"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <Icon className={cn("w-4 h-4", isActive ? "text-cyber-cyan" : "text-gray-400")} />
                    <span className="text-[10px] font-mono">{evt.time}</span>
                  </div>
                  <div className="text-xs font-bold text-white truncate">{evt.title}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ACTIVE STEP DETAILED DISPLAY CARD */}
        <div className="p-6 rounded-xl bg-slate-900/90 border border-cyber-border space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-red-500/20 text-red-400 border border-red-500/40">
                {activeEvent.category}
              </span>
              <span className="text-white font-bold text-sm">{activeEvent.title}</span>
            </div>
            <span className="text-cyber-cyan">{activeEvent.time}</span>
          </div>

          <div className="space-y-2 font-sans text-sm text-gray-300">
            <p><strong className="text-gray-400 font-mono text-xs">Target Host / Process:</strong> {activeEvent.target}</p>
            <p><strong className="text-gray-400 font-mono text-xs">Forensic Summary:</strong> {activeEvent.detail}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
