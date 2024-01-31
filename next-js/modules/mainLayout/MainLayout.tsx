import React, { ReactNode } from 'react'
import Header from '@/modules/mainLayout/components/Header/Header'
import Footer from '@/modules/mainLayout/components/Footer/Footer'
import LayoutBody from '@/modules/mainLayout/components/LayoutBody/LayoutBody'
import classes from '@/modules/mainLayout/components/Header/Header.module.css'
import {
  FiAlertTriangle,
  FiAlignCenter,
  FiCheckCircle,
  FiPhoneCall,
  FiTool
} from 'react-icons/fi'
//todo: css import

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
