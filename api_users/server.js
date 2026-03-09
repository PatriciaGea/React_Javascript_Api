
const dns = require("node:dns").promises
dns.setServers(["1.1.1.1"])
require("dotenv").config()
const express = require("express")
const connectDB = require("./db")
const userRoutes = require("./routes/users") 
const mongoose = require("mongoose")

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 3000


connectDB()


app.use("/users", userRoutes)


app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
