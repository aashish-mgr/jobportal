import axios from 'axios';


const apiClient = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
       'Content-Type': 'application/json',
       Accept: 'application/json',
    },
});

const ApiAuthenticatedClient = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
       'Content-Type': 'application/json',
       Accept: 'application/json',
    },
});

ApiAuthenticatedClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
},(error) => {
    return Promise.reject(error);
});



export { apiClient, ApiAuthenticatedClient };