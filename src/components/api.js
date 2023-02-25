import React, { useState, useEffect } from 'react';
import './api.css'
import countries from './countries'
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup, 
} from 'react-simple-maps';
import { useNavigate } from 'react-router-dom';
const geoUrl =   "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"

//Map could also use some styling, currently the theme of the website and the map don't match

function API() { 
  const [content, setContent] = useState("");
  const [hoverCountry, setHoverCountry] = useState("Hovered State!")
  let navigate = useNavigate();


  function handleClick() {
    // This click function needs some preprocesing
    //   1. You need to check if the selected country is available (not all countries are supported by API)
    //     a. So you'll probably need access to the "countries" list in search.js. Copying it again to this file is bad code
    //        so maybe you can put the list in an external file and import it to both API.js and Search.js
    //     b. if country not available, you should send an alert to user via alert() or a custom dynamic error div like in Search.js
    console.log(content)
    var selected = countries.find((country) => country.key === content);
    console.log(selected)
    if (!selected) {
      alert("Sorry, this country is not available yet");
    } else {
      navigate('/search', { state: { data: selected } });
    }
  }

  const handleHover = (geo) => {
    const NAME = geo.properties.name;
    setHoverCountry(NAME);
  };

  return (
    <div className="map">
      <div>
        {hoverCountry}
      </div>
      <ComposableMap geography={geoUrl}>
        <ZoomableGroup zoom={1}>{" "}
          <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    style={{
                      hover: {
                        fill: "green",
                        outline: "none",
                      },
                    }}
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseOver={() => handleHover(geo)}
                    onMouseEnter={() => {
                      const { name } = geo.properties;
                      setContent(`${name}`);
                    }}
                    onMouseLeave={() =>{
                      setContent("");
                    }}
                    onClick={handleClick}

                  />
                ))
              }
            </Geographies>

          </ZoomableGroup>
      </ComposableMap>
    </div>
  );
}

export default API;