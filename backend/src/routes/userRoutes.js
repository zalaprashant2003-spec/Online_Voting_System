const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/User')

const router = express.Router()

router.post('/signup', async (req, res) => {
  try {
    const { email, password, role } = req.body
    if (!email || !password)
      return res.status(400).json({ message: 'All fields are required' })

    const exists = await User.findOne({ email })
    if (exists) return res.status(400).json({ message: 'Email already registered' })

    const hash = await bcrypt.hash(password, 10)
    const user = new User({ email, password: hash, role: role || 'voter' })
    await user.save()

    res.json({ message: 'Signup successful',user: { _id: user._id, email: user.email, role: user.role }  })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password, role } = req.body
    if (!email || !password)
      return res.status(400).json({ message: 'All fields are required' })

    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'User not found' })

    if (role && user.role !== role)
      return res.status(400).json({ message: 'Wrong role selected' })

    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(400).json({ message: 'Incorrect password' })

    res.json({ 
  message: 'Login successful', 
  user: { _id: user._id, email: user.email, role: user.role } 
})
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

router.get('/voters', async (req, res) => {
  const voters = await User.find({ role: 'voter' }).select('email');
  res.json(voters);
})

module.exports = router
