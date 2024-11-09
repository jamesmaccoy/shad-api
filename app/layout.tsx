'use client'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/app/components/navbar'
import { AuthContextProvider } from './context/AuthContext' 
import Link from 'next/link'


const inter = Inter({ subsets: ['latin'] })

/*
export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}*/

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <Navbar />{children}
      </AuthContextProvider>
      <Link href={'/terms'}>Terms and condition</Link>
      </body>
    </html>
  )
}
