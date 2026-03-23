import Connect from "@/app/config/db"
import  {User}  from '@/app/models/userModels'
import { NextRequest , NextResponse } from "next/server"
import bcrypt from "bcryptjs"

Connect()

export async function POST (req:NextRequest){
   try { 
    const reqBody = req.json()
    const {username,email ,password} = await reqBody   
    console.log(username , email ,password)

    let user = await User.findOne({email})
    console.log(user)
    if(user){
        return NextResponse.json({error:"User already exists"},{status:400})
    }

    const Hashpassword =  await bcrypt.hash(password,10)

    const newUser = new User({username, email, password:Hashpassword})
    await newUser.save()
    // console.log(newUser)

    return NextResponse.json({
      message:"User Created Successfully ",      
      success:true,
      data:newUser,
    })    
   } catch (error) {
        return NextResponse.json(
          {error:error.message},
          {status:500}
        )
   }
}
