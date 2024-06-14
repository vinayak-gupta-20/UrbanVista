import React from 'react'
import Header from './Header.jsx'
import { Toaster } from 'react-hot-toast';

const Layout = ({children}) => {
  return (
    <>
        <Header/>
        <main className='min-h-[93vh]'>
          <Toaster/>
          {children}
        </main>
    </>
  )
}

export default Layout