import { Github, Linkedin, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-[#1F6FEB]/20 py-8 mt-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[#E6EDF3]/60 font-mono">
            © 2025 Nafis Mortuza. Built with Next.js & Supabase.
          </p>
          
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E6EDF3]/60 hover:text-[#1F6FEB] transition-colors"
            >
              <Github className="size-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E6EDF3]/60 hover:text-[#1F6FEB] transition-colors"
            >
              <Linkedin className="size-5" />
            </a>
            <a
              href="mailto:nafis@example.com"
              className="text-[#E6EDF3]/60 hover:text-[#1F6FEB] transition-colors"
            >
              <Mail className="size-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
