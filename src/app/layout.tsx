"use client"
import { QueryClientProvider } from '@tanstack/react-query'
import './globals.css'
import { Roboto } from 'next/font/google'
import { queryClient } from '@/lib/react-query'

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  )
}
