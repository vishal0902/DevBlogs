import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";

import { sign } from "hono/jwt";
import {signinInput, signupInput} from "@vishal0902/common-app"

// Create the main Hono app
const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();


userRouter.post("/signup", async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    
    

    const body = await c.req.json();
    const {success} = signupInput.safeParse(body)
    if(!success){
        c.status(400)
        return c.json({
            message:"failure",
            error:"Incorrect Input."
        })
    }


    try {
      const user = await prisma.user.create({
        data: {
          email: body.email,
          name: body.name,
          password: body.password,
        }
      });
      const jwtToken = await sign({ id: user.id }, c.env.JWT_SECRET);
      return c.json({ jwtToken: jwtToken });
    } catch (e) {
      c.status(403);
      return c.json({ error: "error while signing up"});
    }
  });
  
  
  userRouter.post("/signin", async(c)=>{
      const  prisma = new PrismaClient({
          datasourceUrl: c.env.DATABASE_URL
      }).$extends(withAccelerate());
  
      const body = await c.req.json()
  
      const user = await prisma.user.findUnique({
          where:{ 
              email: body.email,
              password: body.password
          }		
      })
      if(!user) {
          c.status(403);
          return c.json({ error: "Invalid Credentials."});
      }
      const jwtToken = await sign({id: user.id}, c.env.JWT_SECRET)
      return c.json({
          jwtToken: jwtToken
      })
  
  })

  userRouter.get("/bulk", async (c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());


    const allusers = await prisma.user.findMany({})

    return c.json({
        users: allusers
    })
  })

export default userRouter