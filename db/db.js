const { MongoClient } = require('mongodb')
const uri = "mongodb://127.0.0.1:27017"
const client = new MongoClient(uri)

const startDB = async () => {
  return client.connect()
    .then(() => console.log("Connected to the database..."))
}

module.exports = startDB