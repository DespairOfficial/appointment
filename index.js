const express = require('express')
const usersRouter = require('./routes/usersRouter')
const doctorsRouter = require('./routes/doctorsRouter')
const ticketsRouter = require('./routes/ticketsRouter')
const cors = require('cors')
const app = express()

const port = process.env.port ?? 3000

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/users', usersRouter)
app.use('/doctors', doctorsRouter)
app.use('/tickets', ticketsRouter)
async function start() {
    try {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`)
        })
    } catch (e) {
        console.log(e)
    }
}
start()
