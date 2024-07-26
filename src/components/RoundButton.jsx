import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineArrowOutward } from 'react-icons/md';

const RoundButton = ({ link, text }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link 
      to={link} 
      className=''
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button 
        className={`relative mb-4 mx-6 w-[300px] h-[50px] cursor-pointer rounded-md border-2 border-darkShade sm:mx-16 p-3 flex items-center justify-center opacity-80 transition duration-300 ${isHovered ? 'bg-darkShade text-lightShade' : 'bg-lightShade text-darkShade'}`}
      >
        <span className='font-semibold'>{text}</span>
        <MdOutlineArrowOutward className='ml-2' />
      </button>
    </Link>
  );
}

export default RoundButton;
