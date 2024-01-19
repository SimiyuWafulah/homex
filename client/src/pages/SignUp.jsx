import React from 'react'
import Oauth from '../components/Oauth'
import { Link } from 'react-router-dom'

export default function SignUp() {
  return (
    <div className='max-w-lg mx-auto p-3'>
     <h1 className='text-3xl font-semibold text-center my-7'>Sign Up</h1>
     <form className='flex flex-col gap-4'>
      <input
        type='text'
        placeholder='username'
        id='username'
        className='border p-3 rounded-lg'
      />
      <input
        type='email'
        placeholder='email'
        id='email'
        className='border p-3 rounded-lg'
      />
      <input
        type='password'
        placeholder='password'
        id='password'
        className='border p-3 rounded-lg'
      />
      <button className='bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80 uppercase'>Sign Up</button>
      <Oauth/>
     </form>
     <div className='flex gap-2 mt-5'>
      <p>Alreadyy have an account?</p>
      <Link to ='/signin'>
        <span className='text-blue-700'>Sign In</span>
      </Link>
     </div>
    </div>
  )
}
