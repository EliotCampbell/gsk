import type { Metadata } from 'next'
import './globals.css'
import React, { ReactNode } from 'react'
import MainLayout from '@/modules/mainLayout/MainLayout'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'ГСК',
  description: 'ГСК official site'
}

const RootLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <MainLayout>{children}</MainLayout>
        <Toaster position={'top-right'} toastOptions={{ duration: 3000 }} />
      </body>
    </html>
  )
}

export default RootLayout
