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

# Build the Angular application for production
RUN npm run build --configuration=production

# Step 2: Serve the app with NGINX
FROM nginx:alpine

# Remove the default NGINX configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Copy your custom NGINX configuration file if needed (optional)
# COPY nginx.conf /etc/nginx/conf.d

# Copy the built Angular files from the previous stage to the NGINX HTML directory
COPY --from=build /app/dist/dizo-ng /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]



