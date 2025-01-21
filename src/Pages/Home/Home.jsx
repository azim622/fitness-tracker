import React from 'react';
import Banner from './Banner/Banner';
import Feataured from './Featured/Feataured';
import About from './About/About';
import LatestForum from './LatestForum/LatestForum';
import NewsLatter from './NewsLatter/NewsLatter';
import BeATrainer from '../BeATrainer/BeATrainer';
import { Helmet } from 'react-helmet';
import TrainerProfile from './TrainerProfile/TrainerProfile';
import UseAdmin from '../../Hooks/UseAdmin';


const Home = () => {
    const [users]= UseAdmin()
    console.log(users)
    return (
        <div>
             <Helmet>
                <meta charSet="utf-8" />
                <title>Home || FitTracker</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <div>
            <Banner></Banner>
            <Feataured></Feataured>
            <About></About>
            <LatestForum></LatestForum>
            <NewsLatter></NewsLatter>
            <TrainerProfile></TrainerProfile>
            </div>
           
        </div>
    );
};

export default Home;