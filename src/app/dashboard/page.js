'use client'
import { Button, Typography } from '@material-tailwind/react';
import { signOut, useSession } from 'next-auth/react'
import React, { useEffect } from 'react'

const Dashboard = () => {
    const {data:session,status:sessionStatus} = useSession();
    useEffect(()=>{
        console.log(session)
    },[sessionStatus])
    if(sessionStatus === 'loading')
    {
return <div>loading...</div>
    }
  return (
    <div className='min-h-96 flex justify-center items-center'>{sessionStatus === 'authenticated' ? <Typography className='bg-purple-700 text-4xl text-white p-5 rounded'>
    Welcome to the dashboard {session?.user?.email} <br/> <Button className='bg-red-500 hover:bg-red-700 mt-5 float-end' onClick={()=>signOut()}>Signout</Button>  </Typography> : <Typography className='bg-red-700 text-4xl text-white p-5 rounded'>
        Please login first! </Typography>}</div>
  )
}

export default Dashboard