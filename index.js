require('dotenv').config()
const express = require('express')
const SearchController = require('./controller/searchController')
const UserController = require('./controller/UserController')

const port = process.env.PORT || 3004
const app = express()
const searchController = new SearchController()
const userController = new UserController()

app.use('/api', searchController.routes)
app.use('/api', userController.routes)

app.listen(port, () => {
    console.log(`Iniciando servidor back-end, porta ${port}`)
})