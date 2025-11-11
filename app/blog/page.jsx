"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/Button"

const blogPosts = [
  {
    id: 1,
    title: "Building Scalable APIs with Next.js and Prisma",
    excerpt: "Learn how to build type-safe, scalable REST APIs using Next.js API routes and Prisma ORM.",
    date: "Feb 5, 2025",
    readTime: "8 min read",
    tags: ["Next.js", "Prisma", "API"],
  },
  {
    id: 2,
    title: "Authentication Patterns in Modern Web Apps",
    excerpt: "A comprehensive guide to implementing secure authentication with Supabase Auth.",
    date: "Jan 28, 2025",
    readTime: "12 min read",
    tags: ["Auth", "Security", "Supabase"],
  },
]

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#E6EDF3] mb-4">Technical Blog</h1>
          <p className="text-[#E6EDF3]/60 font-mono">
            Thoughts on software development and technology
          </p>
        </div>

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
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="size-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h2 className="text-2xl font-semibold text-[#E6EDF3] hover:text-[#1F6FEB] transition-colors cursor-pointer">
                  {post.title}
                </h2>

                <p className="text-[#E6EDF3]/70 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono px-2 py-1 bg-[#1F6FEB]/10 text-[#1F6FEB] rounded border border-[#1F6FEB]/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[#1F6FEB] hover:bg-[#1F6FEB]/10 gap-2"
                  >
                    Read More
                    <ArrowRight className="size-4" />
                  </Button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
