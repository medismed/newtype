import axios from "axios";
import { getCookie } from "./lib/cookies";

const apiClient = axios.create({
    baseURL:"http://localhost:8080"
})

apiClient.interceptors.request.use(
    async (config) => {

        if (config.url !== '/auth/login'){
            const token = await getCookie("jwt");
            if (token)
                config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    }
    ,
    error =>  Promise.reject(error)
)


export default apiClient;


