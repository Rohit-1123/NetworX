"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Shield, Menu, X, ArrowRight, Zap, Cpu, GitPullRequest, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full glass-nav backdrop-blur-xl border-b border-cyber-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-cyber-cyan/20 to-cyber-blue/30 border border-cyber-cyan/50 shadow-cyber group-hover:scale-105 transition-transform">
              <Shield className="w-5 h-5 text-cyber-cyan" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-wider text-white flex items-center gap-1">
                NETWOR<span className="text-cyber-cyan">X</span>
                <span className="text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded bg-sky-500/20 text-cyber-cyan border border-cyber-cyan/30">AI</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <Link href="/dashboard/cyber-twin" className="text-gray-300 hover:text-cyber-cyan transition-colors flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-emerald-400" />
              Cyber Twin
            </Link>
            <Link href="/dashboard/attack-gps" className="text-gray-300 hover:text-cyber-cyan transition-colors flex items-center gap-1.5">
              <GitPullRequest className="w-4 h-4 text-red-400" />
              Attack GPS
            </Link>
            <Link href="/dashboard/decision-lab" className="text-gray-300 hover:text-cyber-cyan transition-colors flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" />
              Decision Lab
            </Link>
            <Link href="/dashboard/ai-copilot" className="text-gray-300 hover:text-cyber-cyan transition-colors flex items-center gap-1.5">
              <Bot className="w-4 h-4 text-purple-400" />
              AI Copilot
            </Link>
            <Link href="/pricing" className="text-gray-300 hover:text-cyber-cyan transition-colors">
              Pricing
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-300 hover:text-white px-3 py-2 transition-colors"
            >
              Login
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center space-x-2 text-sm font-semibold text-black bg-gradient-to-r from-cyber-cyan to-sky-400 hover:from-cyan-300 hover:to-sky-300 px-4 py-2 rounded-lg shadow-cyber transition-all hover:scale-105"
            >
              <span>Launch Portal</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-cyber-dark/95 border-b border-cyber-border px-4 pt-2 pb-6 space-y-3 text-sm"
          >
            <Link
              href="/dashboard/cyber-twin"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-300 hover:text-cyber-cyan py-2"
            >
              Cyber Twin Map
            </Link>
            <Link
              href="/dashboard/attack-gps"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-300 hover:text-cyber-cyan py-2"
            >
              Attack GPS Propagation
            </Link>
            <Link
              href="/dashboard/decision-lab"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-300 hover:text-cyber-cyan py-2"
            >
              Decision Lab Simulator
            </Link>
            <Link
              href="/dashboard/ai-copilot"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-300 hover:text-cyber-cyan py-2"
            >
              AI Copilot Assistant
            </Link>
            <Link
              href="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-300 hover:text-cyber-cyan py-2"
            >
              Pricing Plans
            </Link>
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex justify-center items-center gap-2 py-3 rounded-lg bg-cyber-cyan text-black font-semibold"
            >
              <Zap className="w-4 h-4" /> Open SOC Dashboard
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
