
const dns = require("node:dns").promises
dns.setServers(["1.1.1.1"])
require("dotenv").config()
const express = require("express")
const cors = require("cors")
const connectDB = require("./db")
const userRoutes = require("./routes/users") 

const app = express()

const corsOrigins = (process.env.CORS_ORIGINS || "http://localhost:5173,https://patriciagea.github.io")
	.split(",")
	.map((origin) => origin.trim())
	.filter(Boolean)

app.use(cors({ origin: corsOrigins }))
app.use(express.json())

const PORT = process.env.PORT || 3000


connectDB()


app.get("/health", (_req, res) => {
	res.status(200).json({ status: "ok" })
})


app.use("/users", userRoutes)
app.use("/routes/users", userRoutes)


app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
