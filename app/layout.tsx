import './globals.css'
import type { Metadata } from 'next'
import { Tilt_Warp } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

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
    <ClerkProvider>
      <html lang='en'>
        <body
          className={[
            `
          h-[100dvh] w-[100dvw]
          flex
          justify-center
          items-center
          `,
            tilt_warp.className,
          ]
            .filter(Boolean)
            .join(' ')
            .trim()}
        >
          <div
            className={`
            h-full w-full
            portrait:md:max-h-[50rem] portrait:md:max-w-[25rem]
            landscape:md:max-h-[25rem] landscape:md:max-w-[50rem]
            flex flex-col
            p-12
            md:outline-2 md:outline-dotted md:outline-gray-300
          `}
          >
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}
