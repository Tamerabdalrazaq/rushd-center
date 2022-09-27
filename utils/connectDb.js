const mongoose = require('mongoose')

const connection = {}

const mongo_url = process.env.MONGODB

async function connectDb() {
   if (connection.isConnected) return
   const db = await mongoose.connect(process.env.MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true 
   })

   connection.isConnected = db.connections[0].readyState
   console.log(connection.isConnected)
}

export default connectDb