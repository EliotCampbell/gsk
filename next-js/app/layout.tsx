import type { Metadata } from 'next'
import './globals.css'
import React, { ReactNode } from 'react'
import MainLayout from '@/modules/mainLayout/MainLayout'
import Notification from '@/modules/notification/Notification'
import ServicesProvider from '@/app/ServicesProvider'

export const metadata: Metadata = {
  title: 'ГСК',
  description: 'ГСК official site'
}

const RootLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <ServicesProvider>
          <Notification>
            <MainLayout>{children}</MainLayout>
          </Notification>
        </ServicesProvider>
      </body>
    </html>
  )
}

export default RootLayout
