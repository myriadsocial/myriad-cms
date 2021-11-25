FROM node:14.17.5-buster-slim AS dependencies
WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile --network-timeout 100000
RUN yarn build
ENV NODE_ENV=production HOST=0.0.0.0 PORT=3000
EXPOSE ${PORT}
ENTRYPOINT ["yarn", "start"]
