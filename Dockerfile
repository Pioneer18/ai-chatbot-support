# Step 1: Build stage
FROM node:16 AS build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Step 2: Run stage
FROM node:16-slim

WORKDIR /app
COPY --from=build /app .

RUN npm install --production

RUN apt-get update && apt-get install -y libc6

CMD ["node", "dist/main.js"]