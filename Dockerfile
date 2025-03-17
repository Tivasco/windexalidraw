# Use Node.js as the base image
FROM node:18-alpine

# Install netcat for database connection checking
RUN apk add --no-cache netcat-openbsd

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entrypoint script
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Copy the rest of the application
COPY . .

# Expose ports for the API and frontend
EXPOSE 3001 5173

# Set the entrypoint script
ENTRYPOINT ["docker-entrypoint.sh"]

# Start both the API server and frontend in development mode
CMD ["npm", "run", "start-docker"] 