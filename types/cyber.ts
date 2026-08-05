export type NodeStatus = "green" | "orange" | "red" | "blue";

export type NodeType = "server" | "firewall" | "pc" | "cloud" | "database" | "router" | "switch";

export interface CyberNodeData extends Record<string, unknown> {
  label: string;
  type: NodeType;
  status: NodeStatus;
  ip: string;
  os?: string;
  riskScore: number; // 0 - 100
  threatHistory: {
    timestamp: string;
    event: string;
    severity: "low" | "medium" | "high" | "critical";
  }[];
  aiExplanation: string;
  attackTimeline: {
    time: string;
    action: string;
    status: string;
  }[];
  department?: string;
  owner?: string;
  isIsolated?: boolean;
}

export interface AttackStage {
  id: number;
  title: string;
  nodeId: string;
  description: string;
  vector: string;
  timestamp: string;
  status: "completed" | "current" | "predicted";
  techniqueId: string; // e.g., T1566.001
  riskLevel: "low" | "medium" | "high" | "critical";
  confidenceScore: number;
  estimatedTimeRemaining?: string;
}

export interface ResponseScenario {
  id: "A" | "B" | "C";
  name: string;
  action: string;
  target: string;
  successRate: number; // %
  downtimeMinutes: number;
  businessImpact: "Low" | "Medium" | "High" | "Critical";
  riskScore: number; // 0 - 100
  costEstimate: string;
  aiRecommendation: string;
  steps: string[];
}

export interface CopilotMessage {
  id: string;
  sender: "user" | "copilot";
  timestamp: string;
  text: string;
  explanation?: string;
  recommendedActions?: {
    id: string;
    title: string;
    command: string;
    rollback: string;
    confidence: number;
    impact: string;
    approved?: boolean;
    rejected?: boolean;
  }[];
  confidenceScore?: number;
}

export interface IncidentReport {
  id: string;
  title: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  date: string;
  affectedSystems: string[];
  executiveSummary: string;
  aiReasoning: string;
  riskScore: number;
  iocs: {
    type: "IP" | "MD5" | "Domain" | "Process";
    value: string;
    status: "Malicious" | "Suspicious";
  }[];
  mitigations: string[];
}

export interface ThreatIntelItem {
  id: string;
  cveId?: string;
  title: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  cvssScore: number;
  source: string;
  publishedDate: string;
  description: string;
  affectedComponent: string;
  mitigationUrl: string;
  category: "Zero-Day" | "CVE" | "OWASP" | "MITRE";
}
