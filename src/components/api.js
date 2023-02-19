// https://www.react-simple-maps.io/docs/getting-started/

// Handling clicks: 
// https://reactjs.org/docs/handling-events.html
// https://github.com/zcreativelabs/react-simple-maps/issues/165

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

function API(props) { 
  const [content, setContent] = useState("");
  let navigate = useNavigate();

  console.log(content);

  function handleClick() {
    navigate('/search', {state: { data: content}});
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