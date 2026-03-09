const dns = require("node:dns").promises
dns.setServers(["1.1.1.1"])
const mongoose = require("mongoose")
const express = require("express")
const router = express.Router()
const User = require("../models/user")


router.post("/", async (req, res) => {
  try {
    const { name, email } = req.body
    if (!name || !email) return res.status(400).json({ message: "Name and email required" })

    const userExists = await User.findOne({ email })
    if (userExists) return res.status(409).json({ message: "User already exists" })

    const user = new User({ name, email })
    await user.save()

    res.status(201).json({ message: "User created successfully", userId: user._id })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})


router.get("/", async (req, res) => {
  try {
    const { name, email } = req.query
    const filter = {}
    if (name) filter.name = name
    if (email) filter.email = email

    const users = await User.find(filter)
    res.status(200).json(users)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})


router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ message: "User not found" })
    res.status(200).json(user)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})


router.put("/:id", async (req, res) => {
  try {
    const { name, email } = req.body
    if (!name && !email) return res.status(400).json({ message: "At least one field is required" })

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { ...(name && { name }), ...(email && { email }) },
      { new: true, runValidators: true }
    )

    if (!user) return res.status(404).json({ message: "User not found" })
    res.status(200).json({ message: "User updated successfully", user })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})


router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) return res.status(404).json({ message: "User not found" })
    res.status(200).json({ message: "User deleted successfully" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
