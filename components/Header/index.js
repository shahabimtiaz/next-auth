

'use client'
import {  useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";



const Header = () => {
 const router = useRouter();
 const {data:session,status:sessionStatus} = useSession();
 useEffect(()=>{
  if(sessionStatus === 'unauthenticated')
  {
    router.push('/login')
  }
 },[sessionStatus,router])
 
  return (
    <header className="bg-purple-500 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">Next Auth</div>
        <nav  className={`flex justify-between`}>
          <ul className="flex justify-between items-center">
          <li >
              <a className="text-white hover:text-gray-300 mr-4 cursor-pointer" onClick={()=>router.push('/')}>Home</a>
            </li>
            <li >
              <a className="text-white hover:text-gray-300 mr-4 cursor-pointer" onClick={()=>router.push('/dashboard')}>Dashboard</a>
            </li>
            {sessionStatus === 'unauthenticated' && <>
            <li className="mr-3">
              <a  className="text-white hover:text-gray-300 mr-4 cursor-pointer" onClick={()=>router.push('login')}>Login</a>
            </li>
            <li>
              <a className="text-white hover:text-gray-300 cursor-pointer" onClick={()=>router.push('register')}>Sign Up</a>
            </li>
            </> }
          </ul>
         
        </nav>
       
      </div>
      
    </header>
    
  );
};

export default Header;
