import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect,setRedirect] = useState(false);
  

  
  async function register(ev) {
    
    const response = await fetch('http://localhost:4000/register', {
      method: 'POST',
      body: JSON.stringify({username,password}),
      headers: {'Content-Type':'application/json'},
    });
    if  (response.ok) {
     alert("signed in ")
     setRedirect(true);
    } else {
      alert('registration failed');
    }
  }
  if(redirect) {
    return <Navigate to={'/login'} />
  }

  return (
    <form className="max-w-md mx-auto bg-white rounded-md shadow-md overflow-hidden m-10" onSubmit={register}>
      <h1 className='text-2xl font-semibold mb-4 text-center m-2'>Register</h1>
      <label className='block text-gray-700 m-2 ml-4'>Username</label>
      <input type="text"
             placeholder="username"
             value={username}
             onChange={ev => setUsername(ev.target.value)}
             className='shadow appearance-none border rounded ml-4 w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline m-2'  />
      <label className='block text-gray-700 m-2 ml-4'>Password</label>       
      <input type="password"
             placeholder="password"
             value={password}
             onChange={ev => setPassword(ev.target.value)}
             className='shadow appearance-none border rounded ml-4 w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline m-2'/>
      <button className=' bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none m-2 ml-24 w-3/6 '>Register</button>
    </form>
  )
}

export default Register
