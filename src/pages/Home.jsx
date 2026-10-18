
import React from 'react'
import HeroSection from '../components/HerSection'
import LatestBlog from '../components/LatestBlog'

const Home = () => {
  return (
   <>
{/* <HeroSection/> */}
<h1 className=" font-bold mx-6 text-gray-600  text-base xs:text-2xl sm:text-2xl md:text-2xl  text-center mt-8 xs:mt-8 md:mt-14 lg:mt-14">মানুষের কাছে সঠিক, নির্ভুল এবং শির্ক মুক্ত ইসলাম পৌঁছে দেওয়া এই ওয়েবসাইটের প্রধান লক্ষ্য</h1>

<LatestBlog/>
   </>
  )
}

export default Home
