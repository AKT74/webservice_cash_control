import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './../styles/Wallets.css';

const Wallets = () => {
  const [wallets, setWallets] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const decoded = jwtDecode(localStorage.getItem('token'));
    

    const fetchWallets = async () => {
      try {
        const response = await axios.get(`https://webservice-cash-control-server.vercel.app/get-wallet-user/${decoded.id}`);
        setWallets(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchWallets();
  }
  }, []);

  return (
    <div className="wallets">
      <h2>My Wallets</h2>
      {wallets.map((wallet) => (
        <div className="wallet" key={wallet.id}>
          <span>{wallet.Category.wallet_name}</span>
          <span>{wallet.amount.toLocaleString()}</span>
          {/* <button className='infoBtn'>info</button> */}
        </div>
      ))}
      <div><Link to={"/add-wallet"} className="add-wallet">Add Wallet</Link></div>
      <div><Link to={"/"} className="logout">Logout</Link></div>
      <div class="nav-bar">
            <div class="nav-icon"></div>
            <div class="nav-icon"></div>
            <div class="nav-icon active"></div>
            <div class="nav-icon"></div>
            <div class="nav-icon"></div>
        </div>
    </div>
    

    
  );
};

export default Wallets;
