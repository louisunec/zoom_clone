'use client'

import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils';
import { avatarImages } from '@/constants';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';

interface MeetingCardProps {
    icon: string;
    title: string;
    date: string;
    isPreviousMeeting: boolean;
    buttonIcon1?: string;
    buttonText?: string;
    handleClick: () => void;
    link: string;
}

const MeetingCard = ({icon, title, date, handleClick, link, isPreviousMeeting, 
buttonIcon1, buttonText}: MeetingCardProps) => {
    const { toast } = useToast();

  return (
    <section className='flex flex-col justify-between w-full xl:max-w-[568px] min-h-[258px] 
    rounded-[14px] px-5 py-8 bg-dark-1 '>
        <article className='flex flex-col gap-5'>
            <Image 
                src={icon}
                alt="upcoming"
                width={28}
                height={28}
            />
            <div className='flex justify-between'>
                <div className='flex flex-col gap-2'>
                    <h1 className='text-2xl font-bold'>{title}</h1>
                    <p className='text-base font-normal'>{date}</p>
                </div>
            </div>
        </article>
        <article className={cn("flex justify-center relative", {})}>
            <div className='relative flex w-full max-sm:hidden'>
                {avatarImages.map((img, index) => (
                    <Image 
                        key={index}
                        src={img}
                        alt="attendees"
                        width={40}
                        height={40}
                        className={cn('rounded-full', {absolute: index > 0})}
                        style={{ top:0, left: index * 28}}
                    />
                ))}
                <div className='flex-center absolute left-[136px] size-10 rounded-full
                border-[5px] border-dark-3 bg-dark-4'>
                    +9
                </div>
            </div>
            {!isPreviousMeeting && (
                <div className='flex gap-2'>
                    <Button 
                        className='rounded bg-blue-1 px-6'
                        onClick={handleClick} 
                    >
                        {buttonIcon1 && (
                            <Image 
                                src={buttonIcon1}
                                alt="feature"
                                width={20}
                                height={20}
                            />
                        )} &nbsp; {buttonText}
                    </Button>
                    <Button 
                        className='bg-dark-4 px-6'
                        onClick={()=> {navigator.clipboard.writeText(link);
                        toast({
                            title: "Link Copied",
                        });
                    }}
                    >
                        <Image 
                            src="/icons/copy.svg"
                            alt="feature"
                            width={20}
                            height={20}
                        />
                        &nbsp; Copy Link
                    </Button>
                </div>
            )}
        </article>
    </section>
  )
}

export default MeetingCard