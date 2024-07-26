import React from 'react'
import baseUrl from '../data/baseUrl';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'
// import { HashRouter as useLocation } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useGlobalState } from '../GlobalState';
const Menu = ({ hideMenu, menu}) => {
    const {state,logoutGlobally}=useGlobalState()
    const locationProps=useLocation()


    return (
        <>
            <p onClick={hideMenu} className='text-lg tracking-[0.5px] text-lightShade absolute top-32 right-6' >close</p>
            <div onClick={hideMenu} className={`${menu?'forceZindex ':''} relative flex text-lightShade justify-center w-screen h-[100vh]  mt-20 px-6 items-start flex-col  text-2xl`}>
              {
                // delete logout data from the array
                state.navbarData.map((data,index)=>{
                    return(
                        <Link key={index} className='relative ' to={data.link}>
                            <p className={`${data.subMenu?'text-base font-medium  mb-2':'text-5xl mb-2 uppercase font-semibold'}`}>{data.label}</p>
                        </Link>
                    )
                })
              }
              {/* manually include logout data here */}
                
                
                {state.isLoggedIn&&<Link className='relative' to='/'>
                    <p onClick={logoutGlobally}  className={true ? '' : 'text-opaque'}>Logout</p>
                </Link>}
            </div>
        </>
    )
}
export default Menu
