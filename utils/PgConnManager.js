const pg = require('pg')
const { Pool } = pg 
const fs = require('fs')

const pool = new Pool({ 
    connectionString: process.env.DB_CONNECTION + '&sslrootcert=certificates/ca-certificate.crt',
})

/*
const pool = new Pool({
    host: process.env.HOST,
    user: process.env.USERNAME,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.DB_PORT,
}) */

function executeQuery(text, params, callback) {
    return pool.query(text, params, callback)
}

module.exports = {  executeQuery }