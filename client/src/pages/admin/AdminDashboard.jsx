import React from 'react'
import Layout from '../../components/layout/Layout'
import AdminPanel from '../../components/layout/AdminPanel'
import { useAuth } from '../../context/Auth'

const AdminDashboard = () => {

    const[auth] = useAuth();

  return (
    <Layout>
      <div className='flex'>
        <AdminPanel/>
        <h1>{auth?.user?.name}</h1>
      </div>
    </Layout>
  )
}

export default AdminDashboard