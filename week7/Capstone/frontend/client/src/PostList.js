import Post from "./Post";
import PostForm from './PostForm';

function PostList(props) {
//  console.log(props)
    return ( 
    <div className="Postapp stack-large">
      <h1>Welcome to PhotoShare!</h1>
      < PostForm addPost={props.addPost} />
      <ul className="Post-list stack-large stack exception" aria-labelledby="list-heading">
        {props.Post?.map((Post) => {
          return (

        // Think about useEffect and where it should go.

        < Post Post={Post} key={Post.id} deletePost={props.deletePost} complete={props.complete} edit={props.editTodos} />
          )        
          })}
      </ul>
    </div>
    );
  }

export default PostList;