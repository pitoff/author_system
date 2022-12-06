const express = require('express')
const app = express()
const http = require('http').createServer(app)
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const authRoutes = require('./routes/AuthRoutes')
const bookRoutes = require('./routes/BookRoutes')
const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions))
app.use(express.json({extended:true}))
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use('/', authRoutes)
app.use('/book', bookRoutes)

app.get('/', (req, res) => {
    res.send("connected to server")
})

// app.get('/create-cookie', (req, res) => {
//     res.cookie('check', true, {maxAge: 24*60*60*1000})
//     res.send('cookie has been set')
// })

const PORT = process.env.PORT || 5000

const mongodb = "mongodb://localhost:27017/author_system"
mongoose.connect(mongodb, {useNewUrlParser:true, useUnifiedTopology: true})
.then(() => http.listen(PORT, () => {
    console.log(`connected, listening on port ${PORT}`)
})).catch((error) => console.log(error))