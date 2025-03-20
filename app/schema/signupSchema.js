import { z } from "zod";


export const signupSchema = z.object({
    name: z.string().trim().min(3, "UserName must be atleast 3 characters").max(15, "Username must not exceed 15 characters"),
    email: z.string().trim().email("Invalid email formate"),
    password: z.string().trim().min(4 , "Password must be atleast 4 characters"),
})