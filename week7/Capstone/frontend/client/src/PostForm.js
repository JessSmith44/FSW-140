import React, { useState } from "react";
import axios from 'axios'

function PostForm({addPost}){
  const initalInputs = {text: ""}
  const [inputs, setInputs] = useState(initalInputs);
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) => {
    var {value, title, description, img} = e.target

    setInputs({
      ...inputs,
      [title]: value,
      [description] : value,
      [img]: value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(inputs)
    if(inputs.text === ''){
      let msg = 'Oh no! post is empty!';
      setErrorMessage(msg)
      return;
    } else {
      addPost(inputs.text);
      setInputs(initalInputs);
    }
    // console.log(addPosts)
  }

  return(
    <form>
      <input 
      type={"text"} 
      name={"title"} 
      placeholder={"Title"}
      value={inputs.text} 
      onChange={handleChange} 
      required="required"/> {errorMessage}

      <input 
      type={"text"} 
      name={"description"} 
      placeholder={"Description"}
      value={inputs.text} 
      onChange={handleChange} 
      required="required"/> {errorMessage}

<input 
      type={"file"} 
      name={"img"} 
      value={inputs.img} 
      onChange={handleChange} 
      required="required"/> {errorMessage}

      <button type="submit" className="addbtn" onClick={handleSubmit}>Add</button>
    </form>
  )
}

export default PostForm;