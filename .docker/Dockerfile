FROM node:18.12.1-slim AS development

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN yarn install

USER node
