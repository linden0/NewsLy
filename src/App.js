import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';

import Home from "./components/home";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home/>}/>

      </Routes>
    </div>

  );
}

export default App;
