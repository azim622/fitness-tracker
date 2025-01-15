import React from 'react';
import Banner from './Banner/Banner';
import Feataured from './Featured/Feataured';
import About from './About/About';
import NewsLatter from './NewsLatter/NewsLatter';
import BeATrainer from '../BeATrainer/BeATrainer';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Feataured></Feataured>
            <About></About>
            <NewsLatter></NewsLatter>
           
        </div>
    );
};

export default Home;