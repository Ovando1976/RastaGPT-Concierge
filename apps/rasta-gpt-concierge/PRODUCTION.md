# RastaGPT Production Launch

Production source branch: `production`
Project root: `apps/rasta-gpt-concierge`
Framework: Next.js

## Required production environment variables

### Firebase browser configuration
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` (optional if Analytics is unused)

### Firebase server credentials
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`

### OpenAI server credential and approved model routing
- `OPENAI_API_KEY`
- `OPENAI_FAST_MODEL=gpt-5.6-luna`
- `OPENAI_BALANCED_MODEL=gpt-5.6-terra`
- `OPENAI_REASONING_MODEL=gpt-5.6-sol`

### Mandatory application-side cost controls
- `RASTAGPT_USER_DAILY_COST_USD=0.50`
- `RASTAGPT_PLATFORM_MONTHLY_COST_USD=25`
- `RASTAGPT_USER_REQUESTS_PER_MINUTE=8`
- `RASTAGPT_ALLOW_WEB_SEARCH=false`

Production refuses AI spend when the daily or monthly budget variables are missing. Unknown model identifiers are also blocked before a provider request is sent.

## Recommended first deployment

1. Deploy this branch as a Vercel Preview first.
2. Confirm the build succeeds.
3. Open `/api/ai/health` and confirm `ready: true`.
4. Sign in with Firebase Auth.
5. Send one General-mode request and confirm streaming completes.
6. Send one Roots-mode request and confirm the response does not fabricate citations when no approved chunk is found.
7. Confirm Firestore contains the conversation, messages, request ledger, daily usage meter, and platform usage meter.
8. Confirm the expected small cost is recorded.
9. Promote the exact validated deployment to Production.

## Launch guardrails

- Keep web search disabled for the initial launch.
- Keep the platform monthly AI cap intentionally low until real usage is observed.
- Do not bypass the application usage ledger for any public AI route.
- Keep `OPENAI_API_KEY`, Firebase service-account credentials, and other server secrets out of Git and browser bundles.
- If `/api/ai/health` is not ready or authentication/usage accounting fails, do not promote the deployment.

## Rollback

If the production deployment produces authentication failures, incomplete streams, usage-ledger errors, or unexpectedly high spend, immediately roll back to the previous Vercel production deployment and disable the affected AI route until the cause is corrected.
