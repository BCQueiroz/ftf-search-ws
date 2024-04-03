require('dotenv').config()
const express = require('express')
const cors = require('cors')

const SearchService = require('../service/searchService')
const UserService = require('../service/userService')
const SavedLocalsService = require('../service/savedLocalsService')

const port = process.env.PORT || 3000
const app = express()

const searchServiceImpl = new SearchService()
const userService = new UserService()
const savedLocalsService = new SavedLocalsService()


app.use(cors())
app.use('/api/search', searchServiceImpl.routes)
app.use('/api/auth', userService.routes)
app.use('/api/saved', savedLocalsService.routes)

app.listen(port, () => {
    console.log(`Iniciando servidor back-end, porta ${port}`)
})

app.get('/', (req, res) => res.send("Express on Vercel"));

module.exports = app