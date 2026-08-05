"use client";

import React, { useState, useCallback } from "react";
import { 
  ReactFlow, 
  Background, 
  Controls, 
  MiniMap, 
  useNodesState, 
  useEdgesState, 
  addEdge,
  Connection,
  Edge,
  Node
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { INITIAL_CYBER_NODES, INITIAL_CYBER_EDGES } from "@/lib/mockData";
import { CyberTwinNode } from "@/components/cyber/CyberTwinNode";
import { NodeDetailDrawer } from "@/components/cyber/NodeDetailDrawer";
import { CyberNodeData } from "@/types/cyber";
import { Cpu, RefreshCw, Lock, ShieldAlert, Sparkles, Filter } from "lucide-react";

const nodeTypes = {
  customCyberNode: CyberTwinNode,
};

export default function CyberTwinPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>(
    INITIAL_CYBER_NODES.map((n) => ({
      ...n,
      type: "customCyberNode",
    })) as Node[]
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(INITIAL_CYBER_EDGES as Edge[]);
  const [selectedNodeData, setSelectedNodeData] = useState<CyberNodeData | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleNodeClick = (_: React.MouseEvent, node: { data: unknown }) => {
    setSelectedNodeData(node.data as CyberNodeData);
  };

  // Isolate node handler
  const handleIsolateNode = (ipToIsolate: string) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.data.ip === ipToIsolate) {
          return {
            ...node,
            data: {
              ...node.data,
              status: "blue",
              riskScore: 5,
              isIsolated: true,
              aiExplanation: "ISOLATED: Interface disabled by SecOps via Cyber Twin console.",
            },
          };
        }
        return node;
      })
    );
    setSelectedNodeData(null);
    alert(`Host ${ipToIsolate} successfully isolated from corporate network!`);
  };

  // Filtered nodes calculation
  const displayedNodes = nodes.filter((n) => {
    if (filterStatus === "all") return true;
    return n.data.status === filterStatus;
  });

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col space-y-4">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-cyber-dark/90 border border-cyber-border backdrop-blur-md shadow-cyber">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-white flex items-center gap-2">
              Cyber Twin Network Graph
              <span className="px-2 py-0.5 rounded text-[10px] uppercase font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                Live Simulation
              </span>
            </h1>
            <p className="text-xs text-gray-400">
              Interactive topological twin mapping servers, firewalls, PCs, cloud, databases, and routers.
            </p>
          </div>
        </div>

        {/* Legend & Filter Controls */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
          <div className="flex items-center space-x-2 bg-slate-900/80 p-1.5 rounded-lg border border-slate-800">
            <Filter className="w-3.5 h-3.5 text-gray-400" />
            {["all", "green", "orange", "red", "blue"].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-2 py-1 rounded text-[10px] uppercase font-bold transition-all ${
                  filterStatus === st
                    ? "bg-cyber-cyan text-black"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <button
            onClick={() => setNodes(INITIAL_CYBER_NODES.map(n => ({ ...n, type: "customCyberNode" })))}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-gray-300 hover:text-white hover:border-cyber-cyan/40"
            title="Reset Network Graph"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 w-full bg-slate-950/90 rounded-2xl border border-cyber-border overflow-hidden relative shadow-2xl">
        <ReactFlow
          nodes={displayedNodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={handleNodeClick}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          className="bg-grid-pattern"
        >
          <Background color="#38bdf8" gap={24} />
          <Controls className="!bg-slate-900 !border-slate-800 !text-gray-200" />
          <MiniMap
            nodeColor={(n) => {
              const status = (n.data as CyberNodeData)?.status;
              if (status === "red") return "#ef4444";
              if (status === "orange") return "#f97316";
              if (status === "blue") return "#38bdf8";
              return "#10b981";
            }}
            className="!bg-slate-950/90 !border-slate-800"
          />
        </ReactFlow>

        {/* Legend Overlay at bottom left */}
        <div className="absolute bottom-4 left-4 p-3 rounded-xl bg-cyber-dark/95 border border-cyber-border text-[11px] font-mono space-y-1.5 z-10 backdrop-blur-md">
          <div className="text-gray-400 font-bold uppercase text-[10px]">Node Status Legend</div>
          <div className="flex items-center gap-2 text-emerald-400">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Green: Healthy
          </div>
          <div className="flex items-center gap-2 text-orange-400">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-400" /> Orange: Suspicious
          </div>
          <div className="flex items-center gap-2 text-red-400">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400 animate-pulse" /> Red: Compromised
          </div>
          <div className="flex items-center gap-2 text-sky-400">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400" /> Blue: Isolated Host
          </div>
        </div>
      </div>

      {/* Drawer Component */}
      <NodeDetailDrawer
        nodeData={selectedNodeData}
        onClose={() => setSelectedNodeData(null)}
        onIsolateNode={handleIsolateNode}
      />
    </div>
  );
}
