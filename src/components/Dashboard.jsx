import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LoadingButtonUniversal from './LoadingButtonUniversal';
import { RiDeleteBin5Line, RiEdit2Line } from 'react-icons/ri';
import { GrLocation } from "react-icons/gr";
import { IoTimerOutline } from "react-icons/io5";
import { TbListDetails } from "react-icons/tb";
import { CiCalendarDate } from "react-icons/ci";
import { useGlobalState } from '../GlobalState';

const ManageEvents = () => {
  const { state } = useGlobalState();

  const API_URL = state.baseUrl + '/events';

  // Component State
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('Add Event');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [eventToEdit, setEventToEdit] = useState(null);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [confirmEventName, setConfirmEventName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      setLoadingEvents(true);
      try {
        const response = await axios.get(API_URL);
        setEvents(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoadingEvents(false);
      }
    };
    fetchEvents();
  }, [API_URL]);


  // Filtered events based on the search term
  const filteredEvents = events.filter(event =>
    (event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     event.description.toLowerCase().includes(searchTerm.toLowerCase()))
);



  // Submit both new or edited task
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {

      //Toggle between editing mode and creating mode
      if (eventToEdit) {
        await axios.put(`${API_URL}/${eventToEdit.id}`, {
          name, date, time, description, location
        });
        setMessage('Event updated!');
      } else {
        const user = state.clientData.userData;
        await axios.post(API_URL, {
          name, date, time, description, location, owner_id: user.email, owner_name: user.name
        });
        setMessage('Event created!');
      }

      setName('');
      setDate('');
      setTime('');
      setDescription('');
      setLocation('');
      setEventToEdit(null);
      setShowModal(false);
      window.location.reload();
    } catch (error) {
      setMessage(error.response ? error.response.data.message : error.message);
      if (!message) {
        setMessage("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };



  //delete events
  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/${eventToDelete.id}`);
      setMessage('Event deleted!');
      setShowModal(false);
      window.location.reload();
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
    }
  };



  //Set value of events to be edited to the event clicked
  const openEditModal = (event) => {
    setEventToEdit(event);
    setName(event.name);
    setDate(event.date);
    setTime(event.time);
    setDescription(event.description);
    setLocation(event.location);
    setShowModal(true);
  };

  const openAddModal = () => {
    setEventToEdit(null);
    setName('');
    setDate('');
    setTime('');
    setDescription('');
    setLocation('');
    setShowModal(true);
  };

  const openDeleteModal = (event) => {
    setEventToDelete(event);
    setConfirmEventName('');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEventToEdit(null);
    setEventToDelete(null);
    setConfirmEventName('');
  };

  return (
    <>
{/* 
    adding event button

     */}
      {state.isLoggedIn || state.isAdminLoggedIn ? (
        <div className="px-6  md:px-16 pt-24 pb-24">
          <div className="mx-auto md:flex flex-col items-center justify-flexstart mt-8 p-12 bg-lightShade border shadow-md">
            {error && <p className="text-sm text-red-400 mb-4">{error}</p>}
            <button
              onClick={openAddModal}
              className="mb-4 px-4 py-2 bg-blue-500 md:w-[70%]  text-white rounded"
            >
              Add Event
            </button>

{/* 
        Search by name or description/details */}


            <input
              type="text"
              placeholder="Search name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 mb-4 border rounded-md md:w-[70%]"
            />
            {loadingEvents ? (
              <p>Loading...</p>
            ) : (
              <>

                {/* load events */}


                {filteredEvents.length > 0 ? (
                  <div className="space-y-4 md:flex flex-wrap justify-center items-center gap-8 ">
                    {/* <h2 className="mb-6 text-3xl font-semibold text-gray-600">Upcoming Events</h2> */}
                    {filteredEvents.map(event => (
                      <div key={event.id} className="flex items-center md:w-[40%] p-4 bg-white rounded-md shadow-md md:flex relative">
                        <div className="flex-grow gap-4 flex flex-col ">
                          <h3 className="text-xl font-medium text-gray-700">{event.name}</h3>
                          <p className="text-gray-500"><CiCalendarDate /> {event.date}</p>
                          <p className="text-gray-500"><IoTimerOutline /> {event.time}</p>
                          <p className="text-gray-500"><TbListDetails /> {event.description}</p>
                          <p className="text-gray-500"><GrLocation /> {event.location}</p>
                          <Link to={`/events/${event.id}`} className="text-lightShade block bg-darkShade rounded-lg my-6 py-2 px-6 w-32 text-center">Details</Link>
                        </div>
                        <button
                          onClick={() => openEditModal(event)}
                          className="text-gray-700 border-b-[0px] rounded-full bg-yellow-200 p-2 shadow-md absolute top-2 right-12"
                        >
                          <RiEdit2Line />
                        </button>
                        <button
                          onClick={() => openDeleteModal(event)}
                          className="text-gray-700 border-b-[0px] rounded-full bg-red-200 p-2 shadow-md absolute top-2 right-2"
                        >
                          <RiDeleteBin5Line />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No events found</p>
                )}
              </>
            )}
          </div>
        </div>
      ) : (

        // if user not logged in, prompt them to


        <div className="h-screen flex flex-col gap-8 items-center justify-center text-darkShade">
          <h1 className="text-6xl">Login to view tasks</h1>
          <Link to="/login" className="underline">Login</Link>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-[1]">
          <div className="bg-white p-8 mx-3 shadow-md rounded-md w-full max-w-md">
            {eventToDelete ? (
              <>
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Confirm Deletion</h2>
                <p className="mb-4">Are you sure you want to delete the event <strong>{eventToDelete.name}</strong>? Please type the name of the event to confirm.</p>
                <input
                  type="text"
                  value={confirmEventName}
                  onChange={(e) => setConfirmEventName(e.target.value)}
                  placeholder="Type event name"
                  className="w-full p-2 mb-4 border rounded-md"
                />
                <div className="flex justify-end">
                  <button
                    onClick={closeModal}
                    className="bg-gray-500 text-white py-2 px-4 rounded-md mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className={`bg-red-500 text-white py-2 px-4 rounded-md ${confirmEventName !== eventToDelete.name ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={confirmEventName !== eventToDelete.name}
                  >
                    Delete
                  </button>
                </div>
              </>
            ) : (
              <>

{/* 
              Form to edit or add an ebvent

               */}
                <h2 className="mb-6 text-3xl font-semibold text-gray-600">{eventToEdit ? 'Edit Event' : 'Create Event'}</h2>
                {error && <p className="text-sm text-red-400 mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">


                  {/* event name */}
                  <div>
                    <label className="block text-gray-700 text-lg font-semibold">Event Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter event name"
                      className="w-full p-2 bg-gray-100 rounded-md"
                      required
                    />
                  </div>


                  {/* Event duedate */}
                  <div>
                    <label className="block text-gray-700 text-lg font-semibold">Date</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full p-2 bg-gray-100 rounded-md"
                      required
                    />
                  </div>

                  {/* Event Duetime */}
                  <div>
                    <label className="block text-gray-700 text-lg font-semibold">Time</label>
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full p-2 bg-gray-100 rounded-md"
                      required
                    />
                  </div>

                  {/* event description */}
                  <div>
                    <label className="block text-gray-700 text-lg font-semibold">Description</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter description"
                      className="w-full p-2 bg-gray-100 rounded-md"
                      rows="4"
                      required
                    ></textarea>
                  </div>


                  {/* event location */}
                  <div>
                    <label className="block text-gray-700 text-lg font-semibold">Location</label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Enter location"
                      className="w-full p-2 bg-gray-100 rounded-md"
                      required
                    />
                  </div>


                  {/* buttons */}
                  <div className='flex'>
                    <button
                      type="submit"
                      className={`w-full py-2 mt-6 flex justify-center bg-darkShade text-white rounded-md shadow-md ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                      disabled={isLoading}
                    >
                      <LoadingButtonUniversal
                        text={message}
                        loading={isLoading} />
                    </button>
                    <button onClick={() => setShowModal(false)} className={`w-full py-2 mt-6 flex justify-center items-center text-red-500`}>
                      Cancel
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ManageEvents;
