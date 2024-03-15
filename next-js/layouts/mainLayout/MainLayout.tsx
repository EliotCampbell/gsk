import React, { ReactNode } from 'react'
import Header from '@/layouts/mainLayout/components/Header/Header'
import Footer from '@/layouts/mainLayout/components/Footer/Footer'
import LayoutBody from '@/layouts/mainLayout/components/LayoutBody/LayoutBody'
import {
  FiAlertTriangle,
  FiAlignCenter,
  FiCheckCircle,
  FiPhoneCall,
  FiTool
} from 'react-icons/fi'
import UserSection from '@/layouts/mainLayout/clientSide/UserSection'

const MainLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  type TMenuItem = {
    type: string
    title: string
    path: string
    ico: ReactNode
  }

  const menuItems: TMenuItem[] = [
    {
      type: 'news',
      title: 'НОВОСТИ',
      path: '/publications',
      ico: <FiAlignCenter />
    },
    {
      type: 'services',
      title: 'МАСТЕРА',
      path: '/services',
      ico: <FiTool />
    },
    {
      type: 'ads',
      title: 'ОБЪЯВЛЕНИЯ',
      path: '/ads',
      ico: <FiAlertTriangle />
    },
    {
      type: 'payment',
      title: 'ОПЛАТА',
      path: '/payment',
      ico: <FiCheckCircle />
    },
    {
      type: 'contacts',
      title: 'КОНТАКТЫ',
      path: '/contacts',
      ico: <FiPhoneCall />
    }
  ]

  return (
    <>
      <Header menuItems={menuItems} title={'ГСК'}>
        <UserSection />
      </Header>
      <LayoutBody>{children}</LayoutBody>
      <Footer title={'ГСК'} />
    </>
  )
}

export default MainLayout
