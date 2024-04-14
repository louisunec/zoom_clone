'use client'

import React from 'react'
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import { useState } from 'react';
import MeetingRoom from '@/components/MeetingRoom';
import MeetingSetUp from '@/components/MeetingSetUp';
import { useGetCallById } from '@/hooks/useGetCallById';
import Loader from '@/components/Loader';

const MeetingPage = ({ params: {id} }: { params: { id: string } }) => {
  const { user, isLoaded } = useUser();
  const [isSetUpComplete, setIsSetUpComplete] = useState(false);
  const { call, isCallLoading } = useGetCallById(id);

  if (!isLoaded || isCallLoading) return <Loader />

  return (
    <main className='h-screen w-full'>
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetUpComplete ? (<MeetingSetUp setIsSetUpComplete={setIsSetUpComplete} />): 
          (<MeetingRoom />) }
        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default MeetingPage