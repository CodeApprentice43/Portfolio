"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Book, Star, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/Button"
import Image from "next/image"

export default function ReviewPage() {
  const params = useParams()
  const router = useRouter()
  const [review, setReview] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await fetch(`/api/reviews/${params.id}`)
        if (!response.ok) {
          throw new Error('Review not found')
        }
        const data = await response.json()
        setReview(data)
      } catch (error) {
        console.error('Failed to fetch review:', error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchReview()
    }
  }, [params.id])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center text-[#E6EDF3]/60 font-mono">
          Loading review...
        </div>
      </div>
    )
  }

  if (error || !review) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#E6EDF3]/60 font-mono mb-6">Review not found</p>
          <Button onClick={() => router.push('/reviews')} variant="outline">
            <ArrowLeft className="size-4 mr-2" />
            Back to Reviews
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <Button
          onClick={() => router.push('/reviews')}
          variant="ghost"
          size="sm"
          className="mb-8 text-[#1F6FEB] hover:bg-[#1F6FEB]/10 gap-2"
        >
          <ArrowLeft className="size-4" />
          Back to Reviews
        </Button>

        <div className="bg-[#161B22] border border-[#1F6FEB]/20 rounded-lg overflow-hidden">
          {review.bookCover && (
            <div className="w-full max-w-sm mx-auto mt-8">
              <div className="aspect-[2/3] relative">
                <Image
                  src={review.bookCover}
                  alt={review.title}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          )}

          <div className="p-8 md:p-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Book className="size-8 text-[#1F6FEB]" />
              <h1 className="text-3xl md:text-4xl font-bold text-[#E6EDF3] text-center">
                {review.title}
              </h1>
            </div>

            {review.author && (
              <p className="text-center text-[#E6EDF3]/60 font-mono text-lg mb-4">
                by {review.author}
              </p>
            )}

            {review.rating && (
              <div className="flex items-center justify-center gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`size-6 ${i < review.rating ? "fill-[#1F6FEB] text-[#1F6FEB]" : "text-[#E6EDF3]/20"}`}
                  />
                ))}
              </div>
            )}

            <div className="flex items-center justify-center gap-2 text-[#E6EDF3]/50 font-mono text-sm mb-8">
              <span>{formatDate(review.createdAt)}</span>
            </div>

            <div className="prose prose-invert prose-lg max-w-none">
              <div className="text-[#E6EDF3]/80 leading-relaxed whitespace-pre-wrap">
                {review.content}
              </div>
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  )
}
