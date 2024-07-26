import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc';
import Popup from './Popup';
import baseUrl from '../data/baseUrl';
import { useLocation } from 'react-router-dom';
import { useGlobalState } from '../GlobalState';
import { LuEye, LuEyeOff } from "react-icons/lu";
import LoadingButtonUniversal from './LoadingButtonUniversal';
const LoginComponent = ({setIsLoggedIn, isIOS}) => {

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [isLoading, setIsLoading]=useState(false)
const [popupMsg, setPopupMsg]= useState('')
const [showPassword, setShowPassword]=useState(false)
const [keepLoggedIn, setKeepLoggedIn]=useState(false)


const navigate = useNavigate()


const {state,dispatch,bindClientToBrowser,loginGlobally} = useGlobalState()


//EMAIL LOGIN  
const handleSubmit = async (e) => {
  try{ 
  e.preventDefault();
    
    setIsLoading(true)

    //If user exists return error
    const emailExists = state.allAuthors.some((author)=>{
      return author.email===email
    })
    console.log(emailExists)

    if (!emailExists) {
      setIsLoading(false);
      setPopupMsg("Email does not exist");
      return;
    }
    
    // If email exists, check if the password matches
    const author = state.allAuthors.find((author) => author.email === email);
    
    if (author.password !== password) {
      setIsLoading(false);
      setPopupMsg("Invalid Password");
      return;
    }
    
    bindClientToBrowser({
        type:'session',token:`real-${author.name}-jwt-should-be-sent-from-a-real-backend`,name:author.name,email,loginType:'Email'
    })

    if(keepLoggedIn){
        bindClientToBrowser({
          type:'local',token:`real-${author.name}-jwt-should-be-sent-from-a-real-backend`,name:author.name,email,loginType:'Email'
        }) 
    }
    loginGlobally()
    setIsLoading(false)
    
      
    navigate("/dashboard")
  
  // Handle response data as needed
} catch (error) {
  console.error('Error making post request:', error);
  // Handle error as needed
}
    // Perform Login logic here
};







//Retain popup message accross rerenders
if(popupMsg){
  sessionStorage.setItem('popupMsg',popupMsg)
}    
const retainedPopupMsg=sessionStorage.getItem('popupMsg')  

  return (
    <div className="flex justify-center py-32 items-center min-h-screen  bg-lightShade">
      <form
        className="bg-white relative overflow-visible shadow-md w-[85%] sm:max-w-[40%] rounded px-8  pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        {popupMsg&&<Popup message={popupMsg} setPopupMsg={setPopupMsg}  link={popupMsg=="Email not registered, Sign up"?"/register":"/login"}/>}
        <div className='bg-darkShade shadow-sm absolute h-24 w-[70%] -mt-2 mb-12 rounded-br-xl text-lightShade'>
            <h3 className='text-3xl font-semibold my-12 text-center'>Login.</h3>
        </div>
        <div className="mt-28 mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow border-b-1 border-b-neutral-200 bg-transparent appearance-none border rounded w-full py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            required={true}
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="  relative">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password 

          </label>
          <div
          onClick={()=>{setShowPassword(!showPassword)}}
          className='absolute cursor-pointer h-2 w-2 right-4 bottom-[40%]'>

            {!showPassword?<LuEye/>:<LuEyeOff/>}
          </div>
          <input
            className="shadow border-b-1 border-b-neutral-200 bg-transparent appearance-none border rounded w-full py-2 px-1  text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            required={true}
            type={showPassword?"text":"password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='mb-6 flex justify-item items-center text-darkShade'>
          <input 
          type='checkbox'
          value={keepLoggedIn}
          className="self-start p-0 w-auto justify-start  border"
          name="" 
          onChange={(e) => setKeepLoggedIn(!keepLoggedIn)}
          id="keepLoggedIn" />  
          <label className=' text-gray-600' htmlFor="keepLoggedIn">Keep me logged In</label>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-orange-500 min-w-[40%] hover:bg-orange-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={isLoading}
          >
            { isLoading? "Loading":"Login"}
          </button>
          <Link to="/register"
            className="underline border-b-1 border-b-orange-400 text-orange-400 max-w-[80%] text-sm font-semibold py-2  rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            New User? &nbsp; Register
          </Link>
          
        </div>
      </form>
    </div>
  );
};

export default LoginComponent;
