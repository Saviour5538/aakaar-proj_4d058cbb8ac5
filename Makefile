# Variables
DOCKER_COMPOSE_FILE=docker-compose.yml

# Install dependencies for both backend and frontend
install:
	pip install -r backend/requirements.txt
	cd frontend && npm install

# Start development environment
dev:
	./scripts/dev.sh

# Build the frontend for production
build:
	cd frontend && npm run build

# Start all services using Docker Compose
docker-up:
	docker-compose -f $(DOCKER_COMPOSE_FILE) up --build -d

# Stop all services using Docker Compose
docker-down:
	docker-compose -f $(DOCKER_COMPOSE_FILE) down

# Clean up Docker resources
clean:
	docker-compose -f $(DOCKER_COMPOSE_FILE) down -v --remove-orphans
	docker system prune -f
	docker volume prune -f

# Run tests for backend and frontend
test:
	pytest backend/tests
	cd frontend && npm test