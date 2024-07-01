import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import './../styles/AddWallet.css';

const AddWallet = () => {
  const [walletId, setWalletId] = useState(0);
  const [account, setAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [category, setCategory] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')){

      
      const decoded = jwtDecode(localStorage.getItem('token'));
      setUserId(decoded.id);
      setToken(localStorage.getItem('token'));
    }
    
    const fetchCategory = async () => {
        try {
          const response = await axios.get('https://webservice-cash-control-server.vercel.app/category');
          setCategory(response.data);
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchCategory();

  }, []);

  const handleAdd = async () => {
    try {
      const response = await axios.post('https://webservice-cash-control-server.vercel.app/insert-wallet', {
        category_id: walletId,
        amount: parseFloat(amount),
        contact: account,
        user_id: userId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      
      });

      navigate('/wallets');
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="add-wallet-form">
      <h2>Add Wallet</h2>
      <select value={walletId} onChange={(e) => setWalletId(e.target.value)}>
        {category.map((item) => (
          <option value={item.id}>{item.wallet_name}</option>
        ))
        }
      </select>
      <input
        type="text"
        placeholder="Account"
        value={account}
        onChange={(e) => setAccount(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
};

export default AddWallet;
