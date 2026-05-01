import { Router } from 'express'
import { body } from 'express-validator'
import {
  getProjects, getProject, createProject, updateProject, deleteProject,
} from '../controllers/projectController.js'
import protect from '../middleware/auth.js'
import validate from '../middleware/validate.js'

const router = Router()

const projectValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('category')
    .optional()
    .isIn(['AI/ML', 'Data Analytics', 'Software Dev', 'Other'])
    .withMessage('Invalid category'),
]

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Get all projects (paginated)
 *     tags: [Projects]
 *     security: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *       - in: query
 *         name: category
 *         schema: { type: string }
 *       - in: query
 *         name: featured
 *         schema: { type: boolean }
 *     responses:
 *       200: { description: List of projects }
 *   post:
 *     summary: Create a new project (admin only)
 *     tags: [Projects]
 *     responses:
 *       201: { description: Project created }
 */
router.route('/')
  .get(getProjects)
  .post(protect, projectValidation, validate, createProject)

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Get single project
 *     tags: [Projects]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Project data }
 *   put:
 *     summary: Update project (admin only)
 *     tags: [Projects]
 *     responses:
 *       200: { description: Updated project }
 *   delete:
 *     summary: Delete project (admin only)
 *     tags: [Projects]
 *     responses:
 *       200: { description: Project deleted }
 */
router.route('/:id')
  .get(getProject)
  .put(protect, projectValidation, validate, updateProject)
  .delete(protect, deleteProject)

export default router
