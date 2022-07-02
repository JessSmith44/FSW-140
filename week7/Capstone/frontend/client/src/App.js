import './App.css'
import React, { useState, useEffect } from 'react';
import PostList from'./PostList';
import './App.css';
// import { Route, Routes } from 'react-router-dom';
// import Home from './components/Home'
// import Nav from './components/Nav';

function App(){
  
const [Posts, setPost] = useState([]); 
const [disableBtn, setDisableBtn] = useState(false);
// const [search, setSearch] = useState('');
// const [searchResults, setSearchResults] = useState([]);

// const handleChange = (e) => {
//   setSearch(e.target.value);

// const filteredResults = Posts.filter(post => 
//   post.title.toLowerCase().includes(e.target.value.toLowerCase())
//   );
//   setSearchResults(filteredResults);
// }

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
      {/* <Nav search={search} setSearch={setSearch} handleChange={handleChange}/>
      <Routes>
        <Route path='/*' element={<Home posts={Posts} searchResults={searchResults} />} />
      </Routes> */}
      < PostList Posts={Posts} key={Posts.id} deletePost={deletePost} addPost={addPost} editPosts={editPosts} />
    </div>
  )
}

export default App;