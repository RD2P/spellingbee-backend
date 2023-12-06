const { MongoClient } = require('mongodb')
const uri = process.env.MONGODB_URI
const client = new MongoClient(uri)

const startDB = async () => {
  return client.connect()
    .then(() => console.log("Connected to the database..."))
}

module.exports = startDB