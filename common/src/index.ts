import z from 'zod'

export const signupInput = z.object({
    email: z.string().email(),
    name: z.string().optional(),
    password: z.string().min(6)
})

export type SignupType = z.infer<typeof signupInput>


export const signinInput = z.object({
    email: z.string().email(),
    password: z.string()
})

export type SigninType = z.infer<typeof signinInput>

export const createBlogInput = z.object({
    title: z.string().optional(),
    password: z.string().optional()
})

export type CreateBlogType = z.infer<typeof createBlogInput>


export const updateBlogInput = z.object({
    title: z.string().optional(),
    password: z.string().optional()
})

export type updateBlogType = z.infer<typeof updateBlogInput>