import React from 'react'
import Hero from '../Components/Hero'
import About from '../Components/About'
import NewsLetter from '../Components/NewsLetter'
import FeatureRooms from '../Components/FeatureRooms'
import TrustedBrands from '../Components/TrustedBrands'
import Infor from '../Components/Infor'
import Testimonials from '../Components/Testimonials'

const Home = () => {
  return (
    <div>
        <Hero/>
        <About/>
        <TrustedBrands/>
        <FeatureRooms/>
        <Infor/>
        <Testimonials/>
        <NewsLetter/>
    </div>
  )
}

export default Home