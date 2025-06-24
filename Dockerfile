#stage 1: build frontend assests
FROM node:20-alpine AS frontend-builder
WORKDIR /app

#copy frontend package files and install dependencies
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci

#copy rest of the frontend source and build
COPY frontend/ ./
RUN npm run build

#create final caddy image
FROM caddy:2-alpine

# Copy the built frontend assets from the builder stage into Caddy's webroot
COPY --from=frontend-builder /app/dist /usr/share/caddy