import { Hono } from "hono";
import userRouter from "./routes/user";
import blogRouter from "./routes/blog";
import { cors } from "hono/cors";
import { commentRouter } from "./routes/comment";

// Create the main Hono app
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.use(
  '*',
  cors({
    origin: (origin) => {
      if (!origin) return null;

      // allow localhost
      if (origin === 'http://localhost:5173') return origin;

      // allow ALL vercel previews + prod
      if (origin.endsWith('.vercel.app')) return origin;

      return null;
    },
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
  })
);

// routes
app.get('/health', (c) => c.json({ status: 'ok' }));





app.get('/health', (c) => c.json({ status: 'ok' }))


app.route("/api/v1/user", userRouter)
app.route("/api/v1/blog", blogRouter)
app.route("/api/v1/comment", commentRouter)




export default app;
