"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/Button"

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with cart management, payment integration, and admin dashboard.",
    techStack: ["Next.js", "PostgreSQL", "Stripe", "Tailwind"],
    link: "https://github.com",
    demo: "https://demo.com",
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Collaborative task manager with real-time updates, drag-and-drop, and team features.",
    techStack: ["React", "Firebase", "TypeScript", "DND Kit"],
    link: "https://github.com",
    demo: "https://demo.com",
  },
  {
    id: 3,
    title: "Code Snippet Manager",
    description: "Save, organize, and share code snippets with syntax highlighting and tags.",
    techStack: ["Node.js", "MongoDB", "Express", "React"],
    link: "https://github.com",
    demo: null,
  },
  {
    id: 4,
    title: "Weather Dashboard",
    description: "Real-time weather data visualization with forecasts and location-based alerts.",
    techStack: ["Vue.js", "OpenWeather API", "Chart.js"],
    link: "https://github.com",
    demo: "https://demo.com",
  },
  {
    id: 5,
    title: "Blog Platform",
    description: "Markdown-based blogging platform with SEO optimization and analytics.",
    techStack: ["Next.js", "Prisma", "PostgreSQL", "MDX"],
    link: "https://github.com",
    demo: "https://demo.com",
  },
  {
    id: 6,
    title: "Portfolio Generator",
    description: "Automated portfolio site generator from GitHub profile and repositories.",
    techStack: ["Python", "FastAPI", "React", "GitHub API"],
    link: "https://github.com",
    demo: null,
  },
]

export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#E6EDF3] mb-4">Projects</h1>
          <p className="text-[#E6EDF3]/60 font-mono">
            A collection of things I have built
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#161B22] border border-[#1F6FEB]/20 rounded-lg p-6 space-y-4 hover:border-[#1F6FEB]/50 transition-all hover:shadow-lg hover:shadow-[#1F6FEB]/10"
            >
              <h3 className="text-xl font-semibold text-[#E6EDF3]">{project.title}</h3>
              
              <p className="text-[#E6EDF3]/60 text-sm leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono px-2 py-1 bg-[#1F6FEB]/10 text-[#1F6FEB] rounded border border-[#1F6FEB]/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-3 pt-2">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-[#1F6FEB]/50 text-[#E6EDF3] hover:bg-[#1F6FEB]/10 gap-2"
                  >
                    <Github className="size-4" />
                    Code
                  </Button>
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button
                      size="sm"
                      className="w-full bg-[#1F6FEB] hover:bg-[#1F6FEB]/80 text-white gap-2"
                    >
                      <ExternalLink className="size-4" />
                      Demo
                    </Button>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
