import { z } from "zod"

export const postCreateSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
  content: z.string().optional(),
  published: z.boolean().default(false),
})

export const postUpdateSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title must be less than 100 characters").optional(),
  content: z.string().optional(),
  published: z.boolean().optional(),
})

export const postQuerySchema = z.object({
  page: z.string().transform(Number).pipe(z.number().min(1)).default("1"),
  limit: z.string().transform(Number).pipe(z.number().min(1).max(100)).default("10"),
  search: z.string().optional(),
})

export type PostCreateInput = z.infer<typeof postCreateSchema>
export type PostUpdateInput = z.infer<typeof postUpdateSchema>
export type PostQueryInput = z.infer<typeof postQuerySchema>
