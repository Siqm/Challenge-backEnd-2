import 'express-async-errors'
import express from 'express'
import { router } from './routes'
import dotenv from "dotenv/config.js"
import { errorMiddleware } from './middlewares/Errors';

const app = express() 

app.use(express.json());

app.use(router)

app.use(errorMiddleware)

export { app }