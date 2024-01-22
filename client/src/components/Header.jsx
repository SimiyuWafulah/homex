import React from 'react'
import {FaSearch} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'

export default function Header() {
    const {currentUser} = useSelector((state) => state.user)
  return (
    <header className='bg-slate-200 shadow-md'>
        <div className='flex justify-between items-center max-w-6xl p-3 mx-auto'>
            <h1 className='text-sm sm:text-xl p-3 font-bold flex flex-wrap'>
                <span className='text-slate-500'>Home-</span>
                <span className='text-slate-700'>X</span>
            </h1>
            <form className='bg-slate-100 flex items-center rounded-lg '>
                <input
                    type='text'
                    placeholder='Search...'
                    className='rounded-lg p-3 focus:outline-none w-24 sm:w-64'
                />
                <FaSearch className='text-slate-700'/>
            </form>
            <ul className='flex gap-4'>
                <Link to='/'>
                    <li className='hidden sm:inline-block text-slate-700 hover:underline'>Home</li>
                </Link>
                <Link to='/about'>
                    <li className='hidden sm:inline-block text-slate-700 hover:underline'>About</li>
                </Link>
                <Link to ='/profile'>
                {currentUser ? (
                    <img src={currentUser.avatar} alt='profile' className ='rounded-full h-7 w-7 object-cover'/>
                ) : (
                    <li className=' sm:inline-block text-slate-700 hover:underline'>Sign In</li>
                )}
                </Link>
            </ul>
        </div>
    </header>
  )
}
