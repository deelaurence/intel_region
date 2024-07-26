import { Link, useLocation } from 'react-router-dom'
import baseUrl from '../data/baseUrl'
import React from 'react'
import Menu from './Menu'
import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useGlobalState } from '../GlobalState'
import { FaCross } from 'react-icons/fa'
import Logo from './Logo'



const Navbar = () => {
  const location = useLocation()
  const [scrollDirection, setScrollDirection] = useState("up");
  const [showGreeting, setShowGreeting]=useState(true)
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const {state,logoutGlobally,dispatch} = useGlobalState()

  let greetName
  if(state.clientData.userData){
     greetName = state.clientData.userData.singleName
     if(state.isAdminLoggedIn){
      greetName='Admin'
     }
  }

  
useEffect(()=>{
  if(sessionStorage.getItem('admin_token')){
    dispatch({ type: 'SET_IS_ADMIN_LOGGED_IN', payload: true });
  }
},[])
  






  


//blend menu bar dynamically
  let blendBar = document.querySelector('.blend-bar')


  //hide menu on mobile
  const [menu, setMenu] = useState(false)
  const hideMenu = () => {
    setMenu(false)
    setShowGreeting(true)
  }


  //show menu on mobile
  const showMenu = () => {
    setShowGreeting(false)
      setMenu(true)
    
  }

  return (
    <nav
      className={
        menu ? 
        
          "px-6  bg-darkShade shadow-sm fixed nav z-[1] flex py-5 items-center  justify-between w-screen text-darkShade  sm:px-16  absolute-nav "
        
          : "px-6  bg-darkShade shadow-sm fixed nav z-[1000] flex py-5 items-center justify-between w-screen text-darkShade sm:px-16 absolute-nav"
          }>
      <div className={scrollDirection=="up"?"flex justify-between items-center w-full duration-[1s] opacity-100":" duration-[1s] opacity-0 -translate-y-[50px] flex justify-between items-center w-full"}>
      
      
      


        {/* logged in user greeting */}
        
        <div 
        onClick={()=>{
          if(state.superAdmin){
            dispatch({ type: 'SET_PUBLISH_MODE', payload: !state.publishMode });
          }
          
        }}
        className={showGreeting?'flex items-center relative flex-col opacity-100 duration-[6s]':'opacity-0 flex items-center relative flex-col'}>
          <p className={`${state.publishMode?'text-opaque opacity-30 -ml-6':'text-lightShade'}   text-sm font-semibold  relative opacity-90 duration-[1s] -z-10`}>Hi, {greetName ?? (state.isAdminLoggedIn ? 'Admin' : 'Guest')}</p>
        </div>

        {/* menu: component */}

        <div className={`${menu?'-top-20 forceZindex':'-top-[1000px]'} ? duration-[1s] sm:hidden fixed left-0 bg-darkShade `}>
          <Menu location={location} menu={menu} hideMenu={hideMenu} />
        </div>

          
      {/* Logo*/}
      <Logo/>

        {/* menu: link */}
        <div className="md:hidden flex  gap-1 ">
          <p onClick={showMenu} className='text-base text-lightShade font-semibold show-menu ' >menu</p>
        </div>


        {/* navbar links */}

        <div className="hidden md:flex   gap-4 [&>*]:dark:bg-darkShade [&>*]:dark:text-lightShade  ">
              {
                state.navbarData.map((data,index)=>{
                  return(
                    // <p className={`${data.subMenu?'hidden':'text-red-200'}`}>hi</p>
                    <div key={index} className={`${data.subMenu?'hidden':'text-sm font-[400] text-lightShade'}`}>  
                      <p ><Link to={data.link}>{data.label}.</Link></p>
                    </div>
                  )
                })

              }
              {state.clientData.token&&
              <div onClick={logoutGlobally} className='relative'>  
                      <p className={true ? 'text-sm font-[400] text-lightShade '
                      :' text-sm font-[400] text-opaque'} ><Link to='/'>Logout</Link></p>
              </div>}     
        </div>
      </div>
    </nav>

  )
}

export default Navbar
