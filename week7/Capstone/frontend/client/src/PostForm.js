import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

function PostForm({addPost}) {
  const initalInputs = {text: ""}
  const [inputs, setInputs] = useState(initalInputs);
  const [file, setFile] = useState()
  const [description, setDescription] = useState("")
  const [posts, setPosts] = useState([])

  // useEffect(() => {
  //   (async() => {
  //     const result = await axios.get('/GetPosts')
  //     setPosts(result.data.posts)
  //   }) ()
  // }, [])

  // const submit = async event => {
  //   event.preventDefault()
  //   const data = new FormData()
  //   data.append('image', file)
  //   data.append('description', description)
  //   const result = await axios.post('/InsertNewRow', data)
  //   setPosts([result.data, ...posts])
  // }

  const submit = (newItem) => {
    axios.post('/sqlRoutes', newItem)
      .then(res => {
        setPosts(prevItems => [...prevItems, res.data])
      })
      .catch(err => console.log(err))
  }
  const handleSubmit= (e) => {
    e.preventDefault();
    submit(inputs, file, description, posts)
    setInputs(initalInputs)
  }

  return (
    <div className="postForm">
      
      <form onSubmit={handleSubmit}>
        <input 
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
          onChange={e => setFile(e.target.files[0])} 
          type="file" 
          accept="image/*"
        ></input>
        
        <button type="submit">Submit</button>
      </form>
      <main>
        {posts.map(post => (
          <figure key={post.id}>
            <img src={post.image_url}></img>
            <figcaption>{post.description}</figcaption>
          </figure>
        ))}
      </main>
    </div>
  )
}

export default PostForm



