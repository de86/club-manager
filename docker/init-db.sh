#!/bin/bash
set -e

# Define your database name
DB_NAME=club_manager
POSTGRES_USER=admin
POSTGRES_PASSWORD=postgres

# Function to check if PostgreSQL is ready
function wait_for_postgres() {
  until pg_isready -h "localhost" -U "$POSTGRES_USER"; do
    echo "Waiting for PostgreSQL to be ready..."
    sleep 1
  done
}

# Wait for PostgreSQL to be ready
wait_for_postgres

# Check if the database exists and create it if it doesn't
DB_EXISTS=$(PGPASSWORD=$POSTGRES_PASSWORD psql -U "$POSTGRES_USER" -d postgres -tAc "SELECT 1 FROM pg_database WHERE datname='$DB_NAME'")

if [ "$DB_EXISTS" != "1" ]; then
  echo "Database $DB_NAME does not exist. Creating..."
  PGPASSWORD=$POSTGRES_PASSWORD createdb -U "$POSTGRES_USER" "$DB_NAME"
  echo "Database $DB_NAME created."
else
  echo "Database ready."
fi

sleep infinity