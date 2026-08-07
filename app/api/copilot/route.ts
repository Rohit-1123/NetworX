import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON" }, { status: 400 });
  }

  if (
    !body ||
    typeof body !== "object" ||
    Array.isArray(body) ||
    typeof (body as { prompt?: unknown }).prompt !== "string"
  ) {
    return NextResponse.json({ error: "prompt must be a string" }, { status: 400 });
  }

  const prompt = (body as { prompt: string }).prompt.trim();

  if (!prompt) {
    return NextResponse.json({ error: "prompt must not be empty" }, { status: 400 });
  }

  if (prompt.length > 4_000) {
    return NextResponse.json(
      { error: "prompt must not exceed 4000 characters" },
      { status: 400 }
    );
  }

  try {

    const query = prompt.toLowerCase();

    let text = "NetworX Cyber Intelligence analyzed your request.";
    let explanation = "Threat baseline evaluation completed against MITRE ATT&CK enterprise catalog.";
    let confidenceScore = 95;

    let recommendedActions = [
      {
        id: "act-isolate",
        title: "Isolate Finance Laptop (192.168.1.104)",
        command: "networx-cli device isolate --ip 192.168.1.104 --strict",
        rollback: "networx-cli device restore --ip 192.168.1.104",
        confidence: 96,
        impact: "Downtime: 5 mins | Risk Reduction: 92%"
      },
      {
        id: "act-block-c2",
        title: "Block C2 IP at Firewall (45.142.214.8)",
        command: "networx-cli firewall block --ip 45.142.214.8 --ttl 24h",
        rollback: "networx-cli firewall unblock --ip 45.142.214.8",
        confidence: 90,
        impact: "Downtime: 0 mins | Sever C2 Pipeline"
      }
    ];

    if (query.includes("what should i do") || query.includes("recommend") || query.includes("respond")) {
      text = "Recommended Containment Strategy: Immediately execute Host Isolation on Finance Laptop (192.168.1.104) and inject edge firewall drop rule for 45.142.214.8.";
      explanation = "LSASS dumping attempt confirmed. Delaying containment past 5 minutes increases lateral movement probability to Customer DB by 84%.";
      confidenceScore = 97;
    } else if (query.includes("explain") || query.includes("attack") || query.includes("cve")) {
      text = "Attack Analysis: Initial entry achieved via Spear-Phishing Excel attachment 'Invoice_Q3.xlsm' delivering a Cobalt Strike stager. The payload invoked wscript.exe -> powershell.exe with base64 encoded parameters.";
      explanation = "Correlated using process execution telemetry, DNS query logs for update-check-auth.com, and outbound HTTPS traffic to IP 45.142.214.8.";
      confidenceScore = 98;
    } else if (query.includes("rollback") || query.includes("undo")) {
      text = "Rollback Protocol Ready: Re-enabling network interface for isolated hosts will require automated malware scan verification and Kerberos credential reset confirmation.";
      explanation = "Prevents re-infection loop upon network re-attachment.";
      confidenceScore = 92;
    }

    return NextResponse.json({
      text,
      explanation,
      confidenceScore,
      recommendedActions
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to process AI Copilot query" },
      { status: 500 }
    );
  }
}
