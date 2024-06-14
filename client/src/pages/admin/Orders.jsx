import React from 'react'
import Layout from '../../components/layout/Layout'
import AdminPanel from '../../components/layout/AdminPanel'


const Orders = () => {
  return (
    <Layout>
      <div className='flex'>
        <AdminPanel/>
        <h1>Orders</h1>
      </div>
    </Layout>
  )
}

export default Orders