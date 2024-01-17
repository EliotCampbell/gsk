import React, { ReactNode } from 'react'
import Header from '@/MainLayout/components/Header/Header'
import Footer from '@/MainLayout/components/Footer/Footer'
import LayoutBody from '@/MainLayout/components/LayoutBody/LayoutBody'
import classes from '@/MainLayout/components/Header/Header.module.css'
import {
  FiAlertTriangle,
  FiAlignCenter,
  FiCheckCircle,
  FiPhoneCall,
  FiTool
} from 'react-icons/fi'

const MainLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const menuItems: {
    type: string
    title: string
    path: string
    ico: ReactNode
  }[] = [
    {
      type: 'news',
      title: 'НОВОСТИ',
      path: '/news',
      ico: <FiAlignCenter className={classes.ico} />
    },
    {
      type: 'services',
      title: 'МАСТЕРА',
      path: '/services',
      ico: <FiTool className={classes.ico} />
    },
    {
      type: 'ads',
      title: 'ОБЪЯВЛЕНИЯ',
      path: '/ads',
      ico: <FiAlertTriangle className={classes.ico} />
    },
    {
      type: 'payment',
      title: 'ОПЛАТА',
      path: '/payment',
      ico: <FiCheckCircle className={classes.ico} />
    },
    {
      type: 'contacts',
      title: 'КОНТАКТЫ',
      path: '/contacts',
      ico: <FiPhoneCall className={classes.ico} />
    }
  ]
  return (
    <>
      <Header menuItems={menuItems} title={'ГСК'} />
      <LayoutBody>{children}</LayoutBody>
      <Footer />
    </>
  )
}

export default MainLayout
