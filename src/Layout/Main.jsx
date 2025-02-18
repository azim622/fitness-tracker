import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../Shared/Navbar/Navbar';
import Footer from '../Shared/Footer/Footer';

const Main = () => {
    const location = useLocation();
  const noHeaderFooter =  location.pathname.includes("login") || location.pathname.includes("signIn");
    return (
        <div>
            {noHeaderFooter || <Navbar></Navbar>}
            <div className='mt-16'>
               <Outlet></Outlet>

            </div>
      {noHeaderFooter || <Footer></Footer>}
        </div>
    );
};

export default Main;