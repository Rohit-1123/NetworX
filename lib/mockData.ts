import { CyberNodeData, AttackStage, ResponseScenario, CopilotMessage, IncidentReport, ThreatIntelItem } from "@/types/cyber";

export const INITIAL_CYBER_NODES: { id: string; position: { x: number; y: number }; data: CyberNodeData }[] = [
  {
    id: "fw-01",
    position: { x: 250, y: 50 },
    data: {
      label: "Edge Firewall (Palo Alto)",
      type: "firewall",
      status: "green",
      ip: "192.168.1.1",
      os: "PAN-OS 10.2",
      riskScore: 12,
      department: "Infrastructure",
      owner: "SecOps Team",
      aiExplanation: "Traffic rules enforced normally. 4,200 suspicious packets dropped in past hour.",
      threatHistory: [
        { timestamp: "10:14:02", event: "Port scan blocked from 185.220.101.5", severity: "low" }
      ],
      attackTimeline: [
        { time: "10:00:00", action: "Policy reloaded", status: "Clean" }
      ]
    }
  },
  {
    id: "cloud-01",
    position: { x: 550, y: 50 },
    data: {
      label: "AWS Production Cluster",
      type: "cloud",
      status: "green",
      ip: "10.0.10.4",
      os: "Amazon Linux 2023",
      riskScore: 18,
      department: "DevOps",
      owner: "Cloud Platform",
      aiExplanation: "Auto-scaling group healthy. Zero unauthorized IAM privilege escalations.",
      threatHistory: [],
      attackTimeline: []
    }
  },
  {
    id: "rtr-01",
    position: { x: 250, y: 200 },
    data: {
      label: "Core Switch / Router",
      type: "router",
      status: "green",
      ip: "192.168.1.254",
      os: "Cisco IOS-XE",
      riskScore: 24,
      department: "Network",
      owner: "NetOps",
      aiExplanation: "VLAN routing operational. Flow metrics match expected baseline traffic.",
      threatHistory: [],
      attackTimeline: []
    }
  },
  {
    id: "pc-fin-01",
    position: { x: 50, y: 350 },
    data: {
      label: "Finance Laptop (Sarah M.)",
      type: "pc",
      status: "red",
      ip: "192.168.1.104",
      os: "Windows 11 Enterprise",
      riskScore: 94,
      department: "Finance",
      owner: "Sarah Miller",
      aiExplanation: "CRITICAL: Malicious macro executed via spear-phishing payload 'Invoice_Q3.xlsm'. Active PowerShell beacon communicating with C2 server at 45.142.214.8.",
      threatHistory: [
        { timestamp: "10:24:18", event: "Phishing email downloaded attachment", severity: "high" },
        { timestamp: "10:25:01", event: "PowerShell encoded command execution", severity: "critical" },
        { timestamp: "10:25:33", event: "LSASS memory dump attempted", severity: "critical" }
      ],
      attackTimeline: [
        { time: "10:24:18", action: "Outlook Attachment Opened", status: "Executed" },
        { time: "10:25:01", action: "PowerShell Spawned (PID 4892)", status: "Active" },
        { time: "10:25:33", action: "Credential Theft via Mimikatz", status: "Success" }
      ]
    }
  },
  {
    id: "pc-hr-02",
    position: { x: 250, y: 350 },
    data: {
      label: "HR Workstation (Dave K.)",
      type: "pc",
      status: "orange",
      ip: "192.168.1.112",
      os: "Windows 11 Enterprise",
      riskScore: 68,
      department: "Human Resources",
      owner: "Dave Miller",
      aiExplanation: "SUSPICIOUS: Internal SMB probe detected from compromised Finance Laptop. Potential lateral movement target.",
      threatHistory: [
        { timestamp: "10:26:05", event: "Unauthorized SMB connection request from 192.168.1.104", severity: "medium" }
      ],
      attackTimeline: [
        { time: "10:26:05", action: "Port 445 (SMB) Inbound Probe", status: "Flagged" }
      ]
    }
  },
  {
    id: "srv-app-01",
    position: { x: 450, y: 350 },
    data: {
      label: "Internal App Server",
      type: "server",
      status: "orange",
      ip: "10.0.2.50",
      os: "Ubuntu 22.04 LTS",
      riskScore: 72,
      department: "IT Services",
      owner: "SysAdmin",
      aiExplanation: "SUSPICIOUS: Stolen kerberos ticket used for service account authentication attempt.",
      threatHistory: [
        { timestamp: "10:27:12", event: "Pass-The-Ticket Kerberos authentication", severity: "high" }
      ],
      attackTimeline: [
        { time: "10:27:12", action: "Kerberos TGS Request", status: "Anomalous" }
      ]
    }
  },
  {
    id: "db-cust-01",
    position: { x: 650, y: 350 },
    data: {
      label: "Customer Postgres DB",
      type: "database",
      status: "red",
      ip: "10.0.3.10",
      os: "PostgreSQL 15 Cluster",
      riskScore: 89,
      department: "Engineering",
      owner: "Data Engineering",
      aiExplanation: "HIGH RISK: Exfiltration candidate. Large query burst detected targeting table 'user_credentials' from App Server.",
      threatHistory: [
        { timestamp: "10:28:44", event: "Anomalous SELECT * query burst (50,000 records)", severity: "critical" }
      ],
      attackTimeline: [
        { time: "10:28:44", action: "Exfiltration query launched", status: "Active" }
      ]
    }
  },
  {
    id: "pc-dev-03",
    position: { x: 50, y: 500 },
    data: {
      label: "Dev Laptop (Alex R.)",
      type: "pc",
      status: "blue",
      ip: "192.168.1.140",
      os: "macOS Sonoma",
      riskScore: 5,
      department: "Engineering",
      owner: "Alex Rivera",
      aiExplanation: "ISOLATED: Node proactively isolated by NetworX automated policy during initial alert sweep.",
      threatHistory: [],
      attackTimeline: [
        { time: "10:20:00", action: "Network interface disabled", status: "Isolated" }
      ],
      isIsolated: true
    }
  }
];

export const INITIAL_CYBER_EDGES = [
  { id: "e-fw-rtr", source: "fw-01", target: "rtr-01", animated: true, style: { stroke: "#00f0ff" } },
  { id: "e-fw-cloud", source: "fw-01", target: "cloud-01", animated: true, style: { stroke: "#00f0ff" } },
  { id: "e-rtr-pc1", source: "rtr-01", target: "pc-fin-01", animated: true, style: { stroke: "#ef4444", strokeWidth: 2 } },
  { id: "e-rtr-pc2", source: "rtr-01", target: "pc-hr-02", animated: true, style: { stroke: "#f97316" } },
  { id: "e-rtr-srv", source: "rtr-01", target: "srv-app-01", animated: true, style: { stroke: "#f97316" } },
  { id: "e-srv-db", source: "srv-app-01", target: "db-cust-01", animated: true, style: { stroke: "#ef4444", strokeWidth: 3 } },
  { id: "e-pc1-hr", source: "pc-fin-01", target: "pc-hr-02", animated: true, style: { stroke: "#ef4444", strokeDasharray: "5,5" } },
  { id: "e-pc1-srv", source: "pc-fin-01", target: "srv-app-01", animated: true, style: { stroke: "#ef4444", strokeDasharray: "5,5" } },
];

export const ATTACK_GPS_STAGES: AttackStage[] = [
  {
    id: 1,
    title: "Phishing Email Delivered",
    nodeId: "pc-fin-01",
    description: "Spear-phishing email targeting Sarah Miller in Finance containing weaponized Excel macro attachment 'Invoice_Q3.xlsm'.",
    vector: "Email Gateway / Initial Access",
    timestamp: "10:24:18 AM",
    status: "completed",
    techniqueId: "T1566.001",
    riskLevel: "medium",
    confidenceScore: 99
  },
  {
    id: 2,
    title: "Macro Execution & Payload Drop",
    nodeId: "pc-fin-01",
    description: "Macro invoked wscript.exe to drop obfuscated PowerShell stager script into C:\\Users\\Public\\Update.ps1.",
    vector: "Execution / Malicious Scripting",
    timestamp: "10:25:01 AM",
    status: "completed",
    techniqueId: "T1059.001",
    riskLevel: "high",
    confidenceScore: 97
  },
  {
    id: 3,
    title: "PowerShell C2 Beaconing",
    nodeId: "pc-fin-01",
    description: "Encrypted HTTPS C2 channel established with external malicious server at IP 45.142.214.8 (Cobalt Strike Beacon).",
    vector: "Command and Control",
    timestamp: "10:25:33 AM",
    status: "completed",
    techniqueId: "T1071.001",
    riskLevel: "high",
    confidenceScore: 98
  },
  {
    id: 4,
    title: "Credential Dumping (LSASS)",
    nodeId: "pc-fin-01",
    description: "Attacker dumped LSASS process memory to harvest domain administrator Kerberos tickets.",
    vector: "Credential Access",
    timestamp: "10:26:12 AM",
    status: "current",
    techniqueId: "T1003.001",
    riskLevel: "critical",
    confidenceScore: 95,
    estimatedTimeRemaining: "3 mins to Lateral Spread"
  },
  {
    id: 5,
    title: "Lateral Movement to App Server",
    nodeId: "srv-app-01",
    description: "Predicted attack path: Attacker uses stolen Kerberos ticket to authentic via WMI to Internal App Server (10.0.2.50).",
    vector: "Lateral Movement",
    timestamp: "10:29:00 AM (Predicted)",
    status: "predicted",
    techniqueId: "T1021.002",
    riskLevel: "critical",
    confidenceScore: 88,
    estimatedTimeRemaining: "ETA 4-6 mins"
  },
  {
    id: 6,
    title: "Database Exfiltration Burst",
    nodeId: "db-cust-01",
    description: "Predicted final stage: Unauthorized SELECT dump of Customer Database credentials table and exfiltration out C2.",
    vector: "Exfiltration",
    timestamp: "10:33:00 AM (Predicted)",
    status: "predicted",
    techniqueId: "T1041",
    riskLevel: "critical",
    confidenceScore: 82,
    estimatedTimeRemaining: "ETA 8-12 mins"
  }
];

export const RESPONSE_SCENARIOS: ResponseScenario[] = [
  {
    id: "A",
    name: "Isolate Finance Laptop & Revoke Kerberos Tokens",
    action: "Network Isolation & Credential Reset",
    target: "192.168.1.104 (Finance Laptop)",
    successRate: 96,
    downtimeMinutes: 5,
    businessImpact: "Low",
    riskScore: 12,
    costEstimate: "$0 (Automated)",
    aiRecommendation: "RECOMMENDED: Completely neutralizes active C2 beacon and halts credential dump with minimal impact restricted to Sarah M.'s workstation.",
    steps: [
      "Disable NIC on 192.168.1.104 via CrowdStrike / Windows Defender API",
      "Revoke Kerberos TGT and TGS tickets for sarah.m@company.com",
      "Kill PowerShell process PID 4892 remotely",
      "Trigger automated forensics artifact collection"
    ]
  },
  {
    id: "B",
    name: "Block External C2 IP (45.142.214.8) at Firewall",
    action: "Firewall ACL Rule Injection",
    target: "Palo Alto Edge Firewall",
    successRate: 70,
    downtimeMinutes: 0,
    businessImpact: "Low",
    riskScore: 45,
    costEstimate: "$0",
    aiRecommendation: "MODERATE RISK: Temporarily severs active C2 pipe, but attacker could easily rotate to fallback C2 domain within minutes if host remains unisolated.",
    steps: [
      "Push dynamic IP drop rule 45.142.214.8/32 to Palo Alto Panorama",
      "Flush stateful NAT connection table",
      "Send alert to SOC Tier 2 queue"
    ]
  },
  {
    id: "C",
    name: "Shutdown Finance Subnet (VLAN 10)",
    action: "VLAN Port Shutdown / Subnet Isolation",
    target: "Core Switch VLAN 10 (192.168.1.0/24)",
    successRate: 100,
    downtimeMinutes: 40,
    businessImpact: "High",
    riskScore: 85,
    costEstimate: "$25,000 (Lost productivity)",
    aiRecommendation: "NOT RECOMMENDED: 100% containment guaranteed, but disrupts 45 non-infected finance employees and delays monthly payroll reporting.",
    steps: [
      "Execute `interface vlan 10 shutdown` on Core Switch",
      "Notify executive leadership of emergency subnet isolation",
      "Initiate manual physical sweep of floor 3 workstations"
    ]
  }
];

export const INITIAL_COPILOT_MESSAGES: CopilotMessage[] = [
  {
    id: "msg-1",
    sender: "copilot",
    timestamp: "10:26:00 AM",
    text: "NetworX Cyber Intelligence active. I have detected a Critical Threat Path initiated on Finance Laptop (192.168.1.104). Attack confidence is 97%.",
    explanation: "Cobalt Strike C2 beacon established following spear-phishing macro execution. LSASS memory dump detected in real-time.",
    confidenceScore: 97,
    recommendedActions: [
      {
        id: "act-isolate-01",
        title: "Isolate Finance Laptop (192.168.1.104)",
        command: "networx-cli device isolate --ip 192.168.1.104 --mode strict",
        rollback: "networx-cli device restore --ip 192.168.1.104",
        confidence: 96,
        impact: "Downtime: 5 mins | Business Impact: Low"
      },
      {
        id: "act-block-c2",
        title: "Block C2 IP at Perimeter Firewall",
        command: "networx-cli firewall block --ip 45.142.214.8 --ttl 24h",
        rollback: "networx-cli firewall unblock --ip 45.142.214.8",
        confidence: 92,
        impact: "Downtime: 0 mins | Business Impact: Low"
      }
    ]
  }
];

export const INCIDENT_REPORTS: IncidentReport[] = [
  {
    id: "INC-2026-8841",
    title: "Spear-Phishing Credential Dumping & C2 Beaconing",
    severity: "Critical",
    date: "2026-08-05 10:24:18",
    affectedSystems: ["192.168.1.104 (Finance Laptop)", "192.168.1.112 (HR Workstation)", "10.0.2.50 (App Server)"],
    executiveSummary: "An adversary gained initial access to the internal network by delivering a malicious Excel macro document via spear-phishing. The payload dropped a PowerShell beacon communicating with C2 server 45.142.214.8 and attempted credential harvesting via LSASS dumping.",
    aiReasoning: "NetworX Cyber Twin engine correlated the abnormal process spawn of PowerShell (PID 4892) with anomalous outbound encrypted HTTPS connections on port 8443, confirming a high-probability Cobalt Strike implant.",
    riskScore: 94,
    iocs: [
      { type: "IP", value: "45.142.214.8", status: "Malicious" },
      { type: "MD5", value: "e1b2c3d4f5a6b7c8d9e0f1a2b3c4d5e6", status: "Malicious" },
      { type: "Domain", value: "update-check-auth.com", status: "Malicious" },
      { type: "Process", value: "powershell.exe -enc aQB3AHIA...", status: "Suspicious" }
    ],
    mitigations: [
      "Isolate host 192.168.1.104 from corporate VLAN",
      "Revoke domain Kerberos TGT tickets for compromised user account",
      "Inject C2 IP 45.142.214.8 into perimeter blocklist",
      "Deploy Microsoft Defender ASR rule to block Office applications from spawning child processes"
    ]
  },
  {
    id: "INC-2026-8790",
    title: "AWS Cloud IAM Escalation Attempt",
    severity: "Medium",
    date: "2026-08-03 14:12:00",
    affectedSystems: ["AWS Production Cluster (10.0.10.4)"],
    executiveSummary: "Anomalous IAM policy modification detected attempting to attach AdministratorAccess to temporary STS assume-role session.",
    aiReasoning: "Automated AI policy engine intercepted the policy attachment call based on baseline deviation rules and auto-reverted the role attachment.",
    riskScore: 45,
    iocs: [
      { type: "IP", value: "198.51.100.42", status: "Suspicious" }
    ],
    mitigations: [
      "Enforce mandatory SCP boundary preventing unauthorized AttachUserPolicy calls",
      "Rotate AWS Access Keys for service-account-deployer"
    ]
  }
];

export const THREAT_INTEL_FEED: ThreatIntelItem[] = [
  {
    id: "intel-1",
    cveId: "CVE-2026-21840",
    title: "Palo Alto PAN-OS Remote Code Execution in Management Interface",
    severity: "CRITICAL",
    cvssScore: 9.8,
    source: "NIST NVD / MITRE",
    publishedDate: "August 4, 2026",
    description: "An unauthenticated remote attacker can execute arbitrary code with root privileges on unpatched PAN-OS firewalls by sending specially crafted HTTP requests.",
    affectedComponent: "PAN-OS 10.2.0 - 10.2.8",
    mitigationUrl: "https://paloaltonetworks.com/security-advisories",
    category: "Zero-Day"
  },
  {
    id: "intel-2",
    cveId: "CVE-2026-19042",
    title: "PostgreSQL Authentication Bypass via Crafted SASL Exchange",
    severity: "HIGH",
    cvssScore: 8.4,
    source: "PostgreSQL Security Group",
    publishedDate: "August 1, 2026",
    description: "Flaw in SASL authentication mechanism allows network attackers to bypass password verification under specific kerberos configuration flags.",
    affectedComponent: "PostgreSQL 14.x, 15.x",
    mitigationUrl: "https://postgresql.org/about/news",
    category: "CVE"
  },
  {
    id: "intel-3",
    title: "OWASP Top 10: API Security Risks (2026 Edition Release)",
    severity: "HIGH",
    cvssScore: 8.0,
    source: "OWASP Foundation",
    publishedDate: "July 28, 2026",
    description: "Updated API security risk guidance featuring Broken Object Level Authorization (BOLA) and AI Agent Prompt Injection Exploits as primary enterprise vectors.",
    affectedComponent: "REST & GraphQL APIs / LLM Gateways",
    mitigationUrl: "https://owasp.org/www-project-api-security",
    category: "OWASP"
  },
  {
    id: "intel-4",
    title: "MITRE ATT&CK T1003.001 - OS Credential Dumping: LSASS Memory",
    severity: "CRITICAL",
    cvssScore: 9.1,
    source: "MITRE Enterprise Matrix",
    publishedDate: "Updated August 2026",
    description: "Adversaries attempt to extract credentials from LSASS memory using specialized tools like Mimikatz or LSASS process minidumps.",
    affectedComponent: "Windows Subsystem / LSASS",
    mitigationUrl: "https://attack.mitre.org/techniques/T1003/001",
    category: "MITRE"
  }
];
