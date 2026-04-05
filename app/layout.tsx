import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Portfolio | Creative Developer',
  description: 'High-end Scrollytelling Personal Portfolio Website.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#0a0a0a] text-zinc-100 antialiased selection:bg-white selection:text-black`}>
        {children}
      </body>
    </html>
  )
}
