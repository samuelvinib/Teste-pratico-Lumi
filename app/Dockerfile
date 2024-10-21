FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install ci

ENV NODE_OPTIONS=--openssl-legacy-provider

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
