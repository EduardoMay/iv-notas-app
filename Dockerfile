FROM node:14-alpine as build-step

ENV VUE_APP_TESTING_1 = $TESTING_1
ENV VUE_APP_TESTING_2 = TESTING_1

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

COPY .env.example .env

RUN npm run build

FROM nginx:1.17.1-alpine

COPY --from=build-step /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf