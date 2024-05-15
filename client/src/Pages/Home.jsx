import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/blogs")
      .then((response) => setBlogs(response.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="flex justify-center items-center space-y-4" >
      <div className="rounded overflow-hidden shadow-lg max-w-screen-md mb-4  ">        
         <ul className="px-6 py-4">
          {blogs.map((blog) => (
            <li key={blog._id}>
              <h2 className="font-bold text-xl ">{blog.title}</h2>
              <img src={blog.image} alt={blog.title} className="w-full " />
              <h2 className="text-xs mb-4">{blog.author}</h2>
              <h2 className="text-l mb-16">{blog.content}</h2>
            </li>
            
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
