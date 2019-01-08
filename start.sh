#!/bin/bash
docker-compose up -d
sleep 30
docker-compose exec router mongo
