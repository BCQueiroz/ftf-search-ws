const pg = require('pg')
const { Pool } = pg 
const fs = require('fs')

const pool = new Pool({ 
    connectionString: process.env.DB_CONNECTION + '&sslrootcert=utils/certificates/ca-certificate.crt' 
})

function executeQuery(text, params, callback) {
    return pool.query(text, params, callback)
}

module.exports = {  executeQuery }