FROM obraun/node-jenkins as builder
WORKDIR /app

COPY . /app/.

RUN npm install
RUN npm run build-ts



FROM node:alpine as app

WORKDIR /app
COPY --from=builder /app/. /app/.

ENTRYPOINT ["npm", "run", "start"]

EXPOSE 8000