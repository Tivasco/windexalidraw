#!/bin/sh
set -e

# Wait for the database to be ready
echo "Waiting for MySQL to be ready..."
while ! nc -z $DB_HOST $DB_PORT; do
  sleep 1
done
echo "MySQL is ready!"

# Initialize the database if needed
echo "Database is ready for use"

# Start the application
echo "Starting WebApp Boilerplate..."
exec "$@" 