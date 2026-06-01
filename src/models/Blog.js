import mongoose from 'mongoose';
import slugify from 'slugify';

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    excerpt: {
      type: String,
      maxLength: 200,
    },
    content: {
      type: String,
    },
    coverImage: {
      url: String,
      publicId: String,
    },
    media: [
      {
        url: String,
        publicId: String,
        resourceType: String,
        format: String,
        label: String,
      },
    ],
    author: {
      name: String,
      avatarUrl: String,
    },
    tags: [String],
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
    publishedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

BlogSchema.pre('save', async function () {
  // Compute slug if title changed or slug is missing
  if (this.isModified('title') || !this.slug) {
    let baseSlug = slugify(this.title, { lower: true, strict: true });
    let currentSlug = baseSlug;
    let counter = 2;
    
    const Blog = this.constructor;
    
    while (await Blog.findOne({ slug: currentSlug, _id: { $ne: this._id } })) {
      currentSlug = `${baseSlug}-${counter}`;
      counter++;
    }
    
    this.slug = currentSlug;
  }
  
  // Set publishedAt
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
});

// Force recompile model during Next.js hot reloads
delete mongoose.models.Blog;
export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
