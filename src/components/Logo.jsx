import React from 'react'
import { Link } from 'react-router-dom'
import { FaCross } from 'react-icons/fa'


const Logo = () => {
  return (
    <Link to="/">
    <div
      className="flex gap-1 blend-bar-child ">
      <h3
        className="self-end flourish text-lightShade     font-semibold text-xl md:text-4xl "><span className=''><FaCross className=' inline'/></span>askify</h3>
    </div>
  </Link>


  )
}

export default Logo