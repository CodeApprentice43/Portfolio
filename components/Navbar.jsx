"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Code2, Menu, X } from "lucide-react"
import { useState } from "react"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/reviews", label: "Reviews" },
  { href: "/blog", label: "Blog" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 bg-[#0D1117]/80 backdrop-blur-md border-b border-[#1F6FEB]/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="bg-[#1F6FEB] p-2 rounded-lg">
              <Code2 className="size-5 text-white" />
            </div>
            <span className="text-[#E6EDF3] font-mono">Nafis Mortuza</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={isActive ? "text-[#1F6FEB] text-sm font-mono transition-colors relative" : "text-[#E6EDF3]/70 hover:text-[#E6EDF3] text-sm font-mono transition-colors relative"}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[#E6EDF3] hover:text-[#1F6FEB] transition-colors"
          >
            {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden overflow-hidden">
            <div className="py-4 space-y-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={isActive ? "block text-sm font-mono text-[#1F6FEB]" : "block text-sm font-mono text-[#E6EDF3]/70 hover:text-[#E6EDF3]"}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
