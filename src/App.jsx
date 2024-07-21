import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Quiz from './Quiz';
import Login from './Login';
import Signup from './Signup';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </div>
  );
};

export default App;
