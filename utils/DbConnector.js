const postgres = require('postgres')
require('dotenv').config()

function newConection() {
    return postgres(process.env.DB_CONNECTION)
}

module.exports = { newConection } 