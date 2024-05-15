import React, {  useState } from 'react';
import {  useNavigate } from 'react-router-dom';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const  navigate = useNavigate();
    
    const login = async () => {
        try {
            const response = await fetch('http://localhost:4000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            const{token} = data;
            setToken(token);
            localStorage.setItem('token', token);
            localStorage.setItem('username', username);
            window.location.href = '/';
                    

           
           
        } catch (error) {
            console.error('Login error:', error.message);
            
    };
    

}

  return (
    <form className="max-w-md mx-auto bg-white rounded-md shadow-md overflow-hidden m-10 justify-center" onSubmit={login}>
    <h1 className='text-2xl font-semibold mb-4 text-center'>Login</h1>
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
      <button className=' bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none m-2 ml-24 w-3/6 '>Login</button>
  </form>
  )
}

export default Login
