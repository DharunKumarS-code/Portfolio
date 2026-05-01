import About from '../models/About.js'

export const getAbout = async (req, res, next) => {
  try {
    const about = await About.findOne({})
    if (!about) return res.status(404).json({ success: false, message: 'About info not set yet' })
    res.json({ success: true, data: about })
  } catch (err) {
    next(err)
  }
}

export const upsertAbout = async (req, res, next) => {
  try {
    const about = await About.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
      runValidators: true,
    })
    res.json({ success: true, data: about })
  } catch (err) {
    next(err)
  }
}
