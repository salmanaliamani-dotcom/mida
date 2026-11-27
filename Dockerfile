# Neon Shadow Studio — production image (Node 22 + FFmpeg with libass/x264)
FROM node:22-bookworm-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build && npm prune --omit=dev

FROM node:22-bookworm-slim
RUN apt-get update \
  && apt-get install -y --no-install-recommends ffmpeg fonts-dejavu-core fontconfig ca-certificates \
  && rm -rf /var/lib/apt/lists/*
WORKDIR /app
ENV NODE_ENV=production \
    PORT=3000 \
    DATA_DIR=/data \
    NEXT_TELEMETRY_DISABLED=1
COPY --from=build /app ./
# Projects, media and encrypted keys live here — mount a persistent volume on /data
VOLUME ["/data"]
EXPOSE 3000
CMD ["sh", "-c", "npx next start -p ${PORT:-3000}"]
