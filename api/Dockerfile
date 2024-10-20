FROM node:16

WORKDIR /usr/src/api

COPY package*.json ./

RUN npm install ts-node-dev -g
RUN npm install -g prisma
RUN npm install

# Instale o Netcat (nc)
RUN apt-get update && apt-get install -y netcat

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]