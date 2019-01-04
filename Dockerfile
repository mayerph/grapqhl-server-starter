FROM node:lts-alpine

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

WORKDIR /app
COPY . /app

RUN apk add --no-cache --virtual .gyp python make g++
RUN npm install
RUN apk del .gyp

RUN npm run build-ts

ENTRYPOINT ["npm", "run", "start"]
EXPOSE 8000