'use client'

import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/Button'
import { useState } from 'react'

export function AuthButton() {
  const { data: session, status } = useSession()
  const [isLoading, setIsLoading] = useState(false)

  const handleSignOut = async () => {
    setIsLoading(true)
    try {
      await signOut({ callbackUrl: '/' })
    } catch (error) {
      console.error('Sign out error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (status === 'loading') {
    return (
      <Button variant="outline" disabled>
        Loading...
      </Button>
    )
  }

  if (session) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600 hidden sm:block">
          Welcome, {session.user.name || session.user.email}
        </span>
        <Button
          variant="outline"
          onClick={handleSignOut}
          loading={isLoading}
          disabled={isLoading}
          className="text-sm"
        >
          {isLoading ? 'Signing out...' : 'Sign Out'}
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <Button asChild variant="outline" className="text-sm">
        <a href="/auth/signin">Sign In</a>
      </Button>
      <Button asChild className="text-sm">
        <a href="/auth/signup">Sign Up</a>
      </Button>
    </div>
  )
}
