import MeetingTypeList from '@/components/MeetingTypeList';
import React from 'react'

const Home = () => {
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const date = new Date().toDateString();

  return (
    <section className='flex size-full flex-col gap-5 text-white'>
     <div className='h-[303px] w-full rounded-[20px] bg-hero bg-cover'>
        <div className='flex flex-col h-full justify-between max-md:px-5
        max-md:py-8 lg:p-11'>
          <h2 className='glassmorphism max-w-[273px] rounded py-2
          text-center text-base font-normal mt-20 mb-5'>
            Upcoming Meeting at: 12:30 PM
          </h2>
          <div className='flex flex-col gap-2'>
            <h1 className='text-4xl font-extrabold lg:text-7xl'>
              {time}
            </h1>
            <p className='text-lg font-medium text-sky-1
            lg:text-2xl'>
              {date}
            </p>
          </div>
        </div>
     </div>

     <MeetingTypeList />
    </section>
  )
}

export default Home