import path from 'path'
import fs from 'fs'
import About from '../models/About.js'

export const uploadResume = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' })

    const resumeUrl = `/uploads/resumes/${req.file.filename}`

    // Update resumeUrl in About document (upsert)
    await About.findOneAndUpdate({}, { resumeUrl }, { upsert: true, new: true })

    res.json({ success: true, message: 'Resume uploaded', resumeUrl })
  } catch (err) {
    next(err)
  }
}

export const downloadResume = async (req, res, next) => {
  try {
    const about = await About.findOne({})
    if (!about?.resumeUrl) {
      return res.status(404).json({ success: false, message: 'No resume uploaded yet' })
    }

    // Sanitize: resolve path and ensure it stays within uploads/resumes
    const uploadsBase = path.resolve(process.cwd(), 'uploads', 'resumes')
    const resolvedPath = path.resolve(process.cwd(), about.resumeUrl.replace(/^\//, ''))

    if (!resolvedPath.startsWith(uploadsBase)) {
      return res.status(403).json({ success: false, message: 'Access denied' })
    }

    if (!fs.existsSync(resolvedPath)) {
      return res.status(404).json({ success: false, message: 'Resume file not found on server' })
    }

    res.download(resolvedPath, 'Dharun_Kumar_Resume.pdf')
  } catch (err) {
    next(err)
  }
}
