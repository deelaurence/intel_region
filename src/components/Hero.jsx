import React from 'react';
import RoundButton from './RoundButton';

const Hero = () => {
  return (
    <>
      <div>
        <p className='bg-lightShade pl-6 sm:px-16 pt-20 px-6 text-5xl font-semibold'>Plan Your Perfect Event.</p>
        <p className='bg-lightShade px-6 pb-10 sm:px-16 pt-20 text-lg'>
          Stay organized and streamline your event planning with our comprehensive event management platform. 
          Effortlessly coordinate every detail, from guest lists to schedules, with ease and efficiency. 
          <span className='font-medium'>Bring your vision to life and ensure a seamless event experience.</span> 
          Our intuitive platform helps you manage all aspects of your event, keeping you focused and in control.
          Experience the convenience of having everything you need in one place, 
          and make your event planning process smooth and stress-free. 
          Whether you're organizing a small gathering or a large-scale event,
          our app is designed to help you succeed.
        </p>
      </div>
      <RoundButton text="GET STARTED" link="/register"/>
    </>
  );
}

export default Hero;
