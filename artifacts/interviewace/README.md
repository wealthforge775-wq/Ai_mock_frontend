# InterviewAce frontend

This is a frontend-only React application. It does not create or replace the existing InterviewAce backend, database, Clerk tenant, or AI services.

## Configuration

Copy `.env.example` to `.env` and set:

- `VITE_API_BASE_URL` to the externally reachable base URL of the existing InterviewAce API. A backend running only on your computer's `localhost` cannot be reached from a Replit-hosted frontend.
- `VITE_CLERK_PUBLISHABLE_KEY` to the public publishable key for the existing Clerk instance. Do not put a Clerk secret key or other private credential in frontend configuration.

## Backend contract requirement

The available workspace API source documents only a generic health check. It does not include InterviewAce authentication, interview, resume, question, answer, transcription, completion, evaluation, history, dashboard, analytics, or report endpoints. The frontend intentionally does not guess those routes or show fabricated records. Those workflows will stay unavailable until the real API documentation or source is available.
