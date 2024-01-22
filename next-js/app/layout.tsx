import type { Metadata } from 'next'
import './globals.css'
import React, { ReactNode } from 'react'
import MainLayout from '@/modules/mainLayout/MainLayout'
import StoreProvider from '@/lib/redux/StoreProvider'
import Error from '@/modules/error/Error'

export const metadata: Metadata = {
  title: 'ГСК',
  description: 'ГСК official site'
}

const RootLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <Error>
            <MainLayout>{children}</MainLayout>
          </Error>
        </StoreProvider>
      </body>
    </html>
  )
}

export default RootLayout
