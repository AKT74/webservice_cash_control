import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Wallets from './components/Wallets';
import AddWallet from './components/AddWallet';
import Login from './components/Login';
import Signup from './components/Signup';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/wallets" element={<Wallets />} />
          <Route path="/add-wallet" element={<AddWallet />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
