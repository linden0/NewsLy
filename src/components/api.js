import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { csv } from "d3-fetch";
import { scaleLinear } from "d3-scale";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule
} from "react-simple-maps";
import countries from "./countries";

// Map color settings
const geoUrl = "/features.json";

const colorScale = scaleLinear()
  .domain([0.29, 0.68])
  .range(["#f0f6fc", "#0B4F6C"]);

function API() {
  const [data, setData] = useState([]);
  const [hoveredCountry, setHoveredCountry] = useState("‎"); //set to invisible character because empty string will remove hovered country tip, causing glitching
  const navigate = useNavigate();

  useEffect(() => {
    csv(`/vulnerability.csv`).then((data) => {
      setData(data);
    });
  }, []);

  function handleClick(selectedCountry) {
    console.log("Map Selection: ", selectedCountry);
    var selected = countries.find((country) => country.key === selectedCountry);
    if (!selected) {
      alert("Sorry, this country is not available yet")
    } else {
      navigate('/search', {state: { data: selected }})
    }
  }

  return (
    <div>
      <p className="center">{hoveredCountry}</p>
      <ComposableMap
        projectionConfig={{
          rotate: [-10, 0, 0],
          scale: 147
        }}
        width={950}
        height={415}

      >
        <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
        <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
        {data.length > 0 && (
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const d = data.find((s) => s.ISO3 === geo.id);
                return (
                  <Geography
                    style={{
                      hover: {
                        fill: "#0B4F6C",
                        outline: "none",
                      },
                      pressed: {
                        fill: "#D6D6DA",
                        outline: "none" // disable outline
                      },
                      default: {
                        outline: "none"
                      }
                    }}
                    key={geo.rsmKey}
                    geography={geo}
                    fill={d ? colorScale(d["2017"]) : "#F5F4F6"}
                    onMouseOver={() => setHoveredCountry(geo.properties.name)}
                    onMouseLeave={() => setHoveredCountry("‎")}
                    onClick={() => handleClick(geo.properties.name)}
                  />
                );
              })
            }
          </Geographies>
        )}
      </ComposableMap>
    </div>
  );
};

export default API;
