require('dotenv').config()
const db = require('mongoose')
const connect = 'mongodb://mongodb:27017/' //  process.env.DB_CONNECT ??
const dbName = 'hospital' //   process.env.DB_NAME ??
const url = connect + dbName

console.log(url)
db.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })
module.exports = db
