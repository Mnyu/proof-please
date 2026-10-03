# Stage 1: Base image
FROM oven/bun:1-alpine AS base
WORKDIR /app

# Stage 2: Install dependencies
FROM base AS deps
COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile

# Stage 3: Build the application
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Next.js telemetry can be disabled during build if preferred
ENV NEXT_TELEMETRY_DISABLED=1
RUN bun run build

# Stage 4: Migration image
FROM builder AS migrate
CMD ["bun", "run", "db:migrate"]

# Stage 5: Runtime image
FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create a non-root user for security
RUN addgroup --system --gid 1001 appgroup
RUN adduser --system --uid 1001 appuser

# Copy required standalone build files
COPY --from=builder /app/public ./public
COPY --from=builder --chown=appuser:appgroup /app/.next/standalone ./
COPY --from=builder --chown=appuser:appgroup /app/.next/static ./.next/static

USER appuser
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["bun", "server.js"]