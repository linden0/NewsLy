import React, { Link } from 'react-router-dom';
import "./home.css";


function Home() {

    return (
        <div className="home">
            <div className='left-graphic'>
                <img src={require("../img/globe.png")} width="350px" alt="globe" />

            </div>
            <div className='right-intro'>
                <div className='home-items'>
                    <h1 className='white'>Welcome to NewsLy!</h1>
                    <p className='lg-font white'>Explore the local news of countries around the world, and filter articles to accomodate your specific tastes.</p>
                    <Link to="/api">
                        <button className='button-filled'>Get Started</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Home;