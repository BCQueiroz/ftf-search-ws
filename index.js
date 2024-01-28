require('dotenv').config()
const express = require('express')
const postgres = require('postgres')

const port = process.env.PORT || 3004
const app = express()

const postgressConnection = postgres(process.env.DB_CONNECTION, {})

app.get('/', (req, res) => {
    res.send("Hello mundo.")
})

app.get('/get-all-locals', async (req, res) => {
    const allLocals = await postgressConnection`SELECT * FROM tb_local`
    res.json(allLocals)
})

app.listen(port, () => {
    console.log(`Iniciando servidor back-end, porta ${port}`)
})