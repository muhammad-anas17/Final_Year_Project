import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'



const Books = () => {
    const [books,setBooks] =useState([])
    useEffect(()=>{
        const fetchAllBooks = async ()=>{
            try{
                const res = await axios.get("http://localhost:8800/user")
                setBooks(res.data);
                console.log(res);


            }catch(err){
                console.log(err);
            }

        }
        fetchAllBooks()


    },[])

    const handleDelete = async (id) => {
      try {
        await axios.delete(`http://localhost:8800/user/${id}`);
        window.location.reload();
    
      } catch (err) {
        console.log(err);
      }
    };
    



  return (
    <div>
      <div className='books'>
        {books.map(book => (
            <div className='book'>
                <h1>Name: {book.Name}</h1>
                <p>id: {book.id}</p>
                <h2>email: {book.email}</h2>
                <button className='delete' onClick={()=>handleDelete(book.id)}>Delete</button>
                <button className='update'><Link to={`/update/${book.id}`}>Update</Link></button>
            </div>
        ))}
      </div>

       <button>
        <Link to="/add">Add Records</Link>
      </button> 
    </div>
  )
}

export default Books
