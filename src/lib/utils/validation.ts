import { z } from "zod"
import { NextResponse } from "next/server"

export function validateRequest<T>(schema: z.ZodSchema<T>, data: unknown) {
  try {
    return { success: true, data: schema.parse(data) }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const details = error.errors.map(err => `${err.path.join('.')}: ${err.message}`).join(', ')
      return { 
        success: false, 
        error: NextResponse.json(
          { error: "Validation error", details }, 
          { status: 400 }
        )
      }
    }
    return { 
      success: false, 
      error: NextResponse.json(
        { error: "Invalid request data" }, 
        { status: 400 }
      )
    }
  }
}

export function generateId() {
  return Math.random().toString(36).substr(2, 9)
}

export function formatDate(date: Date) {
  return date.toISOString()
}

export function sanitizeInput(input: string) {
  return input.trim().replace(/[<>]/g, '')
}
