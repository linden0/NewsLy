import './App.css';
import { Routes, Route } from 'react-router-dom';

import NavBar from './components/navbar';
import Home from "./components/home";
import Search from './components/search';

function App() {
  return (
    <div>
      <NavBar/>
      <Routes>
        <Route exact path="/" element={<Home/>}/>

        <Route exact path="/search" element={<Search/>}/>
      </Routes>
    </div>

  );
}

export default App;
