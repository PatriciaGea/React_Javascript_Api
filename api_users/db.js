const dns = require("node:dns").promises
dns.setServers(["1.1.1.1"])
const mongoose = require("mongoose")

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log("MongoDB connected")
  } catch (err) {
    console.error("MongoDB connection error:", err)
    process.exit(1)
  }
}

module.exports = connectDB
