import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from './UseAuth';


const axiosSecure = axios.create({
    baseURL: "https://fitness-tracker-server-orcin.vercel.app",
  });
const UseAxiosSecure = () => {
  const navigate = useNavigate()
  const {logOut}= useAuth()
  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("access-token");
      console.log('request stopped by interceptors' , token)
      config.headers.authorization = `Bearer ${token}`;

      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      const status = error.response.status;
      // console.log("interceptorts err" , status)
      if (status === 401 || status === 403) {
        await logOut();
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );
   return axiosSecure
};

export default UseAxiosSecure;