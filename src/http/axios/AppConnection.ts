import axios from 'axios';
import { deleteToken, getToken } from '../../services/TokenService';
import { navigationRef } from '../../../App';


const AppConnection = axios.create({
    baseURL: 'http://developingsolutions.com.br:7000/api/',
    timeout: 10000,
});

AppConnection.interceptors.request.use(
    async (config) => {
        try {
            const token = await getToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) { }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

AppConnection.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response && error.response.status === 401) {
            await deleteToken();
            if (navigationRef.isReady()) {
                navigationRef.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                });
            }
        }
        return Promise.reject(error);
    }
);

export default AppConnection;
