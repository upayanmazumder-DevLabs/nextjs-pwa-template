# ---------- Stage 1: Install frontend dependencies ----------
FROM node:23-alpine AS deps-app
WORKDIR /app

# Install dependencies only (cached unless package.json changes)
COPY app/package.json app/package-lock.json* ./
RUN npm ci

# ---------- Stage 2: Build the frontend ----------
FROM deps-app AS build-app
# Copy frontend source code and build
COPY app/ ./
RUN npm run build

# ---------- Stage 5: Final runtime image ----------
FROM node:23-alpine AS runner

# Install tini for proper signal handling
RUN apk add --no-cache tini

# Install PM2 globally to run both frontend
RUN npm install -g pm2

WORKDIR /workspace

# Copy built frontend
COPY --from=build-app /app ./app

# Copy PM2 ecosystem config
COPY ecosystem.config.js ./

# Expose frontend port
EXPOSE 3000

# Use tini as init system to handle signals properly
ENTRYPOINT ["/sbin/tini", "--"]

# Start both processes using PM2
CMD ["pm2-runtime", "start", "ecosystem.config.js"]
