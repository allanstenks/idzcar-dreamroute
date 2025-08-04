import axios from 'axios';

const isProduction = true;

const api = axios.create({
    baseURL: isProduction ? process.env.REACT_APP_API_URL || "https://idzcar.dreamroute.com.br/" : process.env.REACT_APP_HML_URL || "https://dreamroute.idzcar.com.br/api/",
    headers: {
        "Authorization": process.env.REACT_APP_API_KEY,
        "Token": process.env.REACT_APP_API_TOKEN
    }
});

export default api;
