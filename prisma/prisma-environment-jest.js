const NodeEnvironment = require('jest-environment-node').TestEnvironment
const { v4: uuid } = require('uuid')
const { execSync } = require('child_process')
const { resolve } = require('path')
const { Client } = require('pg')
const { throws } = require('assert')
const { connect } = require('http2')

const binPath = "./node_modules/.bin/"

require('dotenv').config({
    path: resolve(__dirname, "..", ".env.test")
})

class CustomEnvironment extends NodeEnvironment {

    constructor(config) {
        super(config);
        console.log("database url ", process.env.DATABASE_URL)
        this.schema = `code_schema_${uuid()}`;
        console.log("schemas", this.schema);
        this.connectionString = `${process.env.DATABASE_URL}${this.schema}`;
    }

    setup() {
        process.env.DATABASE_URL = this.connectionString
        this.global.process.env.DATABASE_URL = this.connectionString

        // Migrations
        execSync(`cd ${binPath}`)
        execSync(`prisma migrate dev`)
    }

    async teardown() {
        const client = new Client({
            connectionString: this.connectionString
        })

        await client.connect()
        await client.query(`DROP SCHEMA IF EXISTS "${this.schema}" CASCADE`)
        await client.end()
    }
}

module.exports =  CustomEnvironment