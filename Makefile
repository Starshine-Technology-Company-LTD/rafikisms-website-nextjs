PROJ_NAME=rafikisms-landing

up:
	docker  compose --project-name $(PROJ_NAME) down
	PORT=$(PORT) docker compose --project-name $(PROJ_NAME) up -d --build
	sleep 5
	docker compose --project-name $(PROJ_NAME) logs -f app

logs:
	docker compose --project-name $(PROJ_NAME) logs -f app

