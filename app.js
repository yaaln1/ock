require('dotenv').config()
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')

const app = express()

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/bid', require('./routes/bid.routes'))
app.use('/api/doc', require('./routes/doc.routes'))
app.use('/api/user', require('./routes/user.routes'))
// app.use('/api/link', require('./routes/link.routes'))
// app.use('/t', require('./routes/redirect.routes'))

const PORT = process.env.PORT || 5000

async function start() {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        app.listen(PORT, () => console.log(`Server started at port ${PORT}`))
    } catch (e) {
        console.log(`Server error`, e.message)
        process.exit(1)
    }
}

start()