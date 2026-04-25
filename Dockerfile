# ─────────────────────────────────────────────
# Build Stage
# ─────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

# Build args para variables NEXT_PUBLIC_*
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_ADSENSE_ID
ARG NEXT_PUBLIC_GA_ID
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
ARG DATABASE_URL
ARG DIRECT_URL

ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_ADSENSE_ID=$NEXT_PUBLIC_ADSENSE_ID
ENV NEXT_PUBLIC_GA_ID=$NEXT_PUBLIC_GA_ID
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=$NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
ENV DATABASE_URL=$DATABASE_URL
ENV DIRECT_URL=$DIRECT_URL

COPY package*.json ./
COPY prisma ./prisma
RUN npm ci

COPY . .
RUN npm run build

# ─────────────────────────────────────────────
# Production Stage
# ─────────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copiamos los archivos necesarios del modo standalone
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
