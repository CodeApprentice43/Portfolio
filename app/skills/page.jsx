"use client"

import { motion } from "framer-motion"
import { Code2, Database, Cloud, Settings, Globe, Palette } from "lucide-react"

const skillCategories = [
  {
    category: "Frontend",
    icon: Palette,
    skills: [
      { name: "React", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "TypeScript", level: 80 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Vue.js", level: 70 },
    ],
  },
  {
    category: "Backend",
    icon: Code2,
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express", level: 80 },
      { name: "Python", level: 75 },
      { name: "FastAPI", level: 70 },
      { name: "REST APIs", level: 90 },
    ],
  },
  {
    category: "Database",
    icon: Database,
    skills: [
      { name: "PostgreSQL", level: 85 },
      { name: "MongoDB", level: 80 },
      { name: "Prisma ORM", level: 85 },
      { name: "Redis", level: 70 },
      { name: "Supabase", level: 80 },
    ],
  },
  {
    category: "Cloud & DevOps",
    icon: Cloud,
    skills: [
      { name: "AWS", level: 75 },
      { name: "Vercel", level: 90 },
      { name: "Docker", level: 70 },
      { name: "Git", level: 90 },
      { name: "CI/CD", level: 75 },
    ],
  },
  {
    category: "Tools & Others",
    icon: Settings,
    skills: [
      { name: "VS Code", level: 95 },
      { name: "Figma", level: 75 },
      { name: "Postman", level: 85 },
      { name: "Linux", level: 80 },
      { name: "Agile", level: 75 },
    ],
  },
  {
    category: "Web Technologies",
    icon: Globe,
    skills: [
      { name: "HTML/CSS", level: 95 },
      { name: "JavaScript", level: 90 },
      { name: "WebSockets", level: 70 },
      { name: "GraphQL", level: 65 },
      { name: "OAuth", level: 75 },
    ],
  },
]

export default function SkillsPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#E6EDF3] mb-4">Skills & Technologies</h1>
          <p className="text-[#E6EDF3]/60 font-mono">
            My technical toolkit and proficiency levels
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, catIndex) => {
            const Icon = category.icon
            return (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: catIndex * 0.1 }}
                className="bg-[#161B22] border border-[#1F6FEB]/20 rounded-lg p-6 space-y-6"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-[#1F6FEB]/10 p-2 rounded-lg">
                    <Icon className="size-5 text-[#1F6FEB]" />
                  </div>
                  <h2 className="text-2xl font-semibold text-[#E6EDF3]">{category.category}</h2>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-[#E6EDF3]/80 font-mono">
                          {skill.name}
                        </span>
                        <span className="text-xs text-[#1F6FEB] font-mono">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-2 bg-[#0D1117] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className="h-full bg-gradient-to-r from-[#1F6FEB] to-[#1F6FEB]/60 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
