import React, { useState, useRef } from 'react';
import { FcGoogle } from 'react-icons/fc';
import LoadingButtonUniversal from './LoadingButtonUniversal';
import { useGlobalState } from '../GlobalState';
import axios from 'axios';
import {Link,redirect,useNavigate} from 'react-router-dom'
import baseUrl from '../data/baseUrl';
import Popup from './Popup';
const RegistrationComponent = () => {
  const {state,dispatch}=useGlobalState()
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [passwordPrompt, setPasswordPrompt]=useState("")
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validatePassword, setValidatePassword] = useState(false);
  const [popupMsg, setPopupMsg]= useState('')
  const [isLoading, setIsLoading]=useState(false)

const passwordDom=document.getElementById("password")



const handleSubmit =async (e) => {
  e.preventDefault();
    dispatch({type:'SET_UNAUTHENTICATED_USER_EMAIL',payload:email})
    
    if(!validatePassword){
      setPasswordPrompt("Password is too short")
      return 
    }
    if(password!==confirmPassword){
      setPasswordPrompt("Passwords does not match")
      return 
    }
    
    setIsLoading(true)
    
    //If user exists return error
    const emailExists = state.allAuthors.some((author) => author.email === email);
    
    if(emailExists){
      setIsLoading(false)
      setPopupMsg("Email already registered")
      return
    }
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any other required headers here
      },
      body: JSON.stringify(
        {
            name:`${firstname}`,
            email:email,
            password:password,
        }
      ),
    };
  try {
  const response = await fetch(`${baseUrl}/users`, requestOptions);
  const data = await response.json();
  if(response.status>201){
  
  setIsLoading(false)
  setPopupMsg(data.message)
    
  }
  if(response.status==201){
     navigate("/login")
     window.location.reload()
     
  }
  // Handle response data as needed
} catch (error) {
  console.error('Error making post request:', error);
  // Handle error as needed
}
    // Perform Registration logic here
  };

return (
    <div className="py-32  flex flex-col justify-center items-center min-h-screen  bg-lightShade">
      <form
        className="bg-white relative overflow-visible shadow-md w-[85%]  sm:max-w-[40%] rounded px-8  pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        {popupMsg&&<Popup message={popupMsg} link="/login"/>}
        <div className='bg-darkShade absolute h-24 w-[70%] -mt-2 mb-12 rounded-br-xl text-lightShade'>
            <h3 className='text-3xl font-semibold my-12 text-center'>Registration.</h3>
        </div>
        <div className="mb-4 pt-32">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstname">
            Name
          </label>
          <input
            className="shadow border-b-1 border-b-neutral-200 bg-transparent appearance-none border rounded w-full py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="firstname"
            type="text"
            required={true}
            placeholder="Enter your name"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>
        <div className=" mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow border-b-1 border-b-neutral-200 bg-transparent appearance-none border rounded w-full py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            required={true}
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label 
          className={passwordPrompt?"block text-red-700 text-sm font-semibold mb-2":"block text-gray-700 text-sm font-bold mb-2"} 
          htmlFor="password">
           {passwordPrompt?passwordPrompt:"Password"}
          </label>
          <input
            className="shadow border-b-1 border-b-neutral-200 bg-transparent appearance-none border rounded w-full py-2 px-1  text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            onFocus={() => setPasswordPrompt(false)}
            required={true}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              if(password.length>5){
                setValidatePassword(true)
                setPasswordPrompt("")
              }
              else{
                setPasswordPrompt("Password is too short")
                setValidatePassword(false)
              }
            }}
          />
          {/* <p>{validatePassword?"":"Password too short"}</p> */}
        </div>

        <div className="mb-6">
        
          <label 
          className={passwordPrompt?"block text-red-700 text-sm font-semibold mb-2":"block text-gray-700 text-sm font-bold mb-2"} 
          htmlFor="confirmPassword">
           {passwordPrompt?passwordPrompt:"Confirm password"}
          </label>
          <input
            className="shadow border-b-1 border-b-neutral-200 bg-transparent appearance-none border rounded w-full py-2 px-1  text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="confirmPassword"
            type="password"
            required={true}
            onFocus={() => setPasswordPrompt(false)}
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          {<button
            className="bg-orange-500 min-w-[40%] hover:bg-orange-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={isLoading}
          >
            { isLoading? "Loading":"Register"}
          </button>}
          <Link to="/login"
            className="ml-4 underline text-center border-b-1 border-b-blue-400 text-orange-400 max-w-[80%] text-sm font-semibold py-2  rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Already registered? &nbsp; Login
          </Link>
          
        </div>
      </form>
      
    </div>
  );
};

export default RegistrationComponent;
