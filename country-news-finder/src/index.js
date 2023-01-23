import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import './styles.css'
import Navbar from "./Navbar";
import Home from "./pages/Home";
import About from "./pages/About";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container"> 
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.querySelector('#root'));