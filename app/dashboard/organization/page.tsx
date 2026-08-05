"use client";

import React, { useState } from "react";
import { Building2, Users, Laptop, Shield, Plus, Lock, Check } from "lucide-react";

export default function OrganizationPage() {
  const employees = [
    { name: "Sarah Miller", email: "sarah.m@acme-cyber.com", role: "Finance Manager", dept: "Finance", status: "Active (Host Isolated)", device: "192.168.1.104" },
    { name: "Dave Miller", email: "dave.m@acme-cyber.com", role: "HR Specialist", dept: "Human Resources", status: "Active", device: "192.168.1.112" },
    { name: "Alex Rivera", email: "alex.r@acme-cyber.com", role: "Senior Dev", dept: "Engineering", status: "Active", device: "192.168.1.140" },
    { name: "Marcus Vance", email: "marcus.v@acme-cyber.com", role: "SOC Tier 3 Lead", dept: "SecOps", status: "Admin", device: "192.168.1.10" }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-cyber-dark/90 border border-cyber-border shadow-cyber">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-xl text-white">Acme Corp HQ • Organization & RBAC</h1>
            <p className="text-xs text-gray-400">
              Manage departments, employee endpoints, RBAC permissions, and device limits.
            </p>
          </div>
        </div>

        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyber-cyan text-black font-extrabold text-xs shadow-cyber hover:scale-105 transition-all">
          <Plus className="w-4 h-4" /> Add Employee Endpoint
        </button>
      </div>

      {/* METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-mono">
        <div className="glass-card p-4 rounded-xl border border-cyber-border/40">
          <span className="text-gray-400 uppercase">Departments</span>
          <div className="text-2xl font-bold text-white mt-1">6 Active</div>
        </div>
        <div className="glass-card p-4 rounded-xl border border-cyber-border/40">
          <span className="text-gray-400 uppercase">Total Employees</span>
          <div className="text-2xl font-bold text-cyber-cyan mt-1">142 Users</div>
        </div>
        <div className="glass-card p-4 rounded-xl border border-cyber-border/40">
          <span className="text-gray-400 uppercase">Protected Devices</span>
          <div className="text-2xl font-bold text-emerald-400 mt-1">482 / 500</div>
        </div>
        <div className="glass-card p-4 rounded-xl border border-cyber-border/40">
          <span className="text-gray-400 uppercase">Subscription Tier</span>
          <div className="text-2xl font-bold text-amber-400 mt-1">Professional</div>
        </div>
      </div>

      {/* EMPLOYEE LIST TABLE */}
      <div className="glass-card p-6 rounded-2xl border border-cyber-border/40 space-y-4">
        <h3 className="font-bold text-lg text-white">Directory & RBAC Access Controls</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="text-gray-500 border-b border-slate-800 uppercase font-semibold">
                <th className="py-2.5 px-3">Name</th>
                <th className="py-2.5 px-3">Department</th>
                <th className="py-2.5 px-3">Role</th>
                <th className="py-2.5 px-3">Assigned IP</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {employees.map((emp, idx) => (
                <tr key={idx} className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-3 px-3">
                    <div className="font-bold text-white">{emp.name}</div>
                    <div className="text-[10px] text-gray-500">{emp.email}</div>
                  </td>
                  <td className="py-3 px-3 text-gray-300">{emp.dept}</td>
                  <td className="py-3 px-3 text-cyber-cyan">{emp.role}</td>
                  <td className="py-3 px-3 text-gray-400">{emp.device}</td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border ${
                      emp.status.includes("Isolated")
                        ? "bg-red-500/20 text-red-400 border-red-500/40"
                        : "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                    }`}>
                      {emp.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
