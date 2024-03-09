require('dotenv').config()
const express = require('express')
const SearchService = require('../service/SearchService')
const UserService = require('../service/UserService')
const SavedLocalsService = require('../service/SavedLocalsService')

const port = process.env.PORT || 3001
const app = express()
const searchService = new SearchService()
const userService = new UserService()
const savedLocalsService = new SavedLocalsService()

app.use('/api/search', searchService.routes)
app.use('/api/auth', userService.routes)
app.use('/api/saved', savedLocalsService.routes)

app.listen(port, () => {
    console.log(`Iniciando servidor back-end, porta ${port}`)
})

app.get("/", (req, res) => res.send("Express on Vercel"));

module.exports = app