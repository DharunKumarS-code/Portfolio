import Project from '../models/Project.js'

export const getProjects = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, category, featured } = req.query
    const filter = {}
    if (category) filter.category = category
    if (featured !== undefined) filter.featured = featured === 'true'

    const total = await Project.countDocuments(filter)
    const projects = await Project.find(filter)
      .sort({ featured: -1, order: 1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))

    res.json({
      success: true,
      count: projects.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
      data: projects,
    })
  } catch (err) {
    next(err)
  }
}

export const getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id)
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' })
    res.json({ success: true, data: project })
  } catch (err) {
    next(err)
  }
}

export const createProject = async (req, res, next) => {
  try {
    const project = await Project.create(req.body)
    res.status(201).json({ success: true, data: project })
  } catch (err) {
    next(err)
  }
}

export const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' })
    res.json({ success: true, data: project })
  } catch (err) {
    next(err)
  }
}

export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id)
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' })
    res.json({ success: true, message: 'Project deleted' })
  } catch (err) {
    next(err)
  }
}
