PROJECT_NAME=home-test
DOCKER_COMPOSE_FILES=.docker/docker-compose.yml
DOCKER_COMPOSE=docker-compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILES)
DOCKER_SERVICE_APP_NAME=app
DOCKER_SERVICE_DB_NAME=mysql

startup: down
	$(DOCKER_COMPOSE) up --build -d

migrate:
	$(DOCKER_COMPOSE) run --rm $(DOCKER_SERVICE_APP_NAME) bash -c "yarn run migration:run"

seed:
	$(DOCKER_COMPOSE) exec -it $(DOCKER_SERVICE_DB_NAME) bash -c "mysql -uroot -p123456 db < /usr/src/app/.docker/mysql/init.sql"

down:
	$(DOCKER_COMPOSE) down --remove-orphans

logs:
	$(DOCKER_COMPOSE) logs -f $(service)
