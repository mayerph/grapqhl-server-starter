FROM node:lts-alpine as builder

RUN apk add --no-cache --virtual .gyp python make g++
RUN npm install
RUN apk del .gyp
