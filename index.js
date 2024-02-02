require('dotenv').config()
const express = require('express')
const SearchController = require('./controller/searchController')

const port = process.env.PORT || 3004
const app = express()
const searchController = new SearchController()

app.use('/api', searchController.routes)

app.listen(port, () => {
    console.log(`Iniciando servidor back-end, porta ${port}`)
})