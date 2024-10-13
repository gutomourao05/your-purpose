import axios from 'axios';
import { getToken } from '../../services/TokenService';

const AppConnection = axios.create({
    baseURL: 'http://developingsolutions.com.br:7000/api/',
    timeout: 10000,
});

AppConnection.interceptors.request.use(
    async (config) => {
        const token = await getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default AppConnection;
