# NetworX handoff and release reference

## Purpose and current scope

NetworX is a polished front-end demonstration of a cyber-decision workspace. Screens are populated from `lib/mockData.ts`; the two route handlers (`/api/copilot` and `/api/simulate`) return deterministic demo data. No user, incident, or command state is persisted.

This distinction matters: approved Copilot actions are UI-only state changes, and no command shown in the UI is sent to an endpoint or an endpoint-management product.

## Local development

Use Node.js 20.9+ and npm 10+.

```bash
npm install
npm run dev
npm run check
```

`npm run check` runs linting, strict TypeScript checking, and an optimized Next.js production build. The application uses the Next.js standalone output setting for container or Node-based deployment.

## Architecture

| Area | Location | Responsibility |
| --- | --- | --- |
| Pages and layout | `app/` | App Router routes, layouts, and UI composition |
| Demo APIs | `app/api/` | Copilot response and scenario-simulation mock endpoints |
| UI | `components/` | Navigation, command palette, graph/canvas, and details panels |
| Fixtures | `lib/mockData.ts` | Cyber topology, incidents, threat data, messages, and scenarios |
| Types | `types/cyber.ts` | Shared domain contracts |

## Deployment notes

1. Run `npm ci` and `npm run check` in CI using the supported Node/npm versions.
2. Build with `npm run build`.
3. Deploy the standalone server output (or use your managed Next.js host). Ensure `.next/static` and `public` assets are available alongside the standalone server when applicable.
4. Terminate TLS at the hosting edge and preserve the response security headers configured in `next.config.js`.

## Required work before an operational SOC release

- Replace all mock data and simulated endpoints with authenticated, tenant-scoped integrations.
- Implement SSO, session management, role-based authorization, CSRF protections where applicable, and audit trails.
- Validate and rate-limit all API inputs; add structured error logging and monitoring.
- Route approval actions through a durable approval workflow with identity, reason, timestamps, rollback status, and a real execution connector.
- Add automated unit, integration, and end-to-end tests covering authorization and critical workflows.
- Establish incident-data retention, secrets management, privacy review, and operational runbooks.

## Troubleshooting

- If `next build` reports an OS permission error while creating a worker, rerun it in a normal developer shell or CI runner that permits child processes. This is an execution-environment restriction, not a TypeScript error.
- If client behavior changes after editing mock data, restart `npm run dev` and refresh the browser.
