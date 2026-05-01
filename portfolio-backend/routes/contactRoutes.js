import { Router } from 'express'
import { body } from 'express-validator'
import {
  submitContact, getContacts, markRead, deleteContact,
} from '../controllers/contactController.js'
import protect from '../middleware/auth.js'
import validate from '../middleware/validate.js'

const router = Router()

const contactValidation = [
  body('name').notEmpty().trim().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('message').isLength({ min: 10 }).withMessage('Message must be at least 10 characters'),
]

/**
 * @swagger
 * /contact:
 *   post:
 *     summary: Submit a contact message
 *     tags: [Contact]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, message]
 *             properties:
 *               name: { type: string }
 *               email: { type: string }
 *               message: { type: string }
 *     responses:
 *       201: { description: Message submitted }
 *   get:
 *     summary: Get all contact messages (admin only)
 *     tags: [Contact]
 *     responses:
 *       200: { description: List of messages }
 */
router.route('/')
  .post(contactValidation, validate, submitContact)
  .get(protect, getContacts)

/**
 * @swagger
 * /contact/{id}/read:
 *   patch:
 *     summary: Mark message as read (admin only)
 *     tags: [Contact]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Marked as read }
 */
router.patch('/:id/read', protect, markRead)
router.delete('/:id', protect, deleteContact)

export default router
