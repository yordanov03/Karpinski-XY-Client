# # Step 1: Build the Angular application
# FROM node:14 as build

# # Set the working directory
# WORKDIR /app

# # Copy package.json and package-lock.json to the working directory
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the application code to the working directory
# COPY . .

# # Build the Angular application
# RUN npm run build --prod

# # Step 2: Serve the app with NGINX
# FROM nginx:alpine

# # Copy the built Angular files from the previous stage
# COPY --from=build /app/dist/dizo-ng /usr/share/nginx/html

# # Expose port 80 to the outside world
# EXPOSE 80

# # Start NGINX server
# CMD ["nginx", "-g", "daemon off;"]

# Step 1: Build the Angular application
FROM node:16 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application code to the working directory
COPY . .

# Build the browser and server bundles for production
RUN npm run build:ssr

# Step 2: Run the Angular Universal server
FROM node:16-alpine AS runtime

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist/dizo-ng ./dist/dizo-ng

ENV PORT=4000
EXPOSE 4000

# Start the server-rendered application
CMD ["node", "dist/dizo-ng/server/main.js"]

