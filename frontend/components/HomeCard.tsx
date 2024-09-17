'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { CustomBtn } from '.';
import Link from 'next/link';
import { HomeType } from '@/app/Features/page';

interface HomeProps{
  home: HomeType
  
}
const HomeCard:React.FC<HomeProps> = ({home}) => {
  
  const handleRent=()=>{
    
  }
  return (
    <div className='home__card-container'>
       <div className='relative w-full h-60 overflow-hidden rounded-xl'>
        <Image src="/dummy-home.jpg" alt='home' fill 
        className='object-cover hover:scale-110 w-full h-full'/>

       </div>

       <div className='mt-2'>
        <h1 className='flex items-center justify-center'>{home.title}</h1>
        
        <div className='flex justify-between mb-3'>
         <p className='text-lg'><strong>$200</strong></p>
         
         <div className='flex gap-2'>
         <svg className='hover:opacity-100 opacity-60' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#3b82f6"} fill={"none"}>
    <path d="M10.7184 6.86177L15 16C12.8333 16 12.1739 14.8571 9.91304 13.7143C8.10435 12.8 5.57971 12.9524 4.82609 13.1429L7.85739 10.9998C8.16585 10.7817 8.32008 10.6727 8.36937 10.5067C8.41866 10.3407 8.34893 10.1651 8.20947 9.81406L7.78519 8.74593C7.62654 8.34653 7.54721 8.14683 7.40384 8.00197C7.35388 7.9515 7.2987 7.9065 7.23922 7.86772C7.06848 7.7564 6.8569 7.71887 6.43376 7.64379L3.18315 7.06706C2.4987 6.94562 2 6.35065 2 5.65551C2 4.78222 2.77418 4.11181 3.63851 4.23665L8.0343 4.87152C8.82604 4.98586 9.22191 5.04304 9.5521 5.23177C9.68974 5.31045 9.81754 5.40521 9.93281 5.51407C10.2093 5.7752 10.379 6.13739 10.7184 6.86177Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="19" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 18.0843C3.05556 14.5527 7.7685 16.1736 11.5 18.0843C15.2315 19.995 19 21.2108 21 18.0843" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
</svg>


{/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#3b82f6" fill="none">
    <path d="M8.25 14.5C10.25 12.5 13.75 12.5 15.75 14.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M18.5 11.5C14.7324 8.16667 9.5 8.16667 5.5 11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M2 8.5C8.31579 3.16669 15.6842 3.16668 22 8.49989" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="12" cy="18" r="1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
</svg> */}

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#3b82f6"} fill={"none"}>
    <path d="M17.5 19V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.5 19V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 10C4 6.22876 4 4.34315 5.17157 3.17157C6.34315 2 8.22876 2 12 2C15.7712 2 17.6569 2 18.8284 3.17157C20 4.34315 20 6.22876 20 10V13C20 15.8284 20 17.2426 19.1213 18.1213C18.2426 19 16.8284 19 14 19H10C7.17157 19 5.75736 19 4.87868 18.1213C4 17.2426 4 15.8284 4 13V10Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M7 16H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 16H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 8L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M22 8L22 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4.5 5L19.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M4.5 13L19.5 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 13V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
</svg>
         </div>
        
        </div>
    
        <hr />
        <p> Address-Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, consequuntur consectetur magni aut est tempore illum dolorem ullam, perferendis, ratione iure doloremque minus. Quia unde amet, deleniti rerum illum ex?</p>
        
        <div className='mt-3 flex gap-4'>
          <CustomBtn btnName='Rent' handleClick={handleRent} btnStyles='w-full bg-yellow-500 rounded-full border p-2 text-white hover:scale-110 transition' />

          {/* <CustomBtn btnName='More Info' handleClick={handleRent} btnStyles='w-full bg-blue-500 rounded-full border p-2 text-white hover:scale-110 transition' /> */}
          <Link className='w-full text-center bg-blue-500 rounded-full border p-2 text-white hover:scale-110 transition'  href='/HomeDetail/id'>More Info</Link>
        </div>
       </div>
       
    </div>
    
  )
}

export default HomeCard
