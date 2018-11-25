const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const MongoClient = require('mongoose')

MongoClient.connect('mongodb://localhost:27017/cmnt', (err, db) => {
  if (err) {
    return console.log(err)
  }
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/v1/', require('./src/routes'))
app.listen(port)

console.log('Cmnt is running in port: ', port)