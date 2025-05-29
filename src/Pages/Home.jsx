import React from 'react'
import Navbar from '../Component/Navbar'
import Hero from "../Component/Hero"
import Char from "../Component/Char"
import Footer from "../Component/Footer"
import { Toaster } from 'react-hot-toast'
function Home() {
  return (
    <div>
      <Navbar/>
      <Hero/>
<Char/>
<Footer/>
      <Toaster /> 
    </div>
  )
}

export default Home