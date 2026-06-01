import mongoose from 'mongoose';

const LeadSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      default: '',
    },
    contactName: String,
    contactRole: String,
    contactPhone: String,
    budget: String,
    timeline: String,
    collabTypes: [String],
    niches: [String],
    goals: String,
    score: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['new', 'approved', 'declined'],
      default: 'new',
    },
    adminNote: String,
    referenceId: {
      type: String,
      unique: true,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

LeadSchema.pre('save', async function () {
  // Generate reference ID if not exists
  if (!this.referenceId) {
    const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
    this.referenceId = `LEAD-${randomStr}`;
  }

  // Calculate automated quality score
  let calculatedScore = 0;

  // Budget
  if (this.budget === '1.5L+') calculatedScore += 35;
  else if (this.budget === '50K–1.5L') calculatedScore += 28;
  else if (this.budget === 'Negotiable') calculatedScore += 20;
  else if (this.budget === '10K–50K') calculatedScore += 12;
  else if (this.budget === '<10K') calculatedScore += 5;

  // Timeline
  if (this.timeline === '1–2 months') calculatedScore += 25;
  else if (this.timeline === 'Flexible') calculatedScore += 22;
  else if (this.timeline === '2–4 weeks') calculatedScore += 15;
  else if (this.timeline === '< 1 week') calculatedScore += 8;

  // Goals
  if (this.goals) {
    if (this.goals.length > 100) calculatedScore += 20;
    else if (this.goals.length > 50) calculatedScore += 15;
    else calculatedScore += 10;
  }

  // Niches
  const premiumNiches = ["politics", "social", "science", "business", "journalism", "education", "tech"];
  if (this.niches && Array.isArray(this.niches) && this.niches.length > 0) {
    const hasPremium = this.niches.some(niche => premiumNiches.includes(niche.toLowerCase()));
    if (hasPremium) {
      calculatedScore += 20;
    } else {
      calculatedScore += 10;
    }
  }

  // Cap score to 100 max
  this.score = Math.min(calculatedScore, 100);
});

// Force recompile model during Next.js hot reloads
delete mongoose.models.Lead;
export default mongoose.models.Lead || mongoose.model('Lead', LeadSchema);
