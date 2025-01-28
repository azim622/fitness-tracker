import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://fitness-tracker-server-orcin.vercel.app'
})
const AxiosPublic = () => {
    return axiosPublic

};

export default AxiosPublic;