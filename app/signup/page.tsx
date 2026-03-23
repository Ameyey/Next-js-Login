"use client"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import axios from "axios"

function signup() {
  const router = useRouter()
  const [user, setUser]=useState({
    username:'',
    email:'',
    password:''
  })

  const [buttonDisabled , setButtonDisabled] =useState(false);
  const [Loading , setLoading ]= useState(false)

  const onsignup = async (e)=>{
     try {
       e.preventDefault()
      // console.log(user)
      setLoading(true)

      const response = await axios.post('/api/user/signup', user);
      // console.log(`Scuccess data:-  ${response}`)
      console.log(response.data)
      router.push('/login');

     } catch (error) {
      console.log(error)
     }finally{
      setLoading(false)
     }

  }

  useEffect(()=>{
      if(user.email.length > 0 &&  user.password.length > 0 && user.username.length > 0 ){
        setButtonDisabled(false);
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
        <h2 className="text-2xl font-bold text-center  mb-6">{Loading ? "Processing " :"Signup " }</h2>

        <form onSubmit={(e)=>onsignup(e)} className="space-y-4" method="post">
          {/* Username */}
          <div>
            <label className="block mb-1  font-medium">Username</label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={(e)=>handleChange(e)}
              placeholder="Enter username"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
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
              onChange={handleChange}
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
            {buttonDisabled ? "No Signup" :" Signup"}
          </button>
          <Link href="/login" className="text-[12px] text-blue-500 italic font-bold">Visit login page</Link>
        </form>
      </div>
    </div>
  )
}

export default signup
