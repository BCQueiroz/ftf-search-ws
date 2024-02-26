require('dotenv').config()
const express = require('express')
const SearchController = require('./controller/searchController')
const UserController = require('./controller/UserController')
const SavedLocalsController = require('./controller/SavedLocalsController')

const port = process.env.PORT || 3004
const app = express()
const searchController = new SearchController()
const userController = new UserController()
const savedLocalsController = new SavedLocalsController()

app.use('/api/search', searchController.routes)
app.use('/api/auth', userController.routes)
app.use('/api/saved', savedLocalsController.routes)

app.listen(port, () => {
    console.log(`Iniciando servidor back-end, porta ${port}`)
})