# Todo App Assessment

## Prerequisites

Before running this project, ensure you have the following installed:
- Git
- Docker
- Docker Compose

## Getting Started

### 1. Checkout the "dockarize" branch
```bash
git checkout dockarize
```

### 2. Run Docker Compose
```bash
docker compose up -d
```

This will start all the required containers in detached mode (running in the background).

## Useful Commands

### Check container status
```bash
docker compose ps
```

### View logs
```bash
docker compose logs
```

### Stop containers
```bash
docker compose down
```

### View logs for a specific service
```bash
docker compose logs <service-name>
```

## Troubleshooting

If containers fail to start, check the logs using `docker compose logs` to identify the issue.

