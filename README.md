# Instalando o projeto

Para começar, é necessário fazer as instalações, é só rodar `npm i` com o NodeJs instalado


Criação de um arquivo .env para a conexão com a database, o arquivo deve ter
```
    DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
```
Reference: [Prisma connection URL](https://www.prisma.io/docs/reference/database-reference/connection-urls)
