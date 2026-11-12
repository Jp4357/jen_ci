# LLM Chat

A small chat app built with FastAPI, the OpenAI API and React, used to learn CI/CD with GitHub and Jenkins.

## Structure

- `backend/`: FastAPI app (`app/`) and tests (`tests/`)
- `frontend/`: React + TypeScript (Vite)
- `Jenkinsfile`: CI pipeline (test, build, Docker images)
- `jenkins/`: local Jenkins in Docker, with `uv`, `node` and the Docker CLI

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

On every push, a GitHub webhook triggers Jenkins, which runs the backend tests, builds the frontend, and builds both Docker images. The webhook reaches local Jenkins through a [smee.io](https://smee.io) relay.

Create a channel at https://smee.io/new, put `SMEE_URL=<channel url>` in `jenkins/.env`, then:

```
cd jenkins && docker compose up -d --build
```

In GitHub, add a webhook (Settings, Webhooks) with the smee URL as payload URL, content type `application/json`, push events only.

Open http://localhost:8080 and unlock Jenkins with the password from `docker compose exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword`. Then create a Pipeline job: "Pipeline script from SCM", Git, this repo's URL, branch `*/main`, script path `Jenkinsfile`. 


### I AM DOING TESTING 

### AGIAN TESTING 

### NEW TEST
