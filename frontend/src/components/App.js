import React from 'react';
import { Routes, Route } from "react-router-dom";


import Home from '../pages/Home';
import Navbar from './Navbar';
import Postings from '../pages/Postings';
const App = () => {

  return (
    <div className="fixed min-h-screen overflow-y-auto w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-100">
        <Navbar/>
        <Routes>
          <Route path="/postings" element={<Postings />} />
          <Route path="*" element={<Home />} />
        </Routes>
    </div>
  );
}

export default App;
