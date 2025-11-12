import { Inter } from 'next/font/google'
  import './globals.css'
  import Navbar from '@/components/Navbar'
  import Footer from '@/components/Footer'
  import { AuthProvider } from '@/lib/AuthContext'

  const inter = Inter({ subsets: ['latin'] })

  export const metadata = {
    title: 'Nafis Mortuza - Portfolio',
    description: 'Computer Science Student & Software Developer',
  }

  export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body className={inter.className}>
          <AuthProvider>
            <div className="min-h-screen bg-[#0D1117] text-[#E6EDF3]">
              <Navbar />
              <main>{children}</main>
              <Footer />
            </div>
          </AuthProvider>
        </body>
      </html>
    )
  }

