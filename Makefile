default: help;

SVC_FRONTEND=frontend

# Hidden commands, to be used as deps
_env: ## Build .env with needed info for docker compose
	if [ ! -f .env ]; then \
		echo "USER_UID=$$(id -u)" > .env; \
		echo "USER_GID=$$(id -g)" >> .env; \
		echo "USERNAME=$$(id -un)" >> .env; \
		echo "HOME_DIR=$${HOME}" >> .env; \
	fi;
.PHONY: _env

_build: _env ## Pull & build the services
	docker compose build --pull
.PHONY: _build

# Usable commands
up: stop ## Start all the containers
	docker compose up -d
	docker compose logs -f
.PHONY: up

start: up ## Alias for up
.PHONY: start

down: stop ## Alias for stop
.PHONY: down

stop: ## Stop and remove all the containers
	docker compose down --remove-orphans
.PHONY: stop

frontend: _build ## Open a bash inside the backend container
	docker compose run --rm ${SVC_FRONTEND} sh
.PHONY: frontend

setup: _build ## Build and install the dependencies
	docker compose run --rm ${SVC_FRONTEND} sudo chown -R $$(id -u):$$(id -g) ./.pnpm-store ./node_modules
	docker compose run --rm ${SVC_FRONTEND} pnpm i
.PHONY: setup

format: ## Format all files inside frontend
	docker compose run --rm ${SVC_FRONTEND} pnpm run format
.PHONY: format

check_linting: ## Verify code with lint tools
	docker compose run --rm ${SVC_FRONTEND} pnpm run check-format
	docker compose run --rm ${SVC_FRONTEND} pnpm run lint
.PHONY: check_format

build: ## Build production images
	${DCK_PROD} build --pull
.PHONY: build

logs: ## Show the logs (can be used with svc=backend to specify a service)
	docker compose logs -f ${svc}
.PHONY: logs

help: ## Display commands help
	@grep -E '^[a-zA-Z][a-zA-Z_-]+:.*?## .*$$' Makefile | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
.PHONY: help
