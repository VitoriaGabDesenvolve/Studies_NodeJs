const express = require('express')
const cors = require('cors')
const routerUser = require('./src/routes/userRoutes')

const app = express()

app.use(cors());
app.use(express.json());
app.use('/api/users', routerUser)

app.listen(3030, ()=>{
    console.log("servidor iniciado na porta 3030")
})

module.exports = app;