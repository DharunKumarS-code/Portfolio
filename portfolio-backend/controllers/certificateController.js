import Certificate from '../models/Certificate.js'

export const getCertificates = async (req, res, next) => {
  try {
    const { category } = req.query
    const filter = category ? { category } : {}
    const certificates = await Certificate.find(filter).sort({ order: 1, createdAt: -1 })
    res.json({ success: true, count: certificates.length, data: certificates })
  } catch (err) {
    next(err)
  }
}

export const createCertificate = async (req, res, next) => {
  try {
    const cert = await Certificate.create(req.body)
    res.status(201).json({ success: true, data: cert })
  } catch (err) {
    next(err)
  }
}

export const updateCertificate = async (req, res, next) => {
  try {
    const cert = await Certificate.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!cert) return res.status(404).json({ success: false, message: 'Certificate not found' })
    res.json({ success: true, data: cert })
  } catch (err) {
    next(err)
  }
}

export const deleteCertificate = async (req, res, next) => {
  try {
    await Certificate.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'Certificate deleted' })
  } catch (err) {
    next(err)
  }
}
