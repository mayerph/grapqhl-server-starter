FROM node:lts-alpine as builder

RUN apk add --no-cache --virtual .gyp python make g++
RUN npm install

FROM node:alpine as app

COPY --from=builder node_modules .
