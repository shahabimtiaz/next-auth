import { NextResponse } from "next/server"
import MongoConnect from "../../../../config/MongoConnect";
import Users from "../../../../model/Users";
import bcrypt from 'bcryptjs';
export const POST = async(request)=>{
   const data = await request.json();
   
 try {
    if(!data.email || !data.password || !data.confirmPassword)
    {
     return  NextResponse.json({isSuccess:false,message:'Provide all required data!'},{status:200})
    }else if(data.password !== data.confirmPassword){
     return   NextResponse.json({isSuccess:false,message:'Password do not match'},{status:200})
    }else{
        await MongoConnect();
  const existingUser = await Users.findOne({email:data.email});
  if(existingUser)
  {
    return   NextResponse.json({isSuccess:false,message:'Email is already exist!'},{status:200})
  }else{
    const hashedPassword = await bcrypt.hash(data.password,10);
    const newUser = new Users({email:data.email,password:hashedPassword})
    const savedUser = await newUser.save();
    if(savedUser){
        // return NextResponse.redirect(new URL('/login',request.url))
        return   NextResponse.json({isSuccess:true,message:'User is successfully registered!'},{status:200})
    }else{
        return   NextResponse.json({isSuccess:false,message:'Some error occur while creating record!'},{status:200})
    }
  }
  
    }
 } catch (error) {
    return   NextResponse.json({isSuccess:false,message:error.message},{status:500})
 }
}