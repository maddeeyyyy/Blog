import React, {useEffect, useState } from 'react'
import axios from 'axios';


const Profile = () => {
    const[post, setPosts] = useState([]);
    const [username, setUsername] = useState(localStorage.getItem("username"));

    useEffect(() => {
      const fetchPosts = async () => {
      axios.get(`http://localhost:4000/blogs/${username}`)
      .then((response) => setPosts(response.data))
      .catch(error => {
        console.error('Error fetching posts: ', error);
      })
    };
    fetchPosts();

     
  }, [username]);
  

  return (
    <div className="flex justify-center items-center space-y-4">
      <div className="rounded overflow-hidden shadow-lg max-w-screen-md mb-4  ">
      <h1 className='m-10 text-black text-4xl justify-center ml-72'>{username}</h1>
        {post.map((blog, username) => {
          return(
          <div key={username}>
            <h2 className="font-bold text-xl ">{blog.title}</h2>
              <img src={blog.image} alt={blog.title} className="w-full " />
              <h2 className="text-xs mb-4">{blog.author}</h2>
              <h2 className="text-l mb-16">{blog.content}</h2>
            </div>
          )
        })}
      </div>
            
        </div>
    
  )
}

export default Profile
