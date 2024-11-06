FROM node:23-alpine

WORKDIR /app

COPY package.json /app

RUN npm ci

COPY . /app

RUN npm run build

ENTRYPOINT [ "node", "build/index.js" ]