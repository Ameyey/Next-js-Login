"use client"

import React from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'


function profile() {
  const router = useRouter()
  const Logout =async ()=>{
    try {
          await axios.get('/api/user/logout')
          router.push('/login')
      } catch (error) {
          console.log(error)
        }
  }

  return (
    <div>
      <h1 className='flex flex-col items-center justify-center'>Profile</h1>
      <button onClick={Logout} className='bg-blue-500 hover:bg-blue-700 text-white font-black py-2 px-2 rounded m-3 ' >Logout</button>
    </div>
  )
}

export default profile
