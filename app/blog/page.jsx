"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/Button"

const blogPosts = []

export default function BlogPage() {
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
