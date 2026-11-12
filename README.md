# LLM Chat

A small chat app built with FastAPI, the OpenAI API and React, used to learn CI/CD with GitHub and Jenkins.

## Structure

- `backend/`: FastAPI app (`app/`) and tests (`tests/`)
- `frontend/`: React + TypeScript (Vite)
- `Jenkinsfile`: CI pipeline (test, build, Docker images)

## Run locally

Create `backend/.env` with `OPENAI_API_KEY=...`, then:

```
cd backend && uv run uvicorn app.main:app --reload
cd frontend && npm install && npm run dev
```

Or with Docker: `docker compose up --build` (frontend on http://localhost:3000).

## Test

```
cd backend && uv run pytest
```

## CI

On every push, Jenkins runs the backend tests, builds the frontend, and builds both Docker images. The Jenkins agent needs `uv`, `node` and `docker`. In Jenkins, create a Pipeline job that points at this GitHub repo and uses the `Jenkinsfile`, then add a GitHub webhook to `http://<jenkins-host>/github-webhook/`.
