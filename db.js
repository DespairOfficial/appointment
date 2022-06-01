require('dotenv').config()
const db = require('mongoose')
const connect = process.env.DB_CONNECT ?? 'mongodb://localhost:27017/'
const dbName = process.env.DB_NAME ?? 'hospital'
const url = connect + dbName

console.log(url)
db.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })
module.exports = db
