import { NextResponse } from "next/server"
import { ApiError } from "@/types/api"

export function successResponse<T>(data: T, status: number = 200) {
  return NextResponse.json({ data }, { status })
}

export function errorResponse(error: string, status: number = 500, details?: string) {
  const errorObj: ApiError = {
    error,
    statusCode: status,
  }
  
  if (details) {
    errorObj.details = details
  }
  
  return NextResponse.json(errorObj, { status })
}

export function validationErrorResponse(details: string) {
  return errorResponse("Validation error", 400, details)
}

export function unauthorizedResponse() {
  return errorResponse("Unauthorized", 401)
}

export function forbiddenResponse() {
  return errorResponse("Forbidden", 403)
}

export function notFoundResponse(resource: string = "Resource") {
  return errorResponse(`${resource} not found`, 404)
}
