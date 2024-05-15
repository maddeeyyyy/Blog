import React, { useState } from "react";
import { Link } from "react-router-dom";


const Headers = () => {

  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [username, setUsername] = useState(localStorage.getItem("username") || "");

  
  

  const handleLogout = () =>{
    setToken('');
    setUsername('')
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = '/';
  }

  
 
  return (
    <header className="flex justify-between items-centre bg-black text-white">

    <Link to="/" className="flex items-center m-2 p-2 text-white   hover:text-gray-400">MyBlog</Link>
    
    <nav className="flex items-center m-2 p-2 text-white ">
      {!token ? (
        <>
         <Link to="/login" className="m-2 p-2 hover:text-gray-400" >Login</Link>
         <Link to="/register" className="m-2 p-2 hover:text-gray-400">Register</Link>
         </>

      ):(
        <>
        <Link to="/create" className="m-2 p-2 hover:text-gray-400">Create new post</Link>
        <Link to={`/profile/${username}`} className="m-2 p-2 hover:text-gray-400">{username}</Link>
        <button onClick={handleLogout} className="m-2 p-2 hover:text-gray-400">Logout</button>

        </>
      )}
    
        
          
          
        
         
        
     
    </nav>
  </header>
  );
};

export default Headers;
