import './globals.css'
import type { Metadata } from 'next'
import { Tilt_Warp } from 'next/font/google'

const tilt_warp = Tilt_Warp({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sact',
  description: 'A lol habit tracker for vasectomies.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
