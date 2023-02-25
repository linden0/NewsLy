import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AutoCompvare, Select, Input } from 'antd';
import "./search.css";
import countries from "./countries"

const categories = [
  {value: "Select a category", text: "Select a category"},
  {value: "business", text: "Business"},
  {value: "entertainment", text: "Entertainment"},
  {value: "general", text: "General"},
  {value: "health", text: "Health"},
  {value: "science", text: "Science"},
  {value: "sports", text: "Sports"},
  {value: "technology", text: "Technology"}
];
  
const APIKEY = "1ddefb4425654c06a39cd9dff53a36ff"

function Search() {
  const location = useLocation();
  const [keyword, setKeyword] = useState("");
  const [selectedCountry, setSelectedCountry] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");
  const [error, setError] = useState("");
  const [articles, setArticles] = useState(null);

  useEffect(() => {
    if (location.state && location.state.data) {
      setSelectedCountry(location.state.data);
    }
  }, [location])

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleCountrySelect = (value) => {
    const selected = countries.find((country) => country.key === value);
    setSelectedCountry(selected);
  };
  
  const handleCategorySelect = (value) => {
    if (value === "Select a category") {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(value);
    }
  }

  // Convert UTC time to readable date
  const utcToReadable = (UTCtime) => {
    const date = new Date(UTCtime);
    const readableDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
    return readableDate;
  }

  const fetchNews = () => {
    var APIBASE = "https://newsapi.org/v2/top-headlines?";
    var APIURL = APIBASE;
    // Count how many parameters user has entered
    var numParams = 0;
    if (keyword) {numParams += 1}
    if (selectedCountry) {numParams += 1}
    if (selectedCategory) {numParams += 1}
    // Alert errors, otherwise fetch data
    var countryInput = document.getElementById('countryInput').value;
    if (numParams === 0 && !countryInput) {
      setError("Please enter at least one parameter")
    } else if (numParams === 0 && countries.filter(country => country.key===countryInput).length === 0) {
      setError("Please select a valid country or delete your input");
    } else {
      setError("");
      // Build API url using parameters
      if (keyword) { APIURL += "&q=" + keyword }
      if (selectedCountry) { APIURL += "&country=" + selectedCountry.ISO }
      if (selectedCategory) { APIURL += "&category=" + selectedCategory }
      APIURL += "&apiKey=" + APIKEY
      APIURL = APIURL.substring(0,APIBASE.length) + APIURL.substring(APIBASE.length+1)
      fetch(APIURL)
        .then((response) => response.json())
        .then((data) => {
          setArticles(data.articles);
        })
        .catch((error) => {
            console.error(error)
            setError("Internal error 500");
        });
    }
  }

  function handleClick(url) {
    window.open(url, '_blank');
  }

  return (
    <div className='search-wrapper'>
      <div className='search-bar'>
        <Input
          className='input-bar'
          type="text"
          placeholder="Keywords"
          value={keyword}
          onChange={handleKeywordChange}
        />

        <AutoCompvare
            placeholder="Countries"
            id="countryInput"
            filterOption={(inputValue, option) =>
            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            }
            onSelect={handleCountrySelect}
            onChange={handleCountrySelect}
            className='input-bar'
            value={selectedCountry}
        >
        {countries.map((country) => (
          <AutoCompvare.Option key={country.ISO} value={country.key}>
            {country.key}
          </AutoCompvare.Option>
        ))}
        </AutoCompvare>

        <Select
            options={categories}
            placeholder="Select a category"
            onChange={handleCategorySelect}
            className="input-bar"
        />

        <button className="submit-btn" onClick={fetchNews}>Submit</button>
      </div>
      
      { error && <div className='error'>{error}</div>}
      <div className='news-data'>
        {!articles ? (
          <div>
            <h1>No Articles Found</h1>
            <p>Please enter at least one search parameter to search for articles. If no results show, you can loosen the search by removing parameters.</p>
          </div>
        ) : (
          <div>
            {articles.map((article) => (
              <div className='card' onClick={() => handleClick(article.url)}>

                <div className='card-image'>
                  <img src={article.urlToImage} className='card-img' alt=''/>
                </div>

                <div className='card-info'>
                  <p>{article.author}</p>
                  <p>Posted {utcToReadable(article.publishedAt)}</p>
                </div>
                
                <h3>{article.title}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;