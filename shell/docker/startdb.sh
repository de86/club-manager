#!/bin/bash

# Variables
ROOT_PASSWORD="password"
DATABASE="club_manager"
USER="admin"
PASSWORD="password"
VOLUME_NAME="club_manager_data"
CONTAINER_NAME="club_manager_postgres_db"

# Pull the latest MySQL image
docker pull postgres:latest

# Create a Docker volume for data persistence
docker volume create $VOLUME_NAME

# Run the MySQL Docker container
docker run -d \
  --name $CONTAINER_NAME \
  -p 5432:5432 \
  -e POSTGRES_DB=$DATABASE \
  -e POSTGRES_USER=$USER \
  -e POSTGRES_PASSWORD=$ROOT_PASSWORD \
  -v $VOLUME_NAME:/var/lib/postgresql/data \
  postgres:latest

# Print the status
if [ $? -eq 0 ];  then
  echo "PostgreSQL container started successfully."
  echo "Database details:"
  echo "Root Password: $ROOT_PASSWORD"
  echo "Database Name: $DATABASE"
  echo "User: $USER"
  echo "User Password: $PASSWORD"
  echo "PostgresSQL is running on port 5432."
else
  echo "Failed to start MySQL container."
fi
