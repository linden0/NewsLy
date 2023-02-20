import React, { useState } from 'react';
import './api.css'

import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup, 
} from 'react-simple-maps';

import { Tooltip } from 'react-tooltip';
import { useNavigate } from 'react-router-dom';

const geoUrl =   "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"

//Map could also use some styling, currently the theme of the website and the map don't match

function API() { 
  const [content, setContent] = useState("");
  let navigate = useNavigate();


  function handleClick() {
    // This click function needs some preprocesing
    //   1. You need to check if the selected country is available (not all countries are supported by API)
    //     a. So you'll probably need access to the "countries" list in search.js. Copying it again to this file is bad code
    //        so maybe you can put the list in an external file and import it to both API.js and Search.js
    //     b. if country not available, you should send an alert to user via alert() or a custom dynamic error div like in Search.js

    console.log(content); // the selected country (selectedCountry is better state name)
    navigate('/search', { state: { data: content } });
  }

  return (
    <div className="map" data-tip="">
      <ComposableMap data-tip="" geography={geoUrl}>
        <ZoomableGroup zoom={1}>{" "}
          <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography 
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {
                      const { name } = geo.properties;
                      setContent(`${name}`);
                    }}
                    onMouseLeave={() =>{
                      setContent("");
                    }}
                    onClick={handleClick}
                    style={{
                      hover: {
                        fill: "#F53",
                        outline: "none",
                      },
                    }}
                  />
                ))
              }
            </Geographies>
            <Tooltip>{content}</Tooltip>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
}

export default API;