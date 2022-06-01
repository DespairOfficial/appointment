require('dotenv').config()
const db = require('mongoose')
const url =
    process.env.DB_CONNECT ??
    'mongodb://localhost:27017/' + process.env.DB_NAME ??
    'hospital'
db.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })
module.exports = db
