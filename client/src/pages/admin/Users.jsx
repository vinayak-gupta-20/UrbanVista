import React from 'react'
import AdminPanel from '../../components/layout/AdminPanel'
import Layout from '../../components/layout/Layout'


const Users = () => {
  return (
    <Layout>
      <div className='flex'>
        <AdminPanel/>
        <h1>Orders</h1>
      </div>
    </Layout>
  )
}

export default Users