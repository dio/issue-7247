PORT ?= 10000

up:
	PORT=$(PORT) docker-compose up

down:
	PORT=$(PORT) docker-compose down

build:
	PORT=$(PORT) docker-compose build

.PHONY: up down
