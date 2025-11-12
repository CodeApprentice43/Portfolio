"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { useEffect, useState } from "react"
import Link from "next/link"

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('/api/blog')
        const data = await response.json()
        setBlogPosts(data)
      } catch (error) {
        console.error('Failed to fetch blog posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogPosts()
  }, [])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getExcerpt = (content) => {
    return content.substring(0, 200) + (content.length > 200 ? '...' : '')
  }
  return (
    <div className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#E6EDF3] mb-4">Blog</h1>
          <p className="text-[#E6EDF3]/60 font-mono">
            Blogs I write on software development, technology and anything else I find interesting and want to share
          </p>
        </div>

        {loading ? (
          <div className="text-center text-[#E6EDF3]/60 font-mono">Loading blog posts...</div>
        ) : blogPosts.length === 0 ? (
          <div className="text-center text-[#E6EDF3]/60 font-mono">No blog posts yet</div>
        ) : (
          <div className="space-y-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#161B22] border border-[#1F6FEB]/20 rounded-lg p-8 hover:border-[#1F6FEB]/50 transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-[#E6EDF3]/50 font-mono">
                  <div className="flex items-center gap-2">
                    <Calendar className="size-4" />
                    <span>{formatDate(post.createdAt)}</span>
                  </div>
                </div>

                <Link href={`/blog/${post.id}`}>
                  <h2 className="text-2xl font-semibold text-[#E6EDF3] hover:text-[#1F6FEB] transition-colors cursor-pointer">
                    {post.title}
                  </h2>
                </Link>

                <p className="text-[#E6EDF3]/70 leading-relaxed">
                  {getExcerpt(post.content)}
                </p>

                <div className="flex items-center justify-between pt-4">
                  <Link href={`/blog/${post.id}`}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[#1F6FEB] hover:bg-[#1F6FEB]/10 gap-2"
                    >
                      Read More
                      <ArrowRight className="size-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}
