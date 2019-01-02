FROM node:lts-alpine

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

WORKDIR /app
COPY . /app

RUN apk add --no-cache --virtual .gyp python make g++
RUN npm install -g mongodb
RUN npm install
RUN apk del .gyp

EXPOSE 8000