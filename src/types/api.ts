export interface ApiResponse<T = any> {
  data?: T
  error?: string
  message?: string
}

export interface PaginationResponse {
  page: number
  limit: number
  total: number
  pages: number
}

export interface ApiError {
  error: string
  details?: string
  statusCode: number
}

export interface User {
  id: string
  email: string
  name?: string | null
  image?: string | null
  createdAt: Date
  updatedAt: Date
}

export interface Post {
  id: string
  title: string
  content?: string | null
  published: boolean
  authorId: string
  author: {
    id: string
    name?: string | null
    email: string
  }
  createdAt: Date
  updatedAt: Date
}

export interface PostQuery {
  page?: number
  limit?: number
  search?: string
}
