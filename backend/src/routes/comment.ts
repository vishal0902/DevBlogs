import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign, verify } from "hono/jwt";

// Create the main Hono app
export const commentRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  },
  Variables: {
    userId: string
  }
}>();

commentRouter.use('/*', async(c,next)=>{
    const token = c.req.header("authorization") || "";
    console.log(token)
    const user = await verify(token, c.env.JWT_SECRET)
    console.log(user, c.env.JWT_SECRET)
    if(user){
        c.set("userId", user.id)
        await next()
    } else{
        c.status(403)
        return c.json({
            message: "Not authorized"
        })
    }
})

commentRouter.post("/", async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());

    const body = await c.req.json()
    console.log(body)
    
    const comment = await prisma.comment.create({
        data: {
            content: body.content,
            blogId: parseInt(body.blogId),
            commentorId: c.get("userId"),
        },
        select:{
            id: true,
            content: true
        }
    })

    return c.json({
        message: "success",
        comment: comment
    })
})

commentRouter.get("/:blogId", async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());

    const blogId = c.req.param('blogId')
    

    const comments = await prisma.comment.findMany({
        where: {
            blogId: parseInt(blogId)
        },
        select:{
            id: true,
            content: true,
            commentor: {
                select: {
                     name: true
                }
            }
        }
        
    })

    return c.json({
        message: "success",
        comments: comments
    })
})

commentRouter.delete("/:id", async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());

    const blogId = c.req.param('id')

    const comment = await prisma.comment.delete({
        where: {
            id: parseInt(blogId)
        }
    })

    return c.json({
        message: "success",
        comment: comment
    })

})