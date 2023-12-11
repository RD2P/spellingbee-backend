const cors = require('cors')
require('dotenv').config()
const express = require('express')
const startDB = require('./db/db')
const { MongoClient } = require('mongodb')
const uri = process.env.MONGODB_URI
const client = new MongoClient(uri)

const app = express()
app.use(express.json())
app.use(cors())

//Define collection
const collection = client.db('spellingbee').collection('words')



app.get('/api/v1/words', async (req, res) => {
  const allWords = await collection.find({}).toArray()
  let words = []
  for (doc of allWords) words.push(doc.word)
  res.json(words)
})

app.get('/api/v1/word', async (req, res) => {
  const randomWord = req.query.w
  const word = await collection.findOne({ word: randomWord })
  res.json(word)
  res.end()
})

const PORT = process.env.PORT || 4000

//Connect to db and start server
const start = async () => {
  try {
    await startDB()
    app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))
  } catch (error) {
    console.log(error)
  }
}

start()