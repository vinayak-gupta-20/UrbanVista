import React from 'react'
import Layout from '../../components/layout/Layout'
import { useAuth } from '../../context/Auth'
import UserPanel from '../../components/layout/UserPanel'

const Profile = () => {

    const[auth] = useAuth();

  return (
    <Layout>
      <div className='flex'>
        <UserPanel/>
        <h1>profile</h1>
      </div>
    </Layout>
  )
}

export default Profile