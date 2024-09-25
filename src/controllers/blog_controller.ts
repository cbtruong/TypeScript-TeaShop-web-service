
import { Request, Response } from "express";
import { CREATED, OK } from "../core/success_response";
import BlogService from "../services/blog_service";

class BlogController {
  async createBlog(req: Request, res: Response) {
    const { user_id, title, description, content, blog_status, end_date } = req.body;

    new CREATED({
      message: "Create success_response",
      metadata: await new BlogService().createBlog({
        user_id,
        title,
        description,
        content,
        blog_status,
        end_date
      })
    }).send(res);
  }

  async getBlog(req: Request, res: Response) {
    const blogID = String(req.params.id)
    new OK({
      message: "success",
      metadata: await new BlogService().getBlog(blogID)
    }).send(res);

  }

  async getBlogs(req: Request, res: Response) {
    const page = Number(req.query.page)
    const limit = Number(req.query.limit)

    new OK({
      message: "success",
      metadata: await new BlogService().getBlogs(limit, page)
    }).send(res);

  }
}

export default BlogController;

