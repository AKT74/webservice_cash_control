import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './../styles/Wallets.css';

const Wallets = () => {
  const [wallets, setWallets] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      const decoded = jwtDecode(localStorage.getItem('token'));
      setUserId(decoded.id);
    }

    const fetchWallets = async () => {
      try {
        const response = await axios.get(`https://webservice-cash-control-server.vercel.app/get-wallet-user/${userId}`);
        setWallets(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWallets();
  }, []);

  return (
    <div className="wallets">
      <h2>My Wallets</h2>
      {wallets.map((wallet) => (
        <div className="wallet" key={wallet.id}>
          <span>{wallet.wallet_name}</span>
          <span>{wallet.amount}</span>
          <button>Edit</button>
        </div>
      ))}
      <Link to={"/add-wallet"} className="add-wallet">Add Wallet</Link>
    </div>
  );
};

export default Wallets;
