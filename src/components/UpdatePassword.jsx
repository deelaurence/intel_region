import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc';
import Popup from './Popup';
import baseUrl from '../data/baseUrl';
import { useLocation } from 'react-router-dom';
import { useGlobalState } from '../GlobalState';
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useSearchParams } from 'react-router-dom';


const UpdatePasswordComponent = ({setIsLoggedIn, isIOS}) => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const [isLoading, setIsLoading]=useState(false)
const [popupMsg, setPopupMsg]= useState('')
const [showPassword, setShowPassword]=useState(false)

const navigate = useNavigate()

//GOOGLE AUTH LOGIN
const {state,dispatch} = useGlobalState()


const [searchParams] = useSearchParams();
const queryEmail = searchParams.get('email'); //
// setEmail(queryEmail)


useEffect(()=>{
    setEmail(queryEmail)
},[])

 
const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    const requestOptions = {
      method: 'PUT',
      credentials:'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
            email:email,
            password:password,
        }
      ),
    };
  try {
  const response = await fetch(`${baseUrl}/auth/update-password`, requestOptions);
  const data = await response.json();
  if(response.status>201){
    setPopupMsg(data.message)
    setIsLoading(false)
  }
  if(response.status<202 ){
    
      setIsLoading(false)
      navigate("/give")
  }
  // Handle response data as needed
} catch (error) {
  console.error('Error making post request:', error);
  // Handle error as needed
}
   
  };






  return (
    <div className="flex justify-center py-32 items-center min-h-screen  bg-lightShade">
      <form
        className="bg-white relative overflow-visible shadow-md w-[85%] sm:max-w-[40%] rounded px-8  pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        {popupMsg&&<Popup message={popupMsg} setPopupMsg={setPopupMsg}  link={popupMsg=="Email not registered, Sign up"?"/register":"/login"}/>}
        <div className='bg-darkShade shadow-sm absolute h-24 w-[70%] -mt-2 mb-12 rounded-br-xl text-lightShade'>
            <h3 className='text-3xl font-semibold my-12 text-center'>UpdatePassword.</h3>
        </div>
        <div className="mt-28 mb-4 opacity-50">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow border-b-1 border-b-neutral-200 bg-transparent appearance-none border rounded w-full py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            required={true}
            type="email"
            disabled={true}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6  relative">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Enter new Password 
          </label>
          <div
          onClick={()=>{setShowPassword(!showPassword)}}
          className='absolute cursor-pointer   h-2 w-2 right-4 bottom-[40%]'>

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
        <div className="mb-2  relative">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
            Confirm New Password 
          </label>
          <div
          onClick={()=>{setShowPassword(!showPassword)}}
          className='absolute cursor-pointer h-2 w-2 right-4 bottom-[40%]'>

            {!showPassword?<LuEye/>:<LuEyeOff/>}
          </div>
          <input
            className="shadow border-b-1 border-b-neutral-200 bg-transparent appearance-none border rounded w-full py-2 px-1  text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
            id="confirmPassword"
            required={true}
            type={showPassword?"text":"password"}
            placeholder="Confirm your new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {password!=confirmPassword&&<p className='text-red-400 text-sm mb-3'>Password does not match.</p>}
        <div className="flex items-center justify-between">
          {isLoading?<LoadingButton/>:<button
            className="bg-orange-500 min-w-[40%] hover:bg-orange-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            UpdatePassword
          </button>}
          
        </div>

      </form>
    </div>
  );
};

export default UpdatePasswordComponent;
