const pg = require('pg')
const { Pool } = pg 

const pool = new Pool({ 
    connectionString: process.env.DB_CONNECTION
})

function executeQuery(text, params, callback) {
    return pool.query(text, params, callback)
}

module.exports = {  executeQuery }