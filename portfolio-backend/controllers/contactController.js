import Contact from '../models/Contact.js'
import nodemailer from 'nodemailer'

// Escape HTML to prevent XSS in email body
const escapeHtml = (str) =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')

const sendEmailNotification = async ({ name, email, message }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  })

  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    subject: `📬 New message from ${escapeHtml(name)}`,
    html: `
      <h2>New Portfolio Contact</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message)}</p>
    `,
  })
}

export const submitContact = async (req, res, next) => {
  try {
    const { name, email, message } = req.body
    const contact = await Contact.create({
      name,
      email,
      message,
      ipAddress: req.ip,
    })

    // Send email (non-blocking — don't fail request if email fails)
    sendEmailNotification({ name, email, message }).catch((err) =>
      console.error('Email send failed:', err.message)
    )

    res.status(201).json({
      success: true,
      message: 'Message received! I will get back to you soon.',
      data: { id: contact._id },
    })
  } catch (err) {
    next(err)
  }
}

export const getContacts = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, read } = req.query
    const filter = {}
    if (read !== undefined) filter.read = read === 'true'

    const total = await Contact.countDocuments(filter)
    const contacts = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))

    res.json({ success: true, total, data: contacts })
  } catch (err) {
    next(err)
  }
}

export const markRead = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    )
    if (!contact) return res.status(404).json({ success: false, message: 'Message not found' })
    res.json({ success: true, data: contact })
  } catch (err) {
    next(err)
  }
}

export const deleteContact = async (req, res, next) => {
  try {
    await Contact.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'Message deleted' })
  } catch (err) {
    next(err)
  }
}
