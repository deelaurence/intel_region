import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc';
import Popup from '../Popup';
import baseUrl from '../../data/baseUrl';
import { useLocation } from 'react-router-dom';
import { useGlobalState } from '../../GlobalState';
const AdminLoginComponent = ({isIOS}) => {
const [email, setUsername] = useState('');
const [password, setPassword] = useState('');
const [isLoading, setIsLoading]=useState(false)
const [popupMsg, setPopupMsg]= useState('')

const {state,dispatch} = useGlobalState()

const navigate = useNavigate()






const location = useLocation()
const queryParams = new URLSearchParams(location.search);
const token = queryParams.get('token');

    




//EMAIL LOGIN  
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true)
  try {  
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
    console.log(author)
    if(!author.admin){
      setIsLoading(false)
      setPopupMsg("You are not an authorized admin")
      return
    }

    dispatch({ type: 'SET_IS_ADMIN_LOGGED_IN', payload: true });
    sessionStorage.setItem('admin_token','fake-jwt')
    


    setIsLoading(false)
    
    navigate("/dashboard")
  
  
} catch (error) {
  setPopupMsg(error.message)
  console.log(error)
}
  };

  return (
    <div className="flex justify-center items-center min-h-screen  bg-lightShade">
      {popupMsg&&<Popup message={popupMsg} setPopupMsg={setPopupMsg}  link="/admin-login"/>}
      <form
        className="bg-white relative overflow-visible shadow-md w-[85%] sm:max-w-[40%] rounded px-8  pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        {/* {popupMsg&&<Popup message={popupMsg} setPopupMsg={setPopupMsg}  link="/admin-login"/>} */}
        <div className='bg-darkShade shadow-sm absolute h-24 w-[70%] -mt-2 mb-12 rounded-br-xl text-lightShade'>
            <h3 className='text-3xl font-semibold  my-12 text-center'>Admin Login.</h3>
        </div>
        <div className="mt-28 mb-4">
        <p className='py-4 text-gray-400 italic'>email: admin@gmail.com, password: testing</p>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="text">
            Email
          </label>
          <input
            className="shadow border-b-1 border-b-neutral-200 bg-transparent appearance-none border rounded w-full py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            required={true}
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow border-b-1 border-b-neutral-200 bg-transparent appearance-none border rounded w-full py-2 px-1  text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            required={true}
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-orange-500 min-w-[40%] hover:bg-orange-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={isLoading}
          >
            { isLoading? "Loading":"Login"}
          </button> 
        </div>
            <div className=''>
          
    </div>
      </form>
    </div>
  );
};

export default AdminLoginComponent;
