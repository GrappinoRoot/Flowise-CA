# AgentHub Flowise local runtime

This local compose file recreates the existing `agenthub-flowise` container from inside the Flowise repo.

It uses:

- Image: `flowiseai/flowise:3.1.2`
- Container name: `agenthub-flowise`
- Port: `127.0.0.1:3000->3000`
- Data volume: `agenthub-flowise-data:/root/.flowise`

## Start

```bash
cd /Users/codestorm/Desktop/Flowise/Flowise/docker/local
docker compose -f agenthub-flowise.compose.yml up -d
```

## Stop

```bash
cd /Users/codestorm/Desktop/Flowise/Flowise/docker/local
docker compose -f agenthub-flowise.compose.yml stop
```

## Recreate after changing this compose file

```bash
cd /Users/codestorm/Desktop/Flowise/Flowise/docker/local
docker compose -f agenthub-flowise.compose.yml up -d --force-recreate
```
