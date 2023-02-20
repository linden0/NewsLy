import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AutoComplete, Select } from 'antd';
import "./search.css";
import Input from 'antd/es/input/Input';

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
  
const countries = [
    { key: "Argentina", ISO: "ar" },
    { key: "Austria", ISO: "at" },
    { key: "Australia", ISO: "au" },
    { key: "Belgium", ISO: "be" },
    { key: "Bulgaria", ISO: "bg" },
    { key: "Brazil", ISO: "br" },
    { key: "Canada", ISO: "ca" },
    { key: "Switzerland", ISO: "ch" },
    { key: "China", ISO: "cn" },
    { key: "Colombia", ISO: "co" },
    { key: "Cuba", ISO: "cu" },
    { key: "Czech Republic", ISO: "cz" },
    { key: "Germany", ISO: "de" },
    { key: "Egypt", ISO: "eg" },
    { key: "France", ISO: "fr" },
    { key: "United Kingdom", ISO: "gb" },
    { key: "Greece", ISO: "gr" },
    { key: "Hong Kong", ISO: "hk" },
    { key: "Hungary", ISO: "hu" },
    { key: "Indonesia", ISO: "id" },
    { key: "Ireland", ISO: "ie" },
    { key: "Israel", ISO: "il" },
    { key: "India", ISO: "in" },
    { key: "Italy", ISO: "it" },
    { key: "Japan", ISO: "jp" },
    { key: "South Korea", ISO: "kr" },
    { key: "Lithuania", ISO: "lt" },
    { key: "Latvia", ISO: "lv" },
    { key: "Mexico", ISO: "mx" },
    { key: "Malaysia", ISO: "my" },
    { key: "Nigeria", ISO: "ng" },
    { key: "Netherlands", ISO: "nl" },
    { key: "Norway", ISO: "no" },
    { key: "New Zealand", ISO: "nz" },
    { key: "Philippines", ISO: "ph" },
    { key: "Poland", ISO: "pl" },
    { key: "Portugal", ISO: "pt" },
    { key: "Romania", ISO: "ro" },
    { key: "Serbia", ISO: "rs" },
    { key: "Russia", ISO: "ru" },
    { key: "Saudi Arabia", ISO: "sa" },
    { key: "Sweden", ISO: "se" },
    { key: "Singapore", ISO: "sg" },
    { key: "Slovenia", ISO: "si" },
    { key: "Slovakia", ISO: "sk" },
    { key: "Thailand", ISO: "th" },
    { key: "Turkey", ISO: "tr" },
    { key: "Taiwan", ISO: "tw" },
    { key: "Ukraine", ISO: "ua" },
    { key: "United Arab Emirates", ISO: "ae" },
    { key: "United States", ISO: "us" },
    { key: "Venezuela", ISO: "ve" },
    { key: "South Africa", ISO: "za" },
  ]
const APIKEY = "1ddefb4425654c06a39cd9dff53a36ff"

function Search() {
    const location = useLocation();
    const [keyword, setKeyword] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [error, setError] = useState("");
    const [articles, setArticles] = useState(null);

    if (location.state) {
      console.log(location.state.data);
      //location.state.data is the passed country, set the selectedCountry state here but make sure it's iso code, not name of country
    }

    const handleKeywordChange = (event) => {
      setKeyword(event.target.value);
    };
  
    const handleCountrySelect = (value) => {
      const selected = countries.find((country) => country.key === value);
      setSelectedCountry(selected ? selected.ISO : "");
    };
    
    const handleCategorySelect = (value) => {
      if (value === "Select a category") {
        setSelectedCategory(null);
      } else {
        setSelectedCategory(value);
      }
    }

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
        let APIBASE = "https://newsapi.org/v2/top-headlines?";
        let APIURL = APIBASE;
        let numParams = 0;
        if (keyword) {numParams += 1}
        if (selectedCountry) {numParams += 1}
        if (selectedCategory) {numParams += 1}

        let countryInput = document.getElementById('countryInput').value;
        if (numParams === 0 && !countryInput) {
          setError("Please enter at least one parameter")
        } else if (numParams === 0 && countries.filter(country => country.key===countryInput).length === 0) {
          setError("Please select a valid country or delete your input.");
        } else {
          setError("");
          if (keyword) { APIURL += "&q=" + keyword }
          if (selectedCountry) { APIURL += "&country=" + selectedCountry }
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

          <AutoComplete
              placeholder="Countries"
              id="countryInput"
              filterOption={(inputValue, option) =>
              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
              }
              onSelect={handleCountrySelect}
              onChange={handleCountrySelect}
              className='input-bar'
          >
          {countries.map((country) => (
            <AutoComplete.Option key={country.ISO} value={country.key}>
              {country.key}
            </AutoComplete.Option>
          ))}
          </AutoComplete>

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