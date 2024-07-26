import React from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger)
import { FaArrowRight } from "react-icons/fa";
import Hero from './Hero';
const LANDING = () => {
  return (
    <>
  
    
    <div className='mb-24'>

    
      <section className='text-lightShade flex items-end  landing-section bg-landing-image bg-cover bg-center md:bg-center-30vh h-screen relative  overflow-hidden  px-6 sm:px-16 '>
        <div className='flex items-center flex-wrap bg-[rgba(30,30,30,.1)] p-6 '>
          <h3 className=' product-designer text-[14px]  font-bold sm:min-w-[60%]  sm:text-4xl  overflow-visible text-white' >NEVER BE OVERWHELMED WITH WHERE YOU NEED TO BE</h3>
          <p className='mt-4 w-[90%] sm:w-full  text-sm sm:text-base text-white'>
              Let us help you manage your pending events.
          </p>
          <a href='/login' className='mt-4 cursor-pointer text-white items-center gap-2 flex '>
            <p className=' text-white self-center font-semibold'>GET STARTED</p>
            <FaArrowRight className='text-xl'/>
          </a>
        </div>
      </section>
      <Hero/>
      </div>
    
    </>
  )
}

export default LANDING
