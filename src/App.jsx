import { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './App.css';
import { useGlobalState } from './GlobalState';
import { useLocation } from 'react-router-dom';
// Import components
import AdminLoginComponent from './components/admin/AdminLogin';
import LANDING from './components/LANDING';
import ManageEvents from './components/Dashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import LoginComponent from './components/Login';
import RegistrationComponent from './components/Register';
import EventDetails from './components/EventDetails';
import UpdatePasswordComponent from './components/UpdatePassword';
import { randomImgUrls } from './data/randomUnsplash';

function App() {
  const { state, loginGlobally, dispatch } = useGlobalState(); // Destructure global state, login function, and dispatch function from global state context
  const baseUrl = state.baseUrl; // Get base URL from global state
  const location = window.location.href; // Get current URL location

  useEffect(() => {
    // Check for token in session or local storage and log in the user if found
    if (sessionStorage.getItem('token')) {
      loginGlobally();
    } else if (localStorage.getItem('token')) {
      loginGlobally();
    }
  }, [dispatch]); // Dependency array includes dispatch to ensure effect runs when dispatch changes

  useEffect(() => {
    // Function to fetch event and author data from the server
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/events`); // Fetch events data
        let eventsData = await response.json(); // Parse events data to JSON

        const authors = await fetch(`${baseUrl}/users`); // Fetch authors data
        let authorsData = await authors.json(); // Parse authors data to JSON

        console.log(authorsData); // Log authors data to console

        // Insert a random image into events without images
        const replaceEmptyImages = (list) => {
          list.forEach((element) => {
            if (!element.image) {
              element.image = randomImgUrls();
            }
          });
        };

        replaceEmptyImages(eventsData); // Replace empty images in events data

        // Dispatch authors data to global state if it is an array
        if (Array.isArray(authorsData)) {
          console.log(authorsData);
          dispatch({ type: 'SET_ALL_AUTHORS', payload: authorsData });
        }

        if (eventsData[0]) {
          //Ensure admin can fetch all events, edit or delete them
          if (!state.isAdminLoggedIn) {
            // Filter events data based on logged-in user
            eventsData = eventsData.filter((event) => event.owner_id === state.clientData.userData.email);
          }
          if (Array.isArray(eventsData)) {
            dispatch({ type: 'SET_ALL_EVENTS', payload: eventsData });
          }
        }

      } catch (error) {
        console.log(error); 
      }
    };

    fetchData(); // Call fetchData function
  }, [dispatch, location, state.isLoggedIn]); // Dependency array includes dispatch, location, and isLoggedIn to ensure effect runs when they change

  console.log(state); // Log current state to console
  return (
    <Router>
      <ScrollToTop /> {/* Component to scroll to top of the page on route change */}
      <div className={`${state.publishMode ? '' : ''}dark:bg-darkShade absolute-parent`}>
        <Navbar /> {/* Navbar component */}
        <Routes>
          <Route path="/" element={<LANDING />} /> {/* Route for landing page */}
          <Route path="/admin-login" element={<AdminLoginComponent isIOS={state.isIOS} />} /> {/* Route for admin login page */}
          <Route path="/dashboard" element={<ManageEvents />} /> {/* Route for events dashboard */}
          <Route path="/login" element={<LoginComponent baseUrl={baseUrl} />} /> {/* Route for login page */}
          <Route path="/events/:id" element={<EventDetails />} /> {/* Route for event details page */}
          <Route path="/register" element={<RegistrationComponent baseUrl={baseUrl} />} /> {/* Route for registration page */}
        </Routes>
        <Footer /> {/* Footer component */}
      </div>
    </Router>
  );
}

export default App;
