'use client'
import { Input, Typography } from '@material-tailwind/react';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

function login() {
    const router = useRouter();
    const {data:session,status:sessionStatus} = useSession();
   const [loginInfo,setLoginInfo] = useState({email:'',password:''});
   const submitHandler = async()=>{
    if(!loginInfo.email || !loginInfo.password)
    {
        toast.error('Please provide the credentials');
    }else{
        const res = await signIn('credentials',{
            redirect:false,
            email:loginInfo.email,
            password:loginInfo.password
        })
        if(res?.error)
        {
            if(res?.url)
            {
                router.replace('/dashboard')
            }
            toast.error('Invalid credentials')
        }else{
            toast.success('Login successfully!');
            router.push('/dashboard');
        }
    }
   }
   useEffect(()=>{
    if(sessionStatus === 'authenticated')
    {
        router.push('/dashboard');
    }
   },[sessionStatus,router])
   if(sessionStatus === 'loading')
    {
        return <div>loading...</div>
    }
  return (
    <div className="min-h-screen flex justify-center items-center border"><div className="border rounded p-5">
    
    <Typography className="font-bold text-2xl">Login</Typography>
    <div className="w-72 my-5">
      <Input label="Email" onChange={(e)=>setLoginInfo({...loginInfo,email:e.target.value})} value={loginInfo.email} />
    </div>
    <div className="w-72 my-5">
      <Input label="Password" type="password" onChange={(e)=>setLoginInfo({...loginInfo,password:e.target.value})} value={loginInfo.password}/>
    </div>
    <div className="w-72 my-5 flex items-center justify-center">
        <button className="bg-purple-500 text-white p-2 rounded hover:bg-purple-700 " onClick={submitHandler}>Login</button>
    </div>
    <Typography className="text-gray-500 text-sm">Don't have an account? <Link href='/register' className="text-blue-300 hover:text-blue-700">Register now</Link></Typography>
    </div></div>
  )
}

export default login