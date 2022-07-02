import { Link } from 'react-router-dom';

const Nav = ( { search, setSearch, handleChange } ) => {
    return(
        <nav className="Nav">
            <form className="searchForm" onChange={handleChange}>
                <input
                    id='search'
                    type='text'
                    placeholder="Search Posts"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>
            <ul>
                <li> <Link to='/'> Home </Link> </li>
                <li> <Link to='/post'> Post </Link> </li>
            </ul>
        </nav>
    )
}

export default Nav