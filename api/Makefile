#!/bin/bash
# Author: Fabricio Luis Covalesci            									
# Contact: fabcovalesci@gmail.com									
# Description: Scripts to Automate Daily Tasks 									
# Reference: https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html			
#       																	
#################################################################################

COMPOSE_FILE = docker-compose.yml

BACKEND_API := 'api_school'
TAG := '1.0'


.PHONY: help build up up-build down stop


help: ## Help with commands
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)



# DOCKER TASKS

build: ## Image build
	docker build -t $(BACKEND_API):$(TAG) .


roll:
	CONTAINER_ID=$$(docker ps | grep 'back-end_api' | awk '{print $$1}'); \
	docker exec -it $$CONTAINER_ID npm run rollback


up: ## Execute docker compose
	docker-compose -f $(COMPOSE_FILE) up


up-build: ## Builds the docker image and runs container
	docker-compose -f $(COMPOSE_FILE) up --build


down:
	docker-compose -f $(COMPOSE_FILE) down


stop: ## For all running containers
	docker stop $(docker ps -q)