import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // 创建示例用户
  const user1 = await prisma.user.upsert({
    where: { email: 'john@example.com' },
    update: {},
    create: {
      email: 'john@example.com',
      name: 'John Doe',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
    },
  })

  const user2 = await prisma.user.upsert({
    where: { email: 'jane@example.com' },
    update: {},
    create: {
      email: 'jane@example.com',
      name: 'Jane Smith',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
    },
  })

  // 创建示例文章
  const post1 = await prisma.post.upsert({
    where: { id: 'post-1' },
    update: {},
    create: {
      id: 'post-1',
      title: 'Welcome to Node Learn',
      content: 'This is the first post in our Node.js learning project. We will explore various concepts and build amazing applications together.',
      published: true,
      authorId: user1.id,
    },
  })

  const post2 = await prisma.post.upsert({
    where: { id: 'post-2' },
    update: {},
    create: {
      id: 'post-2',
      title: 'Getting Started with Next.js',
      content: 'Next.js is a powerful React framework that provides many features out of the box. Let\'s learn how to use it effectively.',
      published: true,
      authorId: user2.id,
    },
  })

  const post3 = await prisma.post.upsert({
    where: { id: 'post-3' },
    update: {},
    create: {
      id: 'post-3',
      title: 'Database Integration with Prisma',
      content: 'Prisma makes database operations simple and type-safe. Learn how to integrate it with your Next.js application.',
      published: false,
      authorId: user1.id,
    },
  })

  console.log('Seed data created successfully!')
  console.log('Users:', { user1, user2 })
  console.log('Posts:', { post1, post2, post3 })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
