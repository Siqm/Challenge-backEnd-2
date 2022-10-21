#Instalando o projeto

Para começar, é necessário fazer as instalações novamente e são elas:
```
    npm add typescript @types/express ts-node-dev -D
    npm add express
    npm i prisma -D
    npm i @prisma/client
```

Criação de um arquivo .env para a conexão com a database, o arquivo deve ter
```
    DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
```
Reference: [Prisma connection URL](https://www.prisma.io/docs/reference/database-reference/connection-urls)
