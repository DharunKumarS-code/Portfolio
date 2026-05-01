import { Router } from 'express'
import { body } from 'express-validator'
import { getAbout, upsertAbout } from '../controllers/aboutController.js'
import protect from '../middleware/auth.js'
import validate from '../middleware/validate.js'

const router = Router()

/**
 * @swagger
 * /about:
 *   get:
 *     summary: Get about/skills/experience info
 *     tags: [About]
 *     security: []
 *     responses:
 *       200: { description: About data }
 *   put:
 *     summary: Create or update about info (admin only)
 *     tags: [About]
 *     responses:
 *       200: { description: Updated about data }
 */
router.get('/', getAbout)
router.put(
  '/',
  protect,
  [
    body('bio').notEmpty().withMessage('Bio is required'),
    body('education').notEmpty().withMessage('Education is required'),
  ],
  validate,
  upsertAbout
)

export default router
