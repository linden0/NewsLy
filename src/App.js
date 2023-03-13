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
        <Route path="/" element={<Home/>}/>
        <Route path="/api" element={<API />}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/about" element={<About/>}/>

        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </div>

  );
}

export default App;
