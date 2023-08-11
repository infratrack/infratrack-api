FROM public.ecr.aws/docker/library/node:18-alpine

WORKDIR /home/infratrack-api

COPY package.json ./

RUN npm install

RUN npx prisma generate

COPY . .