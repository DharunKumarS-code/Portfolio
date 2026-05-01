import multer from 'multer'
import path from 'path'
import fs from 'fs'

const resumeDir = path.resolve('uploads/resumes')
if (!fs.existsSync(resumeDir)) fs.mkdirSync(resumeDir, { recursive: true })

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, resumeDir),
  filename: (req, file, cb) => {
    // Never use originalname — generate a safe, predictable filename
    cb(null, `resume_${Date.now()}.pdf`)
  },
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true)
  } else {
    cb(new Error('Only PDF files are allowed'), false)
  }
}

export const uploadResume = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
})
