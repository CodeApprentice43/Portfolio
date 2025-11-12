"use client"

  import { useEffect } from 'react'
  import { useRouter } from 'next/navigation'
  import { useAuth } from '@/lib/AuthContext'
  import { motion } from 'framer-motion'

  export default function AdminPage() {
    const { user, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
      if (!loading && !user) {
        router.push('/login')
      }
    }, [user, loading, router])

    if (loading) {
      return (
        <div className="container mx-auto px-4 py-20">
          <div className="text-center text-[#E6EDF3]">Loading...</div>
        </div>
      )
    }

    if (!user) {
      return null
    }

    return (
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-[#E6EDF3] mb-8">Admin Dashboard</h1>
          <div className="bg-[#161B22] border border-[#1F6FEB]/20 rounded-lg p-8">
            <p className="text-[#E6EDF3] mb-4">
              Welcome Boss!
            </p>
            <p className="text-[#E6EDF3]/60">
              Admin functionality to manage projects, blogs, and reviews will be added here.
            </p>
          </div>
        </motion.div>
      </div>
    )
  }

  
