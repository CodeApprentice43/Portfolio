"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Calendar, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/Button"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"

export default function BlogPostPage() {
  const params = useParams()
  const router = useRouter()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/blog/${params.id}`)
        if (!response.ok) {
          throw new Error('Blog post not found')
        }
        const data = await response.json()
        setPost(data)
      } catch (error) {
        console.error('Failed to fetch blog post:', error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchPost()
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
          Loading blog post...
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#E6EDF3]/60 font-mono mb-6">Blog post not found</p>
          <Button onClick={() => router.push('/blog')} variant="outline">
            <ArrowLeft className="size-4 mr-2" />
            Back to Blog
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
          onClick={() => router.push('/blog')}
          variant="ghost"
          size="sm"
          className="mb-8 text-[#1F6FEB] hover:bg-[#1F6FEB]/10 gap-2"
        >
          <ArrowLeft className="size-4" />
          Back to Blog
        </Button>

        <div className="bg-[#161B22] border border-[#1F6FEB]/20 rounded-lg p-8 md:p-12">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-[#E6EDF3] mb-4">
              {post.title}
            </h1>
            
            <div className="flex items-center gap-2 text-[#E6EDF3]/50 font-mono text-sm">
              <Calendar className="size-4" />
              <span>{formatDate(post.createdAt)}</span>
            </div>
          </div>

          <div className="prose prose-invert prose-lg max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '')
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={vscDarkPlus}
                      language={match[1]}
                      PreTag="div"
                      customStyle={{
                        margin: '1.5em 0',
                        borderRadius: '0.5rem',
                        border: '1px solid rgba(31, 111, 235, 0.2)',
                      }}
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code
                      className="bg-[#0D1117] text-[#1F6FEB] px-2 py-1 rounded text-sm font-mono border border-[#1F6FEB]/20"
                      {...props}
                    >
                      {children}
                    </code>
                  )
                },
                h1: ({ children }) => (
                  <h1 className="text-3xl font-bold text-[#E6EDF3] mt-8 mb-4">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl font-bold text-[#E6EDF3] mt-6 mb-3">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-bold text-[#E6EDF3] mt-4 mb-2">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="text-[#E6EDF3]/80 leading-relaxed mb-4">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside text-[#E6EDF3]/80 mb-4 space-y-2">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside text-[#E6EDF3]/80 mb-4 space-y-2">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="text-[#E6EDF3]/80">{children}</li>
                ),
                a: ({ children, href }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1F6FEB] hover:underline"
                  >
                    {children}
                  </a>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-[#1F6FEB] pl-4 italic text-[#E6EDF3]/70 my-4">
                    {children}
                  </blockquote>
                ),
                table: ({ children }) => (
                  <div className="overflow-x-auto my-4">
                    <table className="min-w-full border border-[#1F6FEB]/20">
                      {children}
                    </table>
                  </div>
                ),
                th: ({ children }) => (
                  <th className="border border-[#1F6FEB]/20 px-4 py-2 bg-[#0D1117] text-[#E6EDF3] font-semibold text-left">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="border border-[#1F6FEB]/20 px-4 py-2 text-[#E6EDF3]/80">
                    {children}
                  </td>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
      </motion.article>
    </div>
  )
}
