import React from 'react'
import Layout from '../../components/layout/Layout'
import { useAuth } from '../../context/Auth'
import UserPanel from '../../components/layout/UserPanel'

const DashBoard = () => {

    const[auth] = useAuth();

  return (
    <Layout>
      <div className='flex'>
        <UserPanel/>
        <h1>{auth?.user?.name}</h1>
      </div>
    </Layout>
  )
}

export default DashBoard