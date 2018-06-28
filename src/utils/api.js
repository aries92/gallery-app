import axios from 'axios';

const api = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3001/api';

const instance = axios.create({
    baseURL: api
});

// Alter defaults after instance has been created
//instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

export default instance;