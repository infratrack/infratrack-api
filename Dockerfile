FROM public.ecr.aws/docker/library/node:18-alpine

# Create app directory
WORKDIR /home/infratrack

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY prisma ./prisma/

# Install app dependencies
RUN npm install

COPY . .

COPY /infratrack/node_modules ./node_modules
COPY /infratrack/package*.json ./
COPY /infratrack/dist ./dist

RUN npm run build

EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]