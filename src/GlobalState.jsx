import React, { createContext, useReducer, useContext } from 'react';
import baseUrl from './data/baseUrl';
// Create a context
const GlobalStateContext = createContext();

// Define initial state
const initialState = {
    isLoggedIn: false,
    clientData:{},
    isAdminLoggedIn:false,
    superAdmin:sessionStorage.getItem('super_admin'),
    baseUrl,
    allMessages: [],
    allEvents: [],
    allAuthors:[],
    unauthenticatedUserEmail:'',
    isIOS: /iPhone|iPad|iPod/.test(navigator.userAgent),
    navbarData: [
        { label: 'Home', link: "/" },
        { label: 'Dashboard', link: '/dashboard' },
        { label: 'Admin', link: '/admin-login' },
        { label: 'Log in to your admin account',subMenu:true, link: '/admin-login' },
    ]
};

// Define a reducer
const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_IS_LOGGED_IN':
            return { ...state, isLoggedIn: action.payload };
        case 'SET_SUPER_ADMIN':
            return { ...state, superAdmin: action.payload };        
        case 'SET_UNAUTHENTICATED_USER_EMAIL':
            return { ...state, unauthenticatedUserEmail: action.payload };
        case 'SET_IS_ADMIN_LOGGED_IN':
            return { ...state, isAdminLoggedIn: action.payload };
        case 'SET_CLIENTDATA':
            return { ...state, clientData: action.payload };    
        case 'SET_ALL_AUTHORS':
            return { ...state, allAuthors: action.payload };
        case 'SET_ALL_EVENTS':
            return { ...state, allEvents: action.payload };
        case 'ADMIN_LOGOUT':
            return { ...state, isAdminLoggedIn: false};
        default:
            return state;
    }
};

// Create a provider component
export const GlobalStateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const logoutGlobally = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('admin_token')
        sessionStorage.removeItem('userData');
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        dispatch({ type: 'SET_CLIENTDATA', payload:{}});
        dispatch({type:'SET_IS_ADMIN_LOGGED_IN',payload:false})
        dispatch({ type: 'SET_IS_LOGGED_IN', payload:false });
    };

    const loginGlobally = () => {
        const userToken = sessionStorage.getItem('token')||localStorage.getItem('token')
        const userData = sessionStorage.getItem('userData')||localStorage.getItem('userData')
        const parsedData= JSON.parse(userData)
        parsedData.singleName= parsedData.name.split(' ')[0]
        
        dispatch({ type: 'SET_IS_LOGGED_IN', payload: true });
        dispatch({ type: 'SET_CLIENTDATA', payload:{token:userToken,userData:parsedData}});
    };
    
    const bindClientToBrowser=({
        type,
        token,
        name,
        email,
        loginType
    })=>{
        if(type=='session'){
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('userData',JSON.stringify({name,email}))
            sessionStorage.setItem('login_type', loginType);
        }
        if(type=='local'){
            localStorage.setItem('token', token);
            localStorage.setItem('userData',JSON.stringify({name,email}))
            localStorage.setItem('login_type', loginType);
        }
    }
    

    const adminLogout = () => {
        sessionStorage.removeItem('admin_token');
        sessionStorage.removeItem('admin_name');
        dispatch({ type: 'ADMIN_LOGOUT' });
    };



    return (
        <GlobalStateContext.Provider value={{ 
         state,
         dispatch, 
         logoutGlobally, 
         adminLogout,
         bindClientToBrowser, 
         loginGlobally }}>
            {children}
        </GlobalStateContext.Provider>
    );
};

// Create a custom hook to use the global state
export const useGlobalState = () => {
    const context = useContext(GlobalStateContext);
    if (!context) {
        throw new Error("useGlobalState must be used within a GlobalStateProvider");    
    }
    return context;
};
