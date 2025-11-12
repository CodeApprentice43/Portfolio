"use client"

import { motion } from "framer-motion"
import { Book, Star } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews')
        const data = await response.json()
        setReviews(data)
      } catch (error) {
        console.error('Failed to fetch reviews:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
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
            Review on books I have read, not strictly restricted to tech books
          </p>
        </div>

        {loading ? (
          <div className="text-center text-[#E6EDF3]/60 font-mono">Loading reviews...</div>
        ) : reviews.length === 0 ? (
          <div className="text-center text-[#E6EDF3]/60 font-mono">No reviews yet</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#161B22] border border-[#1F6FEB]/20 rounded-lg overflow-hidden hover:border-[#1F6FEB]/50 transition-all"
            >
              {review.bookCover && (
                <div className="aspect-[2/3] bg-[#0D1117] relative overflow-hidden">
                  <Image
                    src={review.bookCover}
                    alt={review.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-[#E6EDF3] mb-1">{review.title}</h3>
                  {review.author && (
                    <p className="text-sm text-[#E6EDF3]/60 font-mono">{review.author}</p>
                  )}
                </div>

                {review.rating && (
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`size-4 ${i < review.rating ? "fill-[#1F6FEB] text-[#1F6FEB]" : "text-[#E6EDF3]/20"}`}
                      />
                    ))}
                  </div>
                )}

                <p className="text-sm text-[#E6EDF3]/70 leading-relaxed line-clamp-4">
                  {review.content}
                </p>

                <div className="pt-2 border-t border-[#1F6FEB]/10">
                  <span className="text-xs text-[#E6EDF3]/50 font-mono">{formatDate(review.createdAt)}</span>
                </div>
              </div>
            </motion.div>
          ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}
