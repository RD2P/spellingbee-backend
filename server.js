require('dotenv').config()
const express = require('express')
const startDB = require('./db/db')
const { MongoClient } = require('mongodb')
const uri = process.env.MONGODB_URI
const client = new MongoClient(uri)

const app = express()
app.use(express.json())

//Define collection
const collection = client.db('spellingbee').collection('words')

//provide list of words to client
app.get('/api/v1/words', async (req, res) => {
  const allWords = await collection.find({}).toArray()
  let words = []
  for (doc of allWords) words.push(doc.word)
  res.json(words)
})

//grab random word for client
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