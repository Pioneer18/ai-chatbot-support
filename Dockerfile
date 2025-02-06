# Step 1: Build stage
FROM node:18 AS build

WORKDIR /app

# Copy package.json for better caching
COPY package.json package-lock.json ./

# Use npm ci for a clean, reproducible install
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Step 2: Run stage
FROM node:18-alpine

WORKDIR /app

# Copy only necessary files from the build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./app/package-lock.json ./

# Clean install
RUN npm ci --omit=dev

# Start the application
CMD ["node", "dist/main.js"]
