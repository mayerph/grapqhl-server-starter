FROM node:lts-alpine

RUN apk add --no-cache --virtual .gyp python make g++
RUN npm install
RUN apk del .gyp

CMD [ "node" ]