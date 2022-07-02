import './App.css'
import React, { useState, useEffect } from 'react';
import PostList from'./PostList';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from '/Home.js';
import Nav from './Nav';

function App(){
  
const [Posts, setPost] = useState([]); 
const [disableBtn, setDisableBtn] = useState(false);

  const addPost = text =>{
    var newPost = {text: text, isComplete: false}
    const updatedPosts = [...Posts, newPost];
    setPost(updatedPosts);
  }

  const deletePost = id => {
    const tempPost = [...Posts];
    const newPosts = tempPost.filter((Posts) => Posts.id !== id);
    setPost(newPosts);
  }

 const editPosts = (update, id) => {
   const tempPost = [...Posts];
   const editIndex = tempPost.findIndex(Posts => Posts.id === id); //finding specific index of selected Post
   tempPost[editIndex].text = update;
   setPost(tempPost);
 }

  return(
    <div>
      <Nav></Nav>
        <Routes>
          <Route path='/*' element={<Home/>} /> </Routes>
          <Route path='/GetPosts' element={< PostList Posts={Posts} key={Posts.id} deletePost={deletePost} addPost={addPost} editPosts={editPosts} />} />
    </div>
  )
}

export default App;