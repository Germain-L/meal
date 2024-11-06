FROM node:23-alpine

WORKDIR /app

RUN npm i -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm ci

COPY . ./

RUN pnpm run build

ENTRYPOINT [ "node", "build/index.js" ]