import Navbar from 'daisyui/components/navbar'
import React from 'react'
import HeroSection from '../components/HerSection'
import LatestBlog from '../components/LatestBlog'

const Home = () => {
  return (
   <>
<HeroSection/>
<h1 className='sm:text-4xl text-center sm:mt-8'> ব্লগসমূহ</h1>
<LatestBlog/>
   </>
  )
}

export default Home
