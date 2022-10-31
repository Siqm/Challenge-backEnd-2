import express from 'express'
import { router } from './routes'
import dotenv from "dotenv/config.js"

const app = express() 

app.use(express.json());

app.use(router)

export { app }