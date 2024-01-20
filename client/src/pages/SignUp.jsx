import React, { useState } from 'react'
import Oauth from '../components/Oauth'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id] : e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false)
        setError(data.message);
        toast.error(data.message);
        return
      }
      setLoading(false)
      setError(null);
      toast.success('Account Created Successfully');
      navigate('/signin')
    } catch (error) {
      setLoading(false)
      setError('An error occured please try again', error.message);
      toast.error('An error occurred, please try again');
    }
  }

  return (
    <div className='max-w-lg mx-auto p-3'>
     <h1 className='text-3xl font-semibold text-center my-7'>Sign Up</h1>
     <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <input
        type='text'
        placeholder='username'
        id='username'
        className='border p-3 rounded-lg'
        onChange={handleChange}
      />
      <input
        type='email'
        placeholder='email'
        id='email'
        className='border p-3 rounded-lg'
        onChange={handleChange}
      />
      <input
        type='password'
        placeholder='password'
        id='password'
        className='border p-3 rounded-lg'
        onChange={handleChange}
      />
      <button
      disabled ={loading} 
      className='bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80 uppercase'
      >
       {loading? 'Loading' : 'Sign Up'}
      </button>
      <Oauth/>
     </form>
     <div className='flex gap-2 mt-5'>
      <p>Already have an account?</p>
      <Link to ='/signin'>
        <span className='text-blue-700'>Sign In</span>
      </Link>
     </div>
     <ToastContainer
      position="top-right" 
        autoClose={5000}
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ 
          zIndex: 1000,
          fontSize: '1rem'
        }}
     />
    </div>
  )
}
