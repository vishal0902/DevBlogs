import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign, verify } from "hono/jwt";

// Create the main Hono app
const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  },
  Variables: {
    userId: string
  }
}>();

blogRouter.use('/*', async(c,next)=>{
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


blogRouter.post('/', async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
  
    
    const body = await c.req.json()

    console.log(c.get("userId"))
      
    const blog = await prisma.blog.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: c.get("userId")
        },
        select:{
            id: true
        }
    })

    return c.json({
        message: "success",
        blog: blog
    })

})

blogRouter.get('/bulk', async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
  
    const user = await prisma.user.findUnique({
        where:{
            id: c.get("userId")
        },
        select : {
            name: true,
            blogs: true
        }
    })

      
    const blogs = await prisma.blog.findMany({
        select: {
            id: true,
            title: true,
            content: true,
            createdAt: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    })

    return c.json({
        message: "success",
        user: user,
        blogs: blogs
    })

})

blogRouter.get('/:id', async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
  
    
    // const body = await c.req.json()

    const blogId = c.req.param("id")
      
    const blog = await prisma.blog.findUnique({
        where:{
            id: Number(blogId)
        },
        select: {
            id: true,
            title: true,
            content: true,
            author: {
                select:{
                    name: true
                }
            }
        }
    })

    return c.json({
        message: "success",
        blog: blog
    })

})


blogRouter.put('/', async(c)=>{
    
    
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
  
    

    const body = await c.req.json()
      
    const blog = await prisma.blog.update({
        where:{
            id: Number(body.id),
            authorId: c.get("userId")
        },
        data: {
            title: body.title,
            content: body.content,
        }
    })

    return c.json({
        message: "success",
        blog: blog
    })

})


export default blogRouter