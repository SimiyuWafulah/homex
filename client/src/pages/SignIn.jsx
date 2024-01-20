import React, { useState } from 'react'
import Oauth from '../components/Oauth'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart,signInSuccess,signInFailure } from '../redux/user/userSlice';



export default function SignIn() {
  const [formData, setFormData] = useState({});
  const {loading, error} = useSelector((state) => state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id] : e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart())
      const res = await fetch('http://localhost:3000/api/auth/signin', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message))
        toast.error(data.message);
        return
      }
      dispatch(signInSuccess(data));
      toast.success('Sign in Success');
      navigate('/')
    } catch (error) {
      dispatch(signInFailure(error.message))
      toast.error('An error occurred, please try again');
    }
  }

  return (
    <div className='max-w-lg mx-auto p-3'>
     <h1 className='text-3xl font-semibold text-center my-7'>Sign In</h1>
     <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
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
       {loading? 'Loading' : 'Sign In'}
      </button>
      <Oauth/>
     </form>
     <div className='flex gap-2 mt-5'>
      <p>Dont have an account?</p>
      <Link to ='/signup'>
        <span className='text-blue-700'>Sign Up</span>
      </Link>
     </div>
     <ToastContainer
      position="top-right" // Set the position of the toasts
        autoClose={5000} // Auto close the toasts after 5 seconds
        hideProgressBar={false} // Display or hide the progress bar
        newestOnTop={false} // Display the newest toast on top
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ // Customize the style of the ToastContainer
          zIndex: 1000,
          fontSize: '1rem'
        }}
     />
    </div>
  )
}
