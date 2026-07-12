import Navbar from 'daisyui/components/navbar'
import React from 'react'
import HeroSection from '../components/HerSection'
import LatestBlog from '../components/LatestBlog'

const Home = () => {
  return (
   <>
{/* <HeroSection/> */}
<h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl  text-center mt-8 xs:mt-8 md:mt-10 lg:mt-12">ব্লগসমূহ</h1>
<LatestBlog/>
   </>
  )
}

export default Home
