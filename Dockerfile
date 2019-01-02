FROM node:lts-alpine as builder

## Install build toolchain, install node deps and compile native add-ons
RUN apk add --no-cache --virtual .gyp python make g++
RUN npm install [ your npm dependencies here ]

FROM node:lts-alpine as app

## Copy built node modules and binaries without including the toolchain
COPY --from=builder node_modules .