require('dotenv').config()
const express = require('express')
const SearchService = require('../service/searchService')
const UserService = require('../service/userService')
const SavedLocalsService = require('../service/savedLocalsService')

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

app.get('/', (req, res) => res.send("Express on Vercel"));

/*app.get('/api/search/search-locals', async(req, res) => {
    res.send(await searchService.searchLocals(req, res))
})

app.get('/api/search/get-all-tags', async(req, res) => {
    res.send(await searchService.getAllTags(req, res))
})

app.get('/api/search/get-all-cities', async(req, res) => {
    res.send(await searchService.getAllCities(req, res))
})

app.get('/api/search/get-local-additional-info', async(req, res) => {
    res.send(await searchService.getLocalAdditionalInfo(req, res))
})*/

module.exports = app