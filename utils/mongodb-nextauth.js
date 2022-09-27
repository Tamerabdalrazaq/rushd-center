import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB
const options = {
   useUnifiedTopology: true,
   useNewUrlParser: true,
}

let client
let clientPromise

if (!process.env.MONGODB) {
   throw new Error('Please add your Mongo URI to .env.local')
}

client = new MongoClient(uri, options)
clientPromise = client.connect()

export default clientPromise
