import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://webservice-cash-control-server.vercel.app',
});

export default instance;
