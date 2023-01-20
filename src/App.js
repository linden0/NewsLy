import './App.css';
import { Routes, Route } from 'react-router-dom';

import NavBar from './components/navbar';
import Home from "./components/home";

function App() {
  return (
    <div>
      <NavBar/>
      <Routes>
        <Route exact path="/" element={<Home/>}/>

      </Routes>
    </div>

  );
}

export default App;
