FROM node:18

WORKDIR /usr/src/api

COPY package*.json ./

# Instalar dependências do Prisma e outras dependências do projeto
RUN npm install prisma
RUN npm install ci

# Atualizar pacotes e instalar netcat-openbsd
RUN apt-get update && \
    apt-get install -y netcat-openbsd && \
    rm -rf /var/lib/apt/lists/*

# Copiar o restante da aplicação
COPY . .

# Expor a porta da aplicação
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "dev"]
