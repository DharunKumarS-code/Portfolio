import mongoose from 'mongoose'

const skillGroupSchema = new mongoose.Schema({
  category: { type: String, required: true },
  items: [{ type: String }],
})

const experienceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, default: '💡' },
})

const aboutSchema = new mongoose.Schema(
  {
    bio: { type: String, required: true },
    education: { type: String, required: true },
    location: { type: String, default: '' },
    skills: [skillGroupSchema],
    experience: [experienceSchema],
    resumeUrl: { type: String, default: '' },
  },
  { timestamps: true }
)

export default mongoose.model('About', aboutSchema)
