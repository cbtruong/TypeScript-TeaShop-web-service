
import BlogModel, { IBlog } from "../models/blog_model";

class BlogService {
  async createBlog(newBlog: Partial<IBlog>) {
    return await BlogModel.create({
      ...newBlog
    });
  }


  async getBlog(blogID: string) {
    const blog = await BlogModel.findOne({ _id: blogID }).lean();
    return blog || undefined; // Explicitly return undefined if blog is null
  }


  async getBlogs(limit: number, page: number) {
    const skip = (page - 1) * limit
    const blogs = await BlogModel.find().skip(skip).limit(limit)
    const total = await BlogModel.countDocuments()
    return {
      data: blogs,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    }
  }
}

export default BlogService;
