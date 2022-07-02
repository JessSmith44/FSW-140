import PostList from "../PostList"

const Home = ({ posts, searchResults }) => {
    
     return(
        <main className="Home">
                <>
            {searchResults.length ? 
            <PostList posts={searchResults} /> :
                posts.length ? 
                <PostList posts={posts} />
             : 
                <p style={{ marginTop: '2rem' }}>
                    No posts to display.
                </p>
            }
            </>  
        </main>
    )
}

export default Home