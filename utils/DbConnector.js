const postgres = require('postgres')
require('dotenv').config()

const postgresSql = postgres(process.env.DB_CONNECTION)

module.exports = postgresSql