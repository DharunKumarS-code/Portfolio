import { Router } from 'express'
import { body } from 'express-validator'
import {
  getCertificates, createCertificate, updateCertificate, deleteCertificate,
} from '../controllers/certificateController.js'
import protect from '../middleware/auth.js'
import validate from '../middleware/validate.js'

const router = Router()

const certValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('issuer').notEmpty().withMessage('Issuer is required'),
  body('date').notEmpty().withMessage('Date is required'),
  body('driveLink').notEmpty().withMessage('Drive link is required'),
]

/**
 * @swagger
 * /certificates:
 *   get:
 *     summary: Get all certificates
 *     tags: [Certificates]
 *     security: []
 *     parameters:
 *       - in: query
 *         name: category
 *         schema: { type: string }
 *     responses:
 *       200: { description: List of certificates }
 *   post:
 *     summary: Add a certificate (admin only)
 *     tags: [Certificates]
 *     responses:
 *       201: { description: Certificate created }
 */
router.route('/')
  .get(getCertificates)
  .post(protect, certValidation, validate, createCertificate)

/**
 * @swagger
 * /certificates/{id}:
 *   put:
 *     summary: Update certificate (admin only)
 *     tags: [Certificates]
 *     responses:
 *       200: { description: Updated }
 *   delete:
 *     summary: Delete certificate (admin only)
 *     tags: [Certificates]
 *     responses:
 *       200: { description: Deleted }
 */
router.route('/:id')
  .put(protect, certValidation, validate, updateCertificate)
  .delete(protect, deleteCertificate)

export default router
