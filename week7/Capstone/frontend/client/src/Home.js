import Feed from './Feed';

const Home = ({ posts, searchResults }) => {
    
     return(
        <main className="Home">
                <>
            {searchResults.length ? 
            <Feed posts={searchResults} /> :
                posts.length ? 
                <Feed posts={posts} />
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