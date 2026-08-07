"use client";

import React, { useState } from "react";
import { INITIAL_COPILOT_MESSAGES } from "@/lib/mockData";
import { CopilotMessage } from "@/types/cyber";
import { Bot, Send, User, CheckCircle2, XCircle, Terminal, Sparkles, ShieldAlert, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AICopilotPage() {
  const [messages, setMessages] = useState<CopilotMessage[]>(INITIAL_COPILOT_MESSAGES);
  const [inputPrompt, setInputPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [requestError, setRequestError] = useState<string | null>(null);

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || inputPrompt;
    if (!textToSend.trim()) return;

    const userMsg: CopilotMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: textToSend
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt("");
    setLoading(true);
    setRequestError(null);

    try {
      const res = await fetch("/api/copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: textToSend }),
      });
      const data = await res.json();

      if (!res.ok || typeof data.text !== "string") {
        throw new Error(typeof data.error === "string" ? data.error : "Copilot could not process this request.");
      }

      const aiMsg: CopilotMessage = {
        id: `ai-${Date.now()}`,
        sender: "copilot",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: data.text,
        explanation: data.explanation,
        confidenceScore: data.confidenceScore,
        recommendedActions: data.recommendedActions
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      setRequestError(error instanceof Error ? error.message : "Copilot could not process this request.");
    } finally {
      setLoading(false);
    }
  };

  const handleApproveAction = (msgId: string, actionId: string) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === msgId && msg.recommendedActions) {
          return {
            ...msg,
            recommendedActions: msg.recommendedActions.map((act) =>
              act.id === actionId ? { ...act, approved: true, rejected: false } : act
            ),
          };
        }
        return msg;
      })
    );
  };

  const handleRejectAction = (msgId: string, actionId: string) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === msgId && msg.recommendedActions) {
          return {
            ...msg,
            recommendedActions: msg.recommendedActions.map((act) =>
              act.id === actionId ? { ...act, approved: false, rejected: true } : act
            ),
          };
        }
        return msg;
      })
    );
  };

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col space-y-4 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-cyber-dark/90 border border-cyber-border shadow-cyber">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-white flex items-center gap-2">
              NetworX AI Copilot Assistant
              <span className="px-2 py-0.5 rounded text-[10px] uppercase font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                Human-In-The-Loop
              </span>
            </h1>
            <p className="text-xs text-gray-400">
              Conversational decision assistant. Recommends containment CLI actions & rollback scripts without auto-executing.
            </p>
          </div>
        </div>
      </div>

      {/* Preset Query Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-gray-500 font-mono text-[10px] uppercase shrink-0">Quick Queries:</span>
        {[
          "What should I do?",
          "Explain attack vector on Finance Laptop",
          "Generate containment script & rollback steps",
        ].map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(chip)}
            className="px-3 py-1.5 rounded-full bg-slate-900 border border-cyber-border/60 text-gray-300 hover:text-cyber-cyan hover:border-cyber-cyan/40 text-xs shrink-0 transition-colors"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Chat Messages Log */}
      <div className="flex-1 overflow-y-auto p-4 rounded-2xl bg-slate-950/90 border border-cyber-border/60 space-y-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex items-start gap-3 text-xs max-w-3xl",
              msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
            )}
          >
            <div
              className={cn(
                "w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border shadow-cyber",
                msg.sender === "user"
                  ? "bg-slate-800 border-slate-700 text-gray-200"
                  : "bg-purple-950/60 border-purple-500/40 text-purple-300"
              )}
            >
              {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={cn(
                "p-4 rounded-2xl border space-y-3",
                msg.sender === "user"
                  ? "bg-cyber-cyan/10 border-cyber-cyan/30 text-gray-100"
                  : "bg-slate-900/90 border-cyber-border text-gray-200"
              )}
            >
              <div className="flex items-center justify-between text-[10px] text-gray-400 font-mono">
                <span className="font-bold uppercase text-cyber-cyan">
                  {msg.sender === "user" ? "You (Security Analyst)" : "NetworX Copilot"}
                </span>
                <span>{msg.timestamp}</span>
              </div>

              <p className="text-sm font-sans leading-relaxed">{msg.text}</p>

              {/* AI Explanation Card */}
              {msg.explanation && (
                <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/30 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 text-purple-300 font-bold font-mono">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI Reasoning ({msg.confidenceScore}% Confidence)</span>
                  </div>
                  <p className="text-gray-300">{msg.explanation}</p>
                </div>
              )}

              {/* Recommended Action Approval Buttons */}
              {msg.recommendedActions && msg.recommendedActions.length > 0 && (
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-mono font-bold uppercase text-amber-400 block">
                    Recommended CLI Actions (Human Approval Required)
                  </span>

                  {msg.recommendedActions.map((act) => (
                    <div
                      key={act.id}
                      className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 font-mono text-xs"
                    >
                      <div className="flex items-center justify-between font-bold text-white">
                        <span>{act.title}</span>
                        <span className="text-[10px] text-gray-400">{act.impact}</span>
                      </div>

                      {/* Command & Rollback script */}
                      <div className="p-2 rounded bg-black border border-slate-900 text-emerald-400 font-mono text-[11px] overflow-x-auto">
                        <div>$ {act.command}</div>
                        <div className="text-gray-500 mt-1"># Rollback: {act.rollback}</div>
                      </div>

                      {/* Action Approval Bar */}
                      <div className="flex items-center justify-between pt-1">
                        {act.approved ? (
                          <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                            <CheckCircle2 className="w-4 h-4" /> Action Approved (execution is not configured)
                          </div>
                        ) : act.rejected ? (
                          <div className="flex items-center gap-1.5 text-red-400 font-bold">
                            <XCircle className="w-4 h-4" /> Action Rejected
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 w-full justify-end">
                            <button
                              onClick={() => handleRejectAction(msg.id, act.id)}
                              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-gray-300 font-bold"
                            >
                              Reject
                            </button>
                            <button
                              onClick={() => handleApproveAction(msg.id, act.id)}
                              className="px-4 py-1.5 rounded-lg bg-cyber-cyan text-black font-bold shadow-cyber hover:scale-105 transition-all"
                            >
                              Approve Recommendation
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-purple-400 font-mono italic">
            <Bot className="w-4 h-4 animate-spin" />
            <span>Copilot analyzing attack telemetry...</span>
          </div>
        )}
        {requestError && (
          <div role="alert" className="rounded-xl border border-red-500/40 bg-red-950/50 p-3 text-xs text-red-300">
            {requestError}
          </div>
        )}
      </div>

      {/* Input Bar */}
      <div className="p-2 rounded-2xl bg-cyber-dark border border-cyber-border shadow-cyber flex items-center gap-2">
        <input
          type="text"
          value={inputPrompt}
          onChange={(e) => setInputPrompt(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Ask Copilot: 'What should I do?', 'Explain attack vector', 'Generate script'..."
          className="flex-1 bg-transparent px-4 py-2.5 text-sm text-gray-100 placeholder-gray-500 focus:outline-none"
        />
        <button
          onClick={() => handleSendMessage()}
          disabled={loading || !inputPrompt.trim()}
          aria-label="Send message to Copilot"
          className="p-3 rounded-xl bg-gradient-to-r from-cyber-cyan to-sky-400 text-black font-bold shadow-cyber hover:scale-105 transition-all disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
