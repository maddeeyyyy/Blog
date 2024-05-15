import React, {useState } from 'react'
import axios from "axios";

const Create = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState(localStorage.getItem("username"));
  const [content, setContent] = useState("");
  const [image, setImage] = useState('');
  
  
    


  const create = async () => {


    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('content', content)
    formData.append('image', image);

    try {

      const response = await axios.post('http://localhost:4000/create', formData, {
        headers: {

          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      alert('success');
      // Handle success or redirect
    } catch (error) {
      alert('failed')
      console.error('Error uploading image:', error);
    }


  }


  return (
    <div className='max-w-xl mx-auto'>
      <form onSubmit={create} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
        <h1 className='text-xl font-semibold mb-4'>Create a post </h1>
        <h2 className='block text-gray-700 text-sm font-bold mb-2 ml-3'> title</h2>
        <input type='text' placeholder='title' value={title} onChange={e => setTitle(e.target.value)} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline m-2'  />
        <h2 className='block text-gray-700 text-sm font-bold mb-2 ml-3'>Author</h2>
        <input type='text' placeholder='Author' value={author} onChange={e => setAuthor(e.target.value)} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline m-2' disabled />
        <h2 className='block text-gray-700 text-sm font-bold mb-2 ml-3'>Content</h2>
        <input type='text' placeholder='summary' value={content} onChange={e => setContent(e.target.value)} className='shadow appearance-none border rounded w-full  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-36 m-2  ' />

        <label className='block text-gray-700 text-sm font-bold mb-2 ml-3'>
          Image URL:</label>
        <input
          type="text"
          value={image}
          onChange={e => setImage(e.target.value)}
          placeholder="Enter image URL"
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline m-2'
        />


        <button className=' bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none m-2 ml-24 w-3/6' >Submit</button>
      </form>
    </div>
  )
}

export default Create
