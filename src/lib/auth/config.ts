import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "@/lib/db/prisma"
import { z } from "zod"

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

const config: NextAuthConfig = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const { email, password } = loginSchema.parse(credentials)
          
          // 简化验证：在演示模式下，接受任何有效的邮箱和密码
          // 在实际应用中，这里应该：
          // 1. 查询数据库验证用户
          // 2. 验证密码哈希
          
          console.log('Login attempt:', { email })
          
          // 模拟用户验证
          if (email && password && password.length >= 6) {
            return {
              id: 'demo-user-id',
              email: email,
              name: email.split('@')[0], // 使用邮箱前缀作为用户名
              image: null,
            }
          }
          
          return null
        } catch {
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
}

export default config
