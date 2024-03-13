import type { Metadata } from 'next'
import './globals.css'
import React, { ReactNode } from 'react'
import MainLayout from '@/app/layouts/MainLayout/MainLayout'
import ReduxProvider from '@/app/ReduxProvider'
import ClientServicesProvider from '@/app/ClientServicesProvider'

export const metadata: Metadata = {
  title: 'ГСК',
  description: 'ГСК official site'
}

const RootLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <ClientServicesProvider>
            <MainLayout>{children}</MainLayout>
          </ClientServicesProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}

export default RootLayout
