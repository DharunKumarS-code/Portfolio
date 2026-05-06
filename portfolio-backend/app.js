import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import mongoSanitize from 'express-mongo-sanitize'
import rateLimit from 'express-rate-limit'
import swaggerUi from 'swagger-ui-express'
import path from 'path'
import { fileURLToPath } from 'url'

import swaggerSpec from './config/swagger.js'
import authRoutes from './routes/authRoutes.js'
import projectRoutes from './routes/projectRoutes.js'
import contactRoutes from './routes/contactRoutes.js'
import resumeRoutes from './routes/resumeRoutes.js'
import aboutRoutes from './routes/aboutRoutes.js'
import certificateRoutes from './routes/certificateRoutes.js'
import errorHandler from './middleware/errorHandler.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()

// Security
app.use(helmet())
app.use(mongoSanitize())

// CORS
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173').split(',')
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, Postman)
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true)
    callback(new Error('Not allowed by CORS'))
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))

// CSRF protection for public POST endpoints (contact form)
// JWT-protected routes are inherently CSRF-safe via Authorization header.
// For the public contact route, we verify the request Origin matches CLIENT_URL.
const verifyCsrfOrigin = (req, res, next) => {
  const origin = req.headers.origin || req.headers.referer || ''
  const allowed = allowedOrigins.some((o) => origin.startsWith(o))
  if (!allowed) {
    return res.status(403).json({ success: false, message: 'Forbidden: invalid request origin' })
  }
  next()
}
app.use('/api/contact', (req, res, next) => {
  if (req.method === 'POST') return verifyCsrfOrigin(req, res, next)
  next()
})

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,
  message: { success: false, message: 'Too many requests, please try again later.' },
})
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: { success: false, message: 'Too many contact submissions. Try again in an hour.' },
})

app.use('/api', limiter)
app.use('/api/contact', contactLimiter)

// Body parsing
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true }))

// Logging
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

// Static uploads — serve only from the resolved absolute uploads directory
const uploadsPath = path.resolve(__dirname, 'uploads')
app.use('/uploads', express.static(uploadsPath))

// Swagger docs
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/resume', resumeRoutes)
app.use('/api/about', aboutRoutes)
app.use('/api/certificates', certificateRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Portfolio API is running 🚀', env: process.env.NODE_ENV })
})

// 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` })
})

// Global error handler
app.use(errorHandler)

export default app
