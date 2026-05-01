import { Router } from 'express'
import { uploadResume as uploadMiddleware } from '../middleware/upload.js'
import { uploadResume, downloadResume } from '../controllers/resumeController.js'
import protect from '../middleware/auth.js'

const router = Router()

/**
 * @swagger
 * /resume/upload:
 *   post:
 *     summary: Upload resume PDF (admin only)
 *     tags: [Resume]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               resume:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200: { description: Resume uploaded }
 */
router.post('/upload', protect, uploadMiddleware.single('resume'), uploadResume)

/**
 * @swagger
 * /resume/download:
 *   get:
 *     summary: Download the latest resume
 *     tags: [Resume]
 *     security: []
 *     responses:
 *       200: { description: PDF file download }
 */
router.get('/download', downloadResume)

export default router
