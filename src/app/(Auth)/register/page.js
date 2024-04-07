

'use client'

import { Input, Typography } from "@material-tailwind/react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

function register() {
    const router = useRouter();
    const [register,setRegister] = useState({email:'',password:'',confirmPassword:''})
    const {data:session,status:sessionStatus} = useSession();
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
    const handleSubmit = async()=>{
        
     try {
            const res = await fetch('http://localhost:3000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json'
                },
                body: JSON.stringify(register) // Pass data directly as the body
            });

            const data = await res.json();
            if(data.isSuccess)
            {
                
                toast.success(data.message)
                router.push('login')
                clearFields();
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const clearFields = ()=>{
        setRegister({email:'',password:'',confirmPassword:''});
    }
  return (
   <div className="min-h-screen flex justify-center items-center border"><div className="border rounded p-5">
    
    <Typography className="font-bold text-2xl">Register Your account</Typography>
    <div className="w-72 my-5">
      <Input label="Email" onChange={(e)=>setRegister({...register,email:e.target.value})} type="email" value={register.email}/>
    </div>
    <div className="w-72 my-5">
      <Input label="Password" type="password" onChange={(e)=>setRegister({...register,password:e.target.value})} value={register.password}/>
    </div>
    <div className="w-72 my-5">
      <Input label="Confirm Password" type="password" onChange={(e)=>setRegister({...register,confirmPassword:e.target.value})} value={register.confirmPassword}/>
    </div>
    <div className="w-72 my-5 flex items-center justify-center">
        <button className="bg-purple-500 text-white p-2 rounded hover:bg-purple-700 " onClick={handleSubmit}>Sign Up</button>
    </div>
    <Typography className="text-gray-500 text-sm">Already have an account? <Link href='/login' className="text-blue-300 hover:text-blue-700">Login</Link></Typography>
    </div></div>
  )
}

export default register