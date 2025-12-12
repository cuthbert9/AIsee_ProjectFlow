# Stage 1: Build the app
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build    # this creates /app/dist folder

# Stage 2: Runtime — MUST use Node 22 (same as local)
FROM node:22-alpine
WORKDIR /app

# Copy only the built app + node_modules from builder
COPY --from=builder /app /app

EXPOSE 3000

# THIS IS THE CORRECT COMMAND — your app actually has dist/index.js after build
CMD ["node", "dist/index.js"]