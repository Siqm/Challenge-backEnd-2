# Instalando o projeto

Para começar, é necessário fazer as instalações novamente e são elas:
```
    npm add typescript @types/express ts-node-dev -D
    npm i prisma -D
    npm i @prisma/client
    npm i @types/jest jest ts-jest -D
    npm i dotenv express supertest bcryptjs pg express-async-errors jsonwebtoken
    npm i --save-dev babel-jest @babel/core @babel/preset-env
    npm i @types/bcryptjs -D
    npm i --save @types/jsonwebtoken
```

Criação de um arquivo .env para a conexão com a database, o arquivo deve ter
```
    DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
```
Reference: [Prisma connection URL](https://www.prisma.io/docs/reference/database-reference/connection-urls)
