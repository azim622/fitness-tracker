import AxiosPublic from './AxiosPublic';
import useAuth from './UseAuth';
import { useQuery } from '@tanstack/react-query';

const UseAdmin = () => {
    const {user , loading} = useAuth()
    const axiosPublic = AxiosPublic()
    const {data: users , isPending:isLoading} =useQuery({
        queryKey : [user?.email , 'isAdmin'],
        enabled: !loading,
        queryFn: async()=>{
            const res = await axiosPublic.get(`/users/${user.email}`)
            console.log(res.data)
            return res.data;
        }

    })
    return [users , isLoading]
};

export default UseAdmin;