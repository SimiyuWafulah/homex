import React from 'react'
import {GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase'

export default function Oauth() {
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const auth = getAuth(app)

      const result = await signInWithPopup(auth, provider)
      const res = await fetch('http://localhost:3000/api/auth/google', {
        method:'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: result.user.displayName, email: result.user.email, photo: result.user.photoURL})
      })
      const data = await res.json()
    } catch (error) {
      console.log('could not sign in with google', error)
    }
  }

  return (
    <button 
    onClick={handleGoogleClick}
    className='bg-red-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80 uppercase'
    >
    Continue with Google
    </button>
  )
}
