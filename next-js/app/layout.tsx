import type { Metadata } from 'next'
import './globals.css'
import React, { ReactNode } from 'react'
import MainLayout from '@/modules/mainLayout/MainLayout'

export const metadata: Metadata = {
  title: 'ГСК',
  description: 'ГСК official site'
}

const RootLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  )
}

export default RootLayout
