"use client"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import axios from "axios"

function Loginpage() {

  const router = useRouter()
  const [buttonDisabled , setButtonDisabled]=useState(false)
  const [Loading , setLoading]=useState(false)

  const [user, setUser]=useState({
    email:'',
    password:''
  })

  const onsignup = async (e)=>{
  try {
      e.preventDefault()
    //  console.log(user) 
     setLoading(true)
     let data = await axios.post('/api/user/login',user)
     console.log(data)
     router.push('/profile')

  } catch (error) {
    console.log(error)
  }finally{
      setLoading(false)
  }
  }

  useEffect(()=>{
    if(user.email.length >0 && user.password.length > 0 ){
      setButtonDisabled(false)
    }else{
      setButtonDisabled(true)
    }
  },[user])

  const handleChange = (e)=>{
    setUser({...user,[e.target.name]:e.target.value})
  }

  return (
   <div className="min-h-screen flex items-center justify-center bg-blue-100 ">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center  mb-6">Login page</h2>

        <form onSubmit={onsignup} className="space-y-4" method="post">
          

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={(e)=>handleChange(e)}
              placeholder="Enter email"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={(e)=>handleChange(e)}
              placeholder="Enter password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Create Account
          </button>
          <Link href="/signup" className="text-[12px] text-blue-500 italic font-bold">Visit Sinup page</Link>
        </form>
      </div>
    </div>
  )
}

export default Loginpage
