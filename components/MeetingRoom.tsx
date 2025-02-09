import { 
    CallParticipantsList,
    PaginatedGridLayout,
    SpeakerLayout,
    CallControls,
    CallStatsButton,
    useCallStateHooks,
    CallingState,
} from '@stream-io/video-react-sdk'
import React, { use } from 'react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useSearchParams, useRouter } from 'next/navigation'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { LayoutList, Loader, Users } from 'lucide-react'
import EndCallButton from './EndCallButton'
  



type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right' 

const MeetingRoom = () => {
    const searchParams = useSearchParams()
    const isPersonalRoom = !!searchParams.get('personal')
    const [layout, setLayout] = useState<CallLayoutType>('speaker-left')
    const [showParticipants, setShowParticipants] = useState(false);
    const router = useRouter()

    const { useCallCallingState } = useCallStateHooks();
    const callingState = useCallCallingState()

    if (callingState !== CallingState.JOINED) return <Loader />

    const CallLayout = () => {
        switch (layout) {
            case 'grid':
                return <PaginatedGridLayout />
            case 'speaker-right':
                return <SpeakerLayout participantsBarPosition='left' />
            default:
                return <SpeakerLayout participantsBarPosition='left' />
        }
    }

  return (
    <section className='relative h-screen w-full overflow-hidden
    pt-4 text-white'>
        <div className='relative flex size-full items-center
        justify-center'>
            <div className='flex size-full max-w-[1000px] 
            items-center'>
                <CallLayout />
            </div>
            <div className={cn('h-[calc(100vh-86px)] hidden ml-2',
        {'show-block': showParticipants})}>
                <CallParticipantsList onClose={() => 
                    setShowParticipants(false)} 
                />
            </div>
        </div>

        <div className='flex fixed bottom-0 w-full items-center
        justify-center gap-5 flex-wrap'>
            <CallControls onLeave={() => router.push('/')} />

            <DropdownMenu>
                <div className='flex items-center'>
                    <DropdownMenuTrigger className='cursor-pointer
                    rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'>
                        <LayoutList size={20} className='text-white' />
                    </DropdownMenuTrigger>
                </div>
                <DropdownMenuContent className='border-dark-1 bg-dark-1
                text-white'>
                    {['grid', 'speaker-left', 'speaker-right'].map((item, index) => (
                        <div key={index}>
                            <DropdownMenuItem 
                            className='cursor-pointer'
                            onClick={()=> setLayout(item.toLowerCase() as CallLayoutType)}
                            >
                                {item}
                            </DropdownMenuItem>

                            <DropdownMenuSeparator className='border-dark-1' />
                        </div>
                    ))}
                   
                </DropdownMenuContent>
            </DropdownMenu>

            <CallStatsButton />
            <button onClick={() => setShowParticipants((prev) => !prev)}>
                <div className='cursor-pointer rounded-2xl bg-[#19232d] 
                px-4 py-2 hover:bg-[#4c535b]'>
                    <Users size={20} className='text-white' />
                </div>
            </button>
            {!isPersonalRoom && <EndCallButton />}
        </div>
    </section>
  )
}

export default MeetingRoom