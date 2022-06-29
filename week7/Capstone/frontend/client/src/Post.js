import { useState } from 'react';
import PostForm from './PostForm';

function Post({Post, deletePost, complete, edit, addPost}){

    const initalInputs = {text: ""}
    const [inputs, setInputs] = useState(initalInputs);
    const [errorMessage, setErrorMessage] = useState('');
    const [editToggle, setEditToggle] = useState(true);
    

    const handleChange = (e) => {
        var {value, title, description, img} = e.target
    
        setInputs({
          ...inputs,
          [title]: value,
          [description] : value,
          [img]: value
        })
      }
      const handleSubmit = (update) => {
        edit(update, Post.id)
        setEditToggle(prevToggle => !prevToggle)
        // console.log(addPosts)
      }


    return(
        <li className="Post stack-small">
            
            { !editToggle ? 
            <>
            <PostForm addPost={ handleSubmit }/>
            <button className='close-btn'
              onClick={() => setEditToggle(prevToggle => !prevToggle)}>
                Close
            </button>
            </>
            :
            <>
        <div className="checkItem">
          
          <label className="Post-label" htmlFor={"Post-" + Post.id}> {Post.text} </label> 
          
          <button className="deletebtn" onClick={() => deletePost(Post.id)}>X</button>

          <button className="editbtn" onClick={() => setEditToggle(prevToggle => !prevToggle)}> Edit </button>
        
        </div>
            </>
        }

      </li>
    )
  }
  
  export default Post;