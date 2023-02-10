import React, { Link } from 'react-router-dom';
import "./navbar.css"; 

function NavBar() {

    return (
        <div className='navbar'>
            <div>
                <Link to="/" className='navitem brand'>
                    📰 Country News App
                </Link>
            </div>
            <div className='right-nav'>
                <Link to="/API"  className='navitem'>API</Link>
                <Link to="/search" className='navitem'>Search</Link>
                <Link to="/about" className='navitem'>About</Link>
            </div>
        </div>
    )
}

export default NavBar;