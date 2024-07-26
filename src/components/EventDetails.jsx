import React from 'react';
import { useGlobalState } from '../GlobalState';
import { useParams } from 'react-router-dom';
import { CiCalendarDate } from 'react-icons/ci';
import { IoTimerOutline } from 'react-icons/io5';
import { TbListDetails } from 'react-icons/tb';
import { GrLocation } from 'react-icons/gr';

const EventDetails = () => {
  const { state } = useGlobalState();
  const { id } = useParams(); // Get the 'id' parameter from the URL
  const event = state.allEvents.find(event => event.id === id); // Find the event with the matching id
console.log(state.allEvents, id)
  if (!event) {
    return <div className='py-64 text-center bg-darkShade text-3xl px-6 md:px-16 text-lightShade'>Event not found </div>;
  }

  return (
    <div className='bg-darkShade'>
      <div className='pt-24 relative'>
        <div className='relative'>
          <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-darkShade to-transparent p-6'>
            <h1 className='text-lightShade text-3xl font-bold'>{event.name}</h1>
          </div>
          <img src={event.image} alt={event.name} className='w-full  h-auto' />
        </div>
      </div>
      <div className='p-6 mt-6 md:p-16'>
        <p className='text-lightShade'><CiCalendarDate /> {event.date}</p>
        <p className='text-lightShade'><IoTimerOutline /> {event.time}</p>
        <p className='text-lightShade'><TbListDetails /> {event.description}</p>
        <p className='text-lightShade'><GrLocation /> {event.location}</p>
      </div>
    </div>
  );
};

export default EventDetails;
