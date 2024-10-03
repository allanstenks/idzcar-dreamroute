import axios from 'axios';

const isProduction = false;

const api = axios.create({
    baseURL: isProduction ? process.env.REACT_APP_API_URL || "https://hdream.idzcar.com.br/" : process.env.REACT_APP_HML_URL || "https://hdream.idzcar.com.br/",
    headers: {
        "Authorization": process.env.REACT_APP_API_KEY,
        "Token": process.env.REACT_APP_API_KEY
    }
});

export default api;
