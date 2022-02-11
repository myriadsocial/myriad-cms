# Install dependencies only when needed
FROM node:14.17.5-buster-slim AS dependencies
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --network-timeout 100000

# Rebuild the source code only when needed
FROM node:14.17.5-buster-slim AS builder
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN NODE_ENV=production yarn build && \
  yarn install --production --prefer-offline --network-timeout 100000

# Production image, copy all the files and run
FROM nginx:1.21.6-alpine AS runner
LABEL social.myriad.image.authors="myriad.dev@blocksphere.id"
WORKDIR /usr/share/nginx/html
COPY ./.maintain/docker/env.sh .

RUN apk add --no-cache bash; chmod +x env.sh

COPY ./.maintain/docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]
