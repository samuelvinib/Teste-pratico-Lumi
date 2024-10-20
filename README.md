# Teste Lumi

![Logo Lumi](https://uploads-ssl.webflow.com/62f9249c43126cafce10bc33/62fd12497ffcb83b28ea3309_logo-lumi-white.svg)

# Descrição

> ## Projeto de Análise de Faturas de Energia Elétrica
>
> Descrição: Este projeto consiste em uma aplicação full stack que extrai dados de faturas de energia elétrica, organiza as informações em um banco de dados PostgreSQL e fornece uma interface web para visualização e análise dos dados através de uma API. O sistema permite ao usuário visualizar gráficos de consumo de energia e resultados financeiros, bem como acessar uma biblioteca de faturas.
>

## Tecnologias utilizadas no projeto:

- **Back-end**: Node.js
- **Front-end**: React
- **Banco de dados**: PostgreSQL
- **Containers**: Docker
- **ORM**: Prisma.js

# Instalação do projeto

> - Certifique-se de ter o Docker instalado em sua máquina antes de iniciar.

## Passo 1

Após clonar o projeto em sua máquina local:

```bash
cd Teste-pratico-Lumi
```

## Passo 2

Execute o seguinte comando para construir e iniciar os containers do Docker:

```bash
docker-compose up -d --build
```

## Passo 3

Se desejar subir as faturas automaticamente no banco de dados, acesse o container da API:

```bash
docker exec -it lumi-api sh
```

## Passo 4

Faça o seed utilizando o prisma:

```bash
npx ts-node prisma/seed.ts
```

<h3 align="center">Obs: Se desejar pode salvar faturas utilizando o front-end pela aba "Enviar PDF"</h3>

<br>

<h3 align="center">Agora é só acessar o link abaixo ou clicar <a href="http://localhost:3000" target="_blank">aqui</a>
para visualizar o projeto!</h3>

```bash
  http://localhost:3000
```