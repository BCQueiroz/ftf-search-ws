const express = require('express')
const port = process.env.PORT || 3001
const app = express()

app.listen(port, () => {
    console.log(`Iniciando servidor para teste, porta ${port}`)
})