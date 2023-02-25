import './App.css';
import { Routes, Route } from 'react-router-dom';

import NavBar from './components/navbar';
import Home from "./components/home";
import API from "./components/api";
import Search from './components/search';
import About from './components/about';
import NotFoundPage from './components/not_found';

function App() {
  return (
    <div>
      <NavBar/>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/api" element={<API />}/>
        <Route exact path="/search" element={<Search/>}/>
        <Route exact path="/about" element={<About/>}/>

        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </div>

  );
}

export default App;
