 "use client"

  import { useEffect, useState } from 'react'
  import { useRouter } from 'next/navigation'
  import { useAuth } from '@/lib/AuthContext'
  import { motion } from 'framer-motion'
  import { Button } from '@/components/ui/Button'
  import { Plus, Trash2, Edit2, X } from 'lucide-react'

  export default function AdminPage() {
    const { user, loading, signOut } = useAuth()
    const router = useRouter()
    const [activeTab, setActiveTab] = useState('projects')
    const [projects, setProjects] = useState([])
    const [blogs, setBlogs] = useState([])
    const [reviews, setReviews] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [editingItem, setEditingItem] = useState(null)

    // Form states
    const [formData, setFormData] = useState({})

    useEffect(() => {
      if (!loading && !user) {
        router.push('/login')
      }
    }, [user, loading, router])

    useEffect(() => {
      if (user) {
        fetchData()
      }
    }, [user, activeTab])

    const fetchData = async () => {
      try {
        if (activeTab === 'projects') {
          const res = await fetch('/api/projects')
          const data = await res.json()
          setProjects(data)
        } else if (activeTab === 'blogs') {
          const res = await fetch('/api/blog')
          const data = await res.json()
          setBlogs(data)
        } else if (activeTab === 'reviews') {
          const res = await fetch('/api/reviews')
          const data = await res.json()
          setReviews(data)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    const handleCreate = () => {
      setEditingItem(null)
      setFormData({})
      setShowForm(true)
    }

    const handleEdit = (item) => {
      setEditingItem(item)
      setFormData(item)
      setShowForm(true)
    }

    const handleDelete = async (id) => {
      if (!confirm('Are you sure you want to delete this item?')) return

      try {
        const endpoint = `${activeTab === 'blogs' ? 'blog' : activeTab}/${id}`
        await fetch(`/api/${endpoint}`, { method: 'DELETE' })
        fetchData()
      } catch (error) {
        console.error('Error deleting:', error)
      }
    }

    const handleSubmit = async (e) => {
      e.preventDefault()

      try {
        const endpoint = activeTab === 'blogs' ? 'blog' : activeTab

        if (editingItem) {
          // Update
          await fetch(`/api/${endpoint}/${editingItem.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
          })
        } else {
          // Create
          await fetch(`/api/${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
          })
        }

        setShowForm(false)
        setFormData({})
        fetchData()
      } catch (error) {
        console.error('Error saving:', error)
      }
    }

    const handleLogout = async () => {
      await signOut()
      router.push('/')
    }

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
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-[#E6EDF3] mb-2">Admin Dashboard</h1>
              <p className="text-[#E6EDF3]/60">Welcome, {user.email}</p>
            </div>
            <Button onClick={handleLogout} variant="outline">
              Logout
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b border-[#1F6FEB]/20">
            {['projects', 'blogs', 'reviews'].map(tab => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab)
                  setShowForm(false)
                }}
                className={`px-4 py-2 font-mono capitalize transition-colors ${
                  activeTab === tab
                    ? 'text-[#1F6FEB] border-b-2 border-[#1F6FEB]'
                    : 'text-[#E6EDF3]/60 hover:text-[#E6EDF3]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="bg-[#161B22] border border-[#1F6FEB]/20 rounded-lg p-8">
            {!showForm ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-[#E6EDF3] capitalize">
                    {activeTab}
                  </h2>
                  <Button onClick={handleCreate} className="gap-2">
                    <Plus className="size-4" />
                    Add New
                  </Button>
                </div>

                {/* List Items */}
                <div className="space-y-4">
                  {activeTab === 'projects' && projects.map(project => (
                    <ItemCard
                      key={project.id}
                      item={project}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      type="project"
                    />
                  ))}
                  {activeTab === 'blogs' && blogs.map(blog => (
                    <ItemCard
                      key={blog.id}
                      item={blog}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      type="blog"
                    />
                  ))}
                  {activeTab === 'reviews' && reviews.map(review => (
                    <ItemCard
                      key={review.id}
                      item={review}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      type="review"
                    />
                  ))}
                </div>
              </>
            ) : (
              <>
                {/* Form */}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-[#E6EDF3]">
                    {editingItem ? 'Edit' : 'Create New'} {activeTab.slice(0, -1)}
                  </h2>
                  <button onClick={() => setShowForm(false)} className="text-[#E6EDF3]/60 hover:text-[#E6EDF3]">
                    <X className="size-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {activeTab === 'projects' && (
                    <ProjectForm formData={formData} setFormData={setFormData} />
                  )}
                  {activeTab === 'blogs' && (
                    <BlogForm formData={formData} setFormData={setFormData} />
                  )}
                  {activeTab === 'reviews' && (
                    <ReviewForm formData={formData} setFormData={setFormData} />
                  )}

                  <div className="flex gap-4">
                    <Button type="submit" className="flex-1">
                      {editingItem ? 'Update' : 'Create'}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </div>
    )
  }

  // Item Card Component
  function ItemCard({ item, onEdit, onDelete, type }) {
    return (
      <div className="bg-[#0D1117] border border-[#1F6FEB]/20 rounded-lg p-4 flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-[#E6EDF3] mb-2">{item.title}</h3>
          {type === 'project' && (
            <p className="text-sm text-[#E6EDF3]/60">{item.description}</p>
          )}
          {type === 'blog' && (
            <p className="text-sm text-[#E6EDF3]/60 line-clamp-2">{item.content?.substring(0, 150)}...</p>
          )}
          {type === 'review' && (
            <p className="text-sm text-[#E6EDF3]/60">By {item.author} - Rating: {item.rating}/5</p>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(item)}
            className="p-2 text-[#1F6FEB] hover:bg-[#1F6FEB]/10 rounded"
          >
            <Edit2 className="size-4" />
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="p-2 text-red-500 hover:bg-red-500/10 rounded"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      </div>
    )
  }

  // Project Form
  function ProjectForm({ formData, setFormData }) {
    const handleTechStackChange = (e) => {
      const value = e.target.value
      setFormData({ ...formData, techStack: value.split(',').map(t => t.trim()) })
    }

    return (
      <>
        <Input
          label="Title"
          value={formData.title || ''}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <Textarea
          label="Description"
          value={formData.description || ''}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
        <Input
          label="Tech Stack (comma separated)"
          value={formData.techStack?.join(', ') || ''}
          onChange={handleTechStackChange}
          placeholder="Next.js, React, Tailwind"
        />
        <Input
          label="GitHub Link"
          value={formData.link || ''}
          onChange={(e) => setFormData({ ...formData, link: e.target.value })}
        />
        <Input
          label="Demo Link"
          value={formData.demo || ''}
          onChange={(e) => setFormData({ ...formData, demo: e.target.value })}
        />
      </>
    )
  }

  // Blog Form
  function BlogForm({ formData, setFormData }) {
    return (
      <>
        <Input
          label="Title"
          value={formData.title || ''}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <Textarea
          label="Content (Markdown supported)"
          value={formData.content || ''}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          rows={15}
          required
          placeholder="Write your blog post in Markdown. Use ```language for code blocks."
        />
        <div className="text-sm text-[#E6EDF3]/60">
          <p className="font-semibold mb-2">Markdown Tips:</p>
          <ul className="space-y-1 list-disc list-inside">
            <li>Use # for headings (# H1, ## H2, etc.)</li>
            <li>Use **bold** for bold text</li>
            <li>Use `code` for inline code</li>
            <li>Use ```javascript for code blocks (specify language)</li>
          </ul>
        </div>
      </>
    )
  }

  // Review Form
  function ReviewForm({ formData, setFormData }) {
    return (
      <>
        <Input
          label="Book Title"
          value={formData.title || ''}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <Input
          label="Author"
          value={formData.author || ''}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
        />
        <Input
          label="Book Cover URL"
          value={formData.bookCover || ''}
          onChange={(e) => setFormData({ ...formData, bookCover: e.target.value })}
          placeholder="https://..."
        />
        <Input
          label="Rating (1-5)"
          type="number"
          min="1"
          max="5"
          value={formData.rating || ''}
          onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
        />
        <Textarea
          label="Review Content"
          value={formData.content || ''}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          rows={8}
          required
        />
      </>
    )
  }

  // Input Component
  function Input({ label, ...props }) {
    return (
      <div>
        <label className="block text-sm font-medium text-[#E6EDF3] mb-2">
          {label}
        </label>
        <input
          className="w-full px-4 py-2 bg-[#0D1117] border border-[#1F6FEB]/30 rounded-md text-[#E6EDF3] focus:outline-none focus:border-[#1F6FEB]"
          {...props}
        />
      </div>
    )
  }

  // Textarea Component
  function Textarea({ label, ...props }) {
    return (
      <div>
        <label className="block text-sm font-medium text-[#E6EDF3] mb-2">
          {label}
        </label>
        <textarea
          className="w-full px-4 py-2 bg-[#0D1117] border border-[#1F6FEB]/30 rounded-md text-[#E6EDF3] focus:outline-none focus:border-[#1F6FEB] 
  font-mono text-sm"
          rows={4}
          {...props}
        />
      </div>
    )
  }

