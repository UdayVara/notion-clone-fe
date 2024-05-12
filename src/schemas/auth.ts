import { z } from "zod";


export const signUpSchema = z.object({
    name: z.string().min(1,"Name is Required"),
    email:z.string().email("Email is not Valid"),
    password:z.string().min(8,"Length of Password Must be between 8 and 16").max(16,"Length of Password must be between 8 and 16")
})

export type signUpSchemaType = z.infer<typeof signUpSchema>


export const signInSchema = z.object({
    email:z.string().email("Email is not Valid"),
    password:z.string().min(8,"Length of Password Must be between 8 and 16").max(16,"Length of Password must be between 8 and 16")
})

export type signInSchemaType = z.infer<typeof signInSchema>