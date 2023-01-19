import React, { Link } from 'react-router-dom';
import "./home.css";


function Home() {

    return (
        <div className="home">
            <div className='left-graphic'>
                <img src={require("../img/globe.png")} width="350px" alt="globe" />

            </div>
            <div className='right-intro'>
                <div className='center medium-width home-items'>
                    <h1>Welcome to the Country News App!</h1>
                    <p className='lg-font gray'>Explore the local news of countries around the world, and filter articles to find the one you want.</p>
                    <Link to="/api">
                        <button className='button-filled'>Get Started</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Home;