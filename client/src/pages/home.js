import React from 'react';
import Categories from '../components/Categories';
import Delivery from '../components/Delivery';
import FeaturedSection from '../components/FeaturedSection';
//import Meal from '../components/Meal';
import TopPicks from '../components/TopPicks';


const Home = () => {
  return (
    <>
        <FeaturedSection />
        <Delivery />
        <TopPicks />
        {/* <Meal /> */}
        <Categories />
    </>
  )
}

export default Home;