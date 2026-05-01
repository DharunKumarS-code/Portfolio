import jwt from 'jsonwebtoken'
import Admin from '../models/Admin.js'

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })

export const register = async (req, res, next) => {
  try {
    const exists = await Admin.findOne({ email: req.body.email })
    if (exists) return res.status(400).json({ success: false, message: 'Admin already exists' })

    const admin = await Admin.create(req.body)
    const token = signToken(admin._id)
    res.status(201).json({ success: true, token, data: { id: admin._id, name: admin.name, email: admin.email } })
  } catch (err) {
    next(err)
  }
}

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const admin = await Admin.findOne({ email }).select('+password')
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' })
    }
    const token = signToken(admin._id)
    res.json({ success: true, token, data: { id: admin._id, name: admin.name, email: admin.email } })
  } catch (err) {
    next(err)
  }
}

export const getMe = async (req, res) => {
  res.json({ success: true, data: req.admin })
}
