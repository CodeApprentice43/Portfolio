"use client"

  import { useState } from 'react'
  import { useRouter } from 'next/navigation'
  import { useAuth } from '@/lib/AuthContext'
  import { Button } from '@/components/ui/Button'
  import { motion } from 'framer-motion'

  export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const { signIn } = useAuth()

    const handleSubmit = async (e) => {
      e.preventDefault()
      setError('')
      setLoading(true)

      try {
        const { error } = await signIn(email, password)

        if (error) {
          setError(error.message)
          console.error('Login error:', error)
        } else {
          router.push('/admin')
        }
      } catch (err) {
        setError(err?.message || 'An error occurred during login')
        console.error('Login exception:', err)
      } finally {
        setLoading(false)
      }
    }

    return (
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto"
        >
          <div className="bg-[#161B22] border border-[#1F6FEB]/20 rounded-lg p-8">
            <h1 className="text-3xl font-bold text-[#E6EDF3] mb-6 text-center">
              Admin Login
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#E6EDF3] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 bg-[#0D1117] border border-[#1F6FEB]/30 rounded-md text-[#E6EDF3] focus:outline-none
  focus:border-[#1F6FEB]"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#E6EDF3] mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 bg-[#0D1117] border border-[#1F6FEB]/30 rounded-md text-[#E6EDF3] focus:outline-none
  focus:border-[#1F6FEB]"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-2 rounded-md text-sm">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1F6FEB] hover:bg-[#1F6FEB]/80 text-white"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    )
  }

