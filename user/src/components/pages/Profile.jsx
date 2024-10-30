import React, { useContext, useEffect } from 'react'
import { UserContext } from '../context/UserContext'
import { Button } from '../ui/button'

const Profile = () => {
    const { user,  getUser , id} = useContext(UserContext)   
    console.log(id)
    useEffect(() => {
        getUser(id)
    },[id])

    if (!user) {
        return <div>Loading...</div>;
      }      
  return (
    <div className='px-[5vw]'>
      <Button className='float-right mt-5 text-xl bg-green-900 hover:bg-green-800'>Edit</Button>
      <h1 className='my-3 text-2xl'>Profile Section</h1>
      <h1>Name: {user.name}</h1>
      <h1>Gender : {user.gender}</h1>
      <h1>Email: {user.email}</h1>
      <h1>Mobile: {user.mobile}</h1>
      <h1>Country :{user.country}</h1>     
      <h1 className='mb-5'>State :{user.state}</h1>
    </div>
  )
}

export default Profile
