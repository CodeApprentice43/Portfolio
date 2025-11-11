"use client"

import { motion } from "framer-motion"
import { Book, Star } from "lucide-react"
import Image from "next/image"

const reviews = [
  {
    id: 1,
    title: "Clean Code",
    author: "Robert C. Martin",
    rating: 5,
    content: "An essential read for any software developer. Martin's principles of writing maintainable, readable code have fundamentally changed how I approach programming.",
    date: "Jan 2025",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
  },
  {
    id: 2,
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    rating: 5,
    content: "A comprehensive deep-dive into distributed systems and database design.",
    date: "Dec 2024",
    cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop",
  },
]

export default function ReviewsPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Book className="size-8 text-[#1F6FEB]" />
            <h1 className="text-4xl font-bold text-[#E6EDF3]">Book Reviews</h1>
          </div>
          <p className="text-[#E6EDF3]/60 font-mono">
            Technical books that shaped my journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#161B22] border border-[#1F6FEB]/20 rounded-lg overflow-hidden hover:border-[#1F6FEB]/50 transition-all"
            >
              <div className="aspect-[2/3] bg-[#0D1117] relative overflow-hidden">
                <Image
                  src={review.cover}
                  alt={review.title}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-[#E6EDF3] mb-1">{review.title}</h3>
                  <p className="text-sm text-[#E6EDF3]/60 font-mono">{review.author}</p>
                </div>

                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`size-4 ${i < review.rating ? "fill-[#1F6FEB] text-[#1F6FEB]" : "text-[#E6EDF3]/20"}`}
                    />
                  ))}
                </div>

                <p className="text-sm text-[#E6EDF3]/70 leading-relaxed">
                  {review.content}
                </p>

                <div className="pt-2 border-t border-[#1F6FEB]/10">
                  <span className="text-xs text-[#E6EDF3]/50 font-mono">{review.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
