import React from 'react';
import AxiosPublic from '../../Hooks/AxiosPublic';
import useAuth from '../../Hooks/UseAuth';
import { useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';

const SocialLogin = () => {
    const axiosPublic = AxiosPublic()
    const {googleSignIn} = useAuth()
    const navigate = useNavigate()
    const handleGoogleSignIn=()=>{
        googleSignIn()
        .then(result =>{
            console.log(result.user)
            const userInfo ={
                email: result.user?.email,
                name : result.user?.displayName
            }
            axiosPublic.post('/users' , userInfo)
            .then(res=>{
                console.log(res.data)
                navigate('/')
            })
        })
    }
    return (
        <div>
            <div className="text-center mt-4">
          <button
            onClick={handleGoogleSignIn}
            className="inline-flex items-center justify-center w-11/12 h-10 gap-2 px-5 text-sm font-medium tracking-wide text-white transition duration-300 rounded focus:outline-none bg-red-500 hover:bg-red-600"
          >
          <FaGoogle></FaGoogle>  Continue with Google
          </button>
        </div>
        </div>
    );
};

export default SocialLogin;