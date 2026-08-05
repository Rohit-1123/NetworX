"use client";

import React, { useState } from "react";
import { INCIDENT_REPORTS } from "@/lib/mockData";
import { IncidentReport } from "@/types/cyber";
import { FileText, Download, Printer, ShieldAlert, Sparkles, Check, ExternalLink, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

export default function IncidentReportsPage() {
  const [selectedReport, setSelectedReport] = useState<IncidentReport>(INCIDENT_REPORTS[0]);
  const [printModalOpen, setPrintModalOpen] = useState(false);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-cyber-dark/90 border border-cyber-border shadow-cyber">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-xl text-white">AI Incident Reports & IoC Summaries</h1>
            <p className="text-xs text-gray-400">
              Automated executive incident reports generated with AI decision reasoning and printable PDF export.
            </p>
          </div>
        </div>

        <button
          onClick={() => setPrintModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyber-cyan text-black font-extrabold text-xs shadow-cyber hover:scale-105 transition-all"
        >
          <Download className="w-4 h-4" />
          <span>Export / Print Report (PDF)</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Report List */}
        <div className="space-y-3">
          <span className="text-xs font-mono font-bold uppercase text-gray-400">Incident Archive</span>
          {INCIDENT_REPORTS.map((report) => {
            const isSelected = report.id === selectedReport.id;

            return (
              <div
                key={report.id}
                onClick={() => setSelectedReport(report)}
                className={cn(
                  "p-4 rounded-xl border transition-all cursor-pointer space-y-2",
                  isSelected
                    ? "bg-slate-900 border-cyber-cyan shadow-cyber"
                    : "bg-slate-950/60 border-cyber-border/40 hover:border-slate-800"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-cyber-cyan font-bold">{report.id}</span>
                  <span
                    className={cn(
                      "px-2 py-0.5 rounded text-[10px] uppercase font-mono font-bold border",
                      report.severity === "Critical" ? "bg-red-500/20 text-red-400 border-red-500/40" : "bg-amber-500/20 text-amber-400 border-amber-500/40"
                    )}
                  >
                    {report.severity}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-white line-clamp-1">{report.title}</h3>
                <p className="text-[11px] text-gray-400 font-mono">{report.date}</p>
              </div>
            );
          })}
        </div>

        {/* Right 2 Columns: Selected Report Detailed Card */}
        <div className="lg:col-span-2 glass-card p-8 rounded-2xl border border-cyber-border/40 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-cyber-border/40">
            <div>
              <span className="text-xs font-mono text-cyber-cyan font-bold">{selectedReport.id}</span>
              <h2 className="text-xl font-bold text-white mt-0.5">{selectedReport.title}</h2>
              <span className="text-xs text-gray-400 font-mono">Date: {selectedReport.date}</span>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono text-gray-400 block">Risk Score</span>
              <span className="text-3xl font-extrabold text-red-400 font-mono">{selectedReport.riskScore}/100</span>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-bold uppercase text-cyber-cyan">Executive Summary</h4>
            <p className="text-xs text-gray-300 leading-relaxed font-sans bg-slate-900/60 p-4 rounded-xl border border-slate-800">
              {selectedReport.executiveSummary}
            </p>
          </div>

          {/* AI Reasoning */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-bold uppercase text-purple-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> NetworX AI Decision Reasoning
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed font-sans bg-purple-950/20 p-4 rounded-xl border border-purple-500/30">
              {selectedReport.aiReasoning}
            </p>
          </div>

          {/* Indicators of Compromise (IoCs) */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-bold uppercase text-gray-400">Indicators of Compromise (IoCs)</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {selectedReport.iocs.map((ioc, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 font-mono text-xs flex justify-between items-center">
                  <div>
                    <span className="text-[10px] text-gray-500 block">{ioc.type}</span>
                    <span className="text-gray-200 font-bold truncate block max-w-[200px]">{ioc.value}</span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded text-[9px] uppercase font-bold bg-red-500/20 text-red-400 border border-red-500/40">
                    {ioc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Mitigations */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-bold uppercase text-emerald-400">Enforced & Recommended Mitigations</h4>
            <ul className="space-y-2 text-xs text-gray-300 font-sans">
              {selectedReport.mitigations.map((m, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-slate-900/40 p-2.5 rounded-lg border border-slate-800">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* PRINT MODAL OVERLAY */}
      {printModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-white text-gray-900 p-8 rounded-2xl max-w-2xl w-full space-y-6 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h2 className="text-2xl font-bold">NETWORX CYBER INCIDENT REPORT</h2>
                <p className="text-xs text-gray-500">Report ID: {selectedReport.id} • Date: {selectedReport.date}</p>
              </div>
              <button onClick={() => setPrintModalOpen(false)} className="text-sm font-bold text-gray-500 hover:text-black">
                Close
              </button>
            </div>

            <div className="space-y-4 text-xs font-sans">
              <div>
                <h4 className="font-bold text-gray-700 uppercase">Title</h4>
                <p className="text-base font-semibold">{selectedReport.title}</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-700 uppercase">Executive Summary</h4>
                <p className="text-gray-700 leading-relaxed">{selectedReport.executiveSummary}</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-700 uppercase">AI Reasoning</h4>
                <p className="text-gray-700 leading-relaxed">{selectedReport.aiReasoning}</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-700 uppercase">Indicators of Compromise (IoCs)</h4>
                <ul className="list-disc pl-5 font-mono text-[11px]">
                  {selectedReport.iocs.map((i, idx) => (
                    <li key={idx}>{i.type}: {i.value} ({i.status})</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t flex justify-end gap-3">
              <button
                onClick={() => window.print()}
                className="px-6 py-2.5 rounded-lg bg-black text-white font-bold text-xs flex items-center gap-2"
              >
                <Printer className="w-4 h-4" /> Print / Save as PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
