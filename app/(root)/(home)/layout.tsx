import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import React, { ReactNode } from 'react'
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "YOOM",
  description: "Video conferencing app",
  icons:{
    icon: "/icons/logo.svg"
  }
};

const HomeLayout = ({ children } : { children: ReactNode }) => {
  return (
    <main className='relative'>
        <Navbar />

        <div className='flex'>
            <Sidebar />

            <section className='flex min-h-screen flex-1 flex-col 
            px-6 pb-6 pt-28 max-md:pb-14 sm:px-14'>

            </section>
                <div className='w-full'>
                    {children}
                </div>
        </div>
    </main>
  )
}

export default HomeLayout