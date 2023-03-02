import React from 'react'
import './about.css'

function About() {
  const facebook_link = "https://www.facebook.com/dscucdavis/?tsid=0.4421489847485003&source=result";
  const linkedin_link = "https://www.linkedin.com/company/developer-student-club-uc-davis";
  const instagram_link = "https://www.instagram.com/dsc_ucdavis/?igshid=5rwwhctkrxg9";
  const youtube_link = "https://www.youtube.com/channel/UCBiu9gMt5vFI8kLChZ7z8Nw";
  const discord_link = "https://discord.com/invite/wTZ5V9VJwG";

  return (
    <div className='about'>
        <div className='wrapper-top vertical'>
          <div className='container'>
            <div>
              <img className='gdsc' src={require("../img/gdsc_banner.png")} />
            </div>
            <div className='icons'>
              <a href={facebook_link} target="_blank" rel="noreferrer"><img src={require("../img/facebook.png")} alt="GDSC Facebook"/></a>
              <a href={linkedin_link} target="_blank" rel="noreferrer"><img src={require("../img/linkedin.png")} alt="GDSC Linkedin"/></a>
              <a href={instagram_link} target="_blank" rel="noreferrer"><img src={require("../img/instagram.png")} alt="GDSC Instagram"/></a>
              <a href={youtube_link} target="_blank" rel="noreferrer"><img src={require("../img/youtube.png")} alt="GDSC Youtube"/></a>
              <a href={discord_link} target="_blank" rel="noreferrer"><img src={require("../img/discord.png")} alt="GDSC Discord"/></a>
            </div>
          </div>

        </div>

        <div className='wrapper-middle'>
          <div>
            <h1 className='center'>About NewsLy</h1>
          </div>
          <div className='info-row container'>
            <div className='info-card'>
              <div className='info-graphic'>🎯</div>
              <div className='info-text'>
                <h3 className='top-description'>Purpose</h3>
                <p className='description'>NewsLy is all about personalization. Unlike other sources where the same trending stories are crammed in the international news section, NewsLy allows you to filter by country, allowing you to be more focused and efficient with your news-reading endeavors.</p>
              </div>
            </div>

            <div className='info-card'>
              <div className='info-graphic'>🔍</div>
              <h3 className='top-description'>Features</h3>
              <p className='description'>We offer multiple search filters, like keywords, country, and category (business, entertainment, etc.) so you can take full control of your article reading experience. Read articles you care about, and let NewsLy throw out the rest.</p>
            </div>
          </div>

          <div className='info-row container'>
            <div className='info-card'>
              <div className='info-graphic'>🧠</div>
              <div className='info-text'>
                <h3 className='top-description'>Benefits</h3>
                <p className='description'>By filtering news for each country, NewsLy offers you the opportunity to broaden your perspective. Our regional articles allow for a deeper understanding of the state of each country, and the chance to discover rich articles that have slipped through the cracks of mainstream media.</p>
              </div>
            </div>

            <div className='info-card'>
              <div className='info-graphic'>🖥️</div>
              <h3 className='top-description'>Technologies</h3>
              <p className='description'>NewsLy was built primarily with React.js and CSS. Our interactive map is implemented using React Simple Maps, and we use the NewsAPI to accumulate articles from sources around the world.</p>
            </div>
          </div>
        </div>



      {/* <div className='right-text about-items'>
        <div className='small-font'>
          <p className='center desc'>Are you tired of being bombarded with random articles when you search for news? Are you looking for a place to find news that accurately fits your needs?
              Our project does so while making it more interactive and fun! With our easy to use hoverable and clickable map, you can click on countries and filter for news in that country's main language.
          </p>
          <p className='center'>Enjoy uninterrupted browsing for news now!</p>
        </div>
        <p className='medium-font icons'>Made with HTML, CSS, and React</p>
        <br />
        <p className='large-font icons'>In collaboration with the UC Davis Google Developer Student Club</p>

      </div> */}
    </div>
  );
};

export default About;