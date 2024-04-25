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

blogRouter.get('/getMyBlogs', async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
  
    const data= await prisma.user.findUnique({
        where:{
            id: c.get("userId")
        },
        select : {
            blogs: true
        }
    })
    return c.json({
        message: "success",
        blogs: data?.blogs
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
            },
            likes: {
                select: {
                    liker:{
                        select: {
                            name: true
                        }
                    }
                }
            }
        }
    })


    

    return c.json({
        message: "success",
        blog: blog,
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

blogRouter.post("/like", async(c)=> {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());

    const body = await c.req.json()
    console.log(body)
    
    const likedBy = await prisma.like.create({
        data: {
            blogId: parseInt(body.blogId),
            likerId: c.get("userId")
        },
        select:{
            liker: {
                select: {
                    name: true
                }
            }
        }
    })

    return c.json({
        message: "success",
        likedBy: likedBy
    })
})





blogRouter.get("/liked/:id", async(c)=> {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());

      const blogId = c.req.param("id")

    
    const likeCount = await prisma.like.count({
        where: {
            blogId: parseInt(blogId)
        }
    })

    const isLiked = await prisma.like.findFirst({
        where:{
            likerId: c.get("userId"),
            blogId: parseInt(blogId)
        },
        select: {
            id: true
        }
    })

    

    return c.json({
        message: "success",
        likeCount: likeCount,
        isLiked: isLiked?.id ? isLiked.id : ""
    })
})






export default blogRouter