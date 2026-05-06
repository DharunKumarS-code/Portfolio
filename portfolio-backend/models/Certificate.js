import mongoose from 'mongoose'

const certificateSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    issuer: { type: String, required: true },
    date: { type: String, required: true },
    category: {
      type: String,
      enum: ['AI/ML', 'Data Analytics', 'Cloud', 'Development', 'Other'],
      default: 'Other',
    },
    driveLink: { type: String, required: true },
    color: { type: String, default: 'from-indigo-500 to-purple-600' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export default mongoose.model('Certificate', certificateSchema)
