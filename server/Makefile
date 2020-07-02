SHELL := /bin/bash

PROJECT_NAME ?= weather-app
SERVICE ?= php
COMPOSER_DEFAULTS :=--no-interaction --no-ansi --no-scripts --optimize-autoloader
COMPOSER_OPTS :=

start-app: docker/.env app/.env start composer-install migration seed clear-cache

start:
	docker-compose --project-name=${PROJECT_NAME} up -d --build

stop:
	docker-compose --project-name=${PROJECT_NAME} down -v;

ssh:
	docker-compose --project-name=${PROJECT_NAME} exec ${SERVICE} sh;

ssh-db:
	docker-compose --project-name=${PROJECT_NAME} exec db sh;

logs:
	docker-compose --project-name=${PROJECT_NAME} logs -f

docker/.env: # make sure docker defaults are in place
	test -f .env || cp .env.docker.example .env

app/.env: # make sure application defaults are in place
	test -f src/.env || cp .env.app.example src/.env

composer-install:
	docker-compose --project-name=${PROJECT_NAME} exec -Tu$$(id -u) php composer install $(COMPOSER_DEFAULTS) $(COMPOSER_OPTS)

migration:
	docker-compose --project-name=${PROJECT_NAME} exec -T php php artisan migrate

seed:
	docker-compose --project-name=${PROJECT_NAME} exec -T php php artisan db:seed --class=CitySeeder

clear-cache:
	docker-compose --project-name=${PROJECT_NAME} exec -T php php artisan cache:clear

clean-project:
	-docker kill $$(docker ps -qa -f "name=${PROJECT_NAME}*") 2>/dev/null || true
	-docker rm $$(docker ps -qa -f "name=${PROJECT_NAME}*") 2>/dev/null || true
	-docker rmi -f $$(docker images "${PROJECT_NAME}*" -qa) 2>/dev/null || true
	-docker rmi -f $$(docker images -f 'dangling=true' -qa) 2>/dev/null || true
	-docker network rm $$(docker network ls -q -f "name=${PROJECT_NAME}*") 2>/dev/null || true
	-yes | docker volume prune 2>/dev/null || true
