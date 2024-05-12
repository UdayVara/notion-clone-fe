import axios from "axios";
import { auth } from "./auth";

const axiosInstance = axios.create({
  baseURL: `${process.env.API_URL || "http://localhost:5000/api/v1"}`// process.env.API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    let access_token: string = '';
    const isServer = typeof window === 'undefined'
    if (isServer) {
      const userObj = await auth();
      const user = userObj?.user
      if (user) {
        console.log('server Component')
        const user:any = await auth();
        access_token = user.user.token  || ''
      }
    } else {
      if(typeof localStorage !== 'undefined'){
        access_token = localStorage && localStorage.getItem('access_token') || ''
      }
    }
    console.log(access_token)
    if (access_token) {
      if (!config.headers["authorization"]) {
        config.headers.authorization = `${access_token}`;
      } else {
        config.headers.authorization = `${access_token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  async (response) => {
    return response;
  },
  async function (error) {
    console.log('axios error:', error);
    console.log("Axios Response : ",error.response)
    return Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    );
  }
);

export default axiosInstance;
