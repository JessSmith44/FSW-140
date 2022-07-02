import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'


function PostForm({addPost, setEditToggle}) {
  const initalInputs = {text: ""}
  const [inputs, setInputs] = useState(initalInputs);
  const [file, setFile] = useState('')
  const [description, setDescription] = useState("")
  const [title, setTitle] = useState("")
  const [posts, setPosts] = useState([])

  useEffect(() => {
   getData()
  }, [])

  const handleSubmit = async event => {
    event.preventDefault()
    const cloud_name = 'dwthknilv'
    const preset = 'presetCloud'
    const url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;
    // console.log(file)
    // console.log(file[0])
      const data = new FormData()
      data.append("file", file[0]);
      data.append("upload_preset", preset);
    axios.post(url, data).then(res => {
      // console.log(res)
        const postInfo = {
            Title: title,
            Description: description,
            ImgURL: res.data.secure_url
          }
         axios.post('/InsertNewRow', postInfo).then(res => {
          console.log(res)
          getData()
         })
        
      })

  
    // fetch('https://api.cloudinary.com/v1_1/dwthknilv/image/upload', {
    //   method: 'POST',
    //   body: data
    // })
    // .then(response => response.json())
    // .then(data => console.log(data));
  } 
  
  //why is this line throwing an error? 
    //how is insert new row throwing a cannot proxy error 500? 
    //endpoints are good, why....?
 const getData = async() => {
    let results = await axios.get('/GetPosts')
    // console.log(results.data)
    setPosts(results.data)
  }

  // const deletePost = id => {
  //   axios.delete(`/DeletePosts/${PostID}`)
  //   .then(res => {
  //     setPosts(prevPosts => prevPosts.filter(post => post._id !== PostID))
  //   })
  //   const tempPost = [...posts];
  //   const newPosts = tempPost.filter((posts) => posts._id !== id);
  //   setPosts(newPosts);
  // }

  // const editItem = (updates, itemId) => {
  //   axios.put(`/recycledItems/${itemId}`, updates)
  //   .then(res => {
  //     setRecycle(prevItems => [...prevItems].map(item => {
  //       return(item._id === itemId ? res.data : item)}))
  //   })
  //   .catch(err => console.log(err))
  // }


  return (
    <div className="postForm">
      
      <form onSubmit={handleSubmit}>
        <input 
        onChange={e => setTitle(e.target.value)}
          type={'text'} 
          name={"title"} 
          placeholder={"Title"} 
          required="required"/>

        <input
          onChange={e => setDescription(e.target.value)} 
          type="text"
          placeholder="description"
        ></input>

        <input
          filename={file} 
          onChange={e => setFile(e.target.files)} 
          type="file" 
          accept="image/*"
        ></input>
        
        <button type="submit">Submit</button>
      </form>
      <main> 
        {posts.map(post => (
        <div className='display' key={post.PostID}>
          <figure >
            <img src={post.ImgURL} alt={post.Description}></img>
            <figcaption>{post.Title}</figcaption>
            <p>{post.Description}</p>
            {/* <button className="deletebtn" onClick={() => deletePost(post.id)}>X</button>
            <button className="editbtn" onClick={() => setEditToggle()}> Edit </button> */}
          </figure>
          </div>
          )
        )}
      </main>
    </div>
  )
}

export default PostForm



