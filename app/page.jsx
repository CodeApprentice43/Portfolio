"use client"

import { motion } from "framer-motion"
import { ArrowRight, GraduationCap, Code2, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { AsciiFluid } from "@/components/animations/AsciiFluid"
import Link from "next/link"

export default function LandingPage() {
  return (
    <>
      <AsciiFluid />
      <div className="container mx-auto px-4 relative z-10">
      <section className="min-h-[80vh] flex items-center justify-center py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-[#E6EDF3] mb-4">
              Hi, I am <span className="text-[#1F6FEB]">Nafis Mortuza</span>
            </h1>
            <p className="text-xl text-[#E6EDF3]/70 font-mono">
              Computer Science Student & Software Developer
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-[#E6EDF3]/60 max-w-2xl mx-auto leading-relaxed"
          >
            I build software using Python, Javascript/Typescript, NodeJS and more. I enjoy building fullstack applications from scratch and exploring systems to understand how they work at a fundamental level.
            I also enjoy learning and building distributed systems using Golang and writing systems level programs using C. I am constantly exploring new technologies,frameworks and languages to expand my skill set.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
          >
            <Link href="/projects">
              <Button className="bg-[#1F6FEB] hover:bg-[#1F6FEB]/80 text-white gap-2">
                View Projects
                <ArrowRight className="size-4" />
              </Button>
            </Link>
            <Link href="/blog">
              <Button variant="outline" className="border-[#1F6FEB]/50 text-[#E6EDF3] hover:bg-[#1F6FEB]/10">
                Read Blog
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto space-y-12"
        >
          <h2 className="text-3xl font-bold text-[#E6EDF3] text-center mb-12">About Me</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#161B22] border border-[#1F6FEB]/20 rounded-lg p-6 space-y-4 hover:border-[#1F6FEB]/50 transition-colors">
              <div className="bg-[#1F6FEB]/10 p-3 rounded-lg w-fit">
                <GraduationCap className="size-6 text-[#1F6FEB]" />
              </div>
              <h3 className="text-xl font-semibold text-[#E6EDF3]">Education</h3>
              <p className="text-[#E6EDF3]/60 text-sm leading-relaxed">
                B.Sc. in Computer Science from University at Buffalo 2025 
                <br></br>
                <br></br>
                MS in Computer Science from University at Buffalo (In Progress).
              </p>
            </div>

            <div className="bg-[#161B22] border border-[#1F6FEB]/20 rounded-lg p-6 space-y-4 hover:border-[#1F6FEB]/50 transition-colors">
              <div className="bg-[#1F6FEB]/10 p-3 rounded-lg w-fit">
                <Code2 className="size-6 text-[#1F6FEB]" />
              </div>
              <h3 className="text-xl font-semibold text-[#E6EDF3]">Development</h3>
              <p className="text-[#E6EDF3]/60 text-sm leading-relaxed">
                Building full-stack applications with modern frameworks like 
                Next.js, React, and Node.js and system level programming with Golang.
              </p>
            </div>

            <div className="bg-[#161B22] border border-[#1F6FEB]/20 rounded-lg p-6 space-y-4 hover:border-[#1F6FEB]/50 transition-colors">
              <div className="bg-[#1F6FEB]/10 p-3 rounded-lg w-fit">
                <BookOpen className="size-6 text-[#1F6FEB]" />
              </div>
              <h3 className="text-xl font-semibold text-[#E6EDF3]">Interests</h3>
              <p className="text-[#E6EDF3]/60 text-sm leading-relaxed">
                Reading, video games, movies, sharing book reviews and blogging.
              </p>
            </div>
          </div>
        </motion.div>
      </section>
      </div>
    </>
  )
}
