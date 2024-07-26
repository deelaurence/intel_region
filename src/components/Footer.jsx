import { useLocation } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Logo from './Logo';
import { footerLinks } from '../data/footer';

const Footer = ({ locationProps }) => {
  gsap.registerPlugin(ScrollTrigger);
  const footerLineRef = useRef(null);
  const contactRef = useRef(null);
  const gotProjectRef = useRef(null);
  const connectRef = useRef(null);
  const footerLine = footerLineRef.current;
  const contact = contactRef.current;
  const gotProject = gotProjectRef.current;
  const connect = connectRef.current;
  const location = useLocation();
  const [currentLocation, useCurrentLocation] = useState('');

  return (
    <footer className="tracking-[0.5px] pt-24 pb-24 px-6 sm:px-16 bg-darkShade text-white dark:bg-darkShade dark:text-lightShade">
      <div className='mt-14 overflow-visible'>
        <h3 ref={gotProjectRef} className='text-2xl font-[aboreto] text-opaque overflow-visible'>
          PLAN YOUR PERFECT EVENT WITH US
        </h3>
        <div className='pt-2 opacity-60'>
          <Logo />
        </div>
        <section className='md:flex md:justify-between'>
          <div className='text-opaque  w-64 text-2xl mt-12 md:mt-24 mb-3'>
            Transform your vision into reality with our comprehensive event planning platform.
          </div>
          
          <div ref={contactRef}>
            <p className='text-opaque mt-12 md:mt-24 mb-3'>
              CONTACT US
            </p>
            <div className='flex flex-col'>
              {footerLinks.map((_link, index) => (
                <Link to={_link.link} key={index} className='font-medium'>{_link.label}</Link>
              ))}
            </div>
          </div>
          <div ref={connectRef}>
            <p className='text-opaque mt-12 md:mt-24 mb-3'>
              OUR LOCATIONS
            </p>
            <div className='flex flex-col'>
              <a className='font-medium' href="mailto:eventplanner@example.com">New York</a>
              <a className='font-medium' href="mailto:eventplanner@example.com">Los Angeles</a>
              <a className='font-medium' href="mailto:eventplanner@example.com">Chicago</a>
            </div>
          </div>
        </section>
      </div>
      <div ref={footerLineRef} className='bg-opaque my-14 dark:bg-lightShade h-[1px] w-full'></div>
      <div className='text-opaque'>
        <div className='flex flex-col items-center text-sm'>
          <p className='font-medium'>&copy; 2024 &mdash; Taskify incorporated</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
