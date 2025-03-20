import { z } from "zod";


export const loginSchema = z.object({
    email: z.string().email("Please enter a email"),
    password: z.string().min(1 , "Please enter a password"),
})