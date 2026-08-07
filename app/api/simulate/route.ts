import { NextResponse } from "next/server";
import { RESPONSE_SCENARIOS } from "@/lib/mockData";

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
    typeof (body as { scenarioId?: unknown }).scenarioId !== "string"
  ) {
    return NextResponse.json({ error: "scenarioId must be a string" }, { status: 400 });
  }

  try {
    const { scenarioId } = body as { scenarioId: string };

    const scenario = RESPONSE_SCENARIOS.find((s) => s.id === scenarioId);

    if (!scenario) {
      return NextResponse.json({ error: "Invalid scenario ID" }, { status: 400 });
    }

    // Simulate response delay and calculations
    return NextResponse.json({
      status: "simulation_complete",
      scenario,
      metrics: {
        containedIn: `${scenario.downtimeMinutes} min`,
        successProbability: `${scenario.successRate}%`,
        residualRisk: `${scenario.riskScore}/100`,
        executionCost: scenario.costEstimate
      }
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to run scenario simulation" },
      { status: 500 }
    );
  }
}
