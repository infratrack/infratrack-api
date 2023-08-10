FROM node:16-alpine

WORKDIR /home/infratrack-api

COPY package.json ./

RUN npm install

COPY . .