import Connect from "@/app/config/db";
import { User } from "@/app/models/userModels";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

Connect();

export  async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    let user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        {
          error: "User are not Exis",
        },
        { status: 400 },
      );
    }

    const validPassword = await bcrypt.compare(password, user.password)
    console.log(validPassword)
    if(!validPassword){
      return NextResponse.json({error:"Invalid password"} ,{status:400})
    }

    const tokenDate ={
      id:user._id,
      username:user.username,
      email:user.email    
    }

    const token = await jwt.sign(tokenDate , process.env.JWT_SERVER_KEY,{ expiresIn :"1h"})

    const respont  = NextResponse.json({message:'Login Success' , success:true})

    respont.cookies.set("token",token,{ httpOnly:true , path:'/'})

    return respont;


  } catch (error) {
    return NextRequest.json({ error: error.message }, { status: 500 });
  }
}
