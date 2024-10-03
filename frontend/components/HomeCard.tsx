'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { CustomBtn } from '.';
import Link from 'next/link';
import { CarType } from '@/types';
import useRentInfoModal from '@/app/hooks/useRentInfoModal';

interface CarProps{
  car: CarType
  
}
const HomeCard:React.FC<CarProps> = ({car}) => {
  const openRentInfoBox = useRentInfoModal();
  console.log('Home Data:', car);
  // const additionalImages = home.images?.map(imgObj => `http://localhost:8000${imgObj.image}`);
  // console.log('Additional Images:', additionalImages);
  const handleRent=()=>{
    openRentInfoBox.open();
    console.log('Open')
  }
  return (
    <div className='home__card-container'>
       <div className='relative w-full h-60 overflow-hidden rounded-xl'>
        <Image src={`http://localhost:8000${car.main_img}`} alt='car' fill
        className='object-cover hover:scale-110 w-full h-full'/>

       </div>

       <div className='mt-2'>
        <h1 className='flex items-center justify-center'>{car.brand}</h1>
        
        <div className='flex justify-between mb-3'>
         <p className='text-lg'><strong>${car.price_per_day}</strong></p>
         
         <div className='flex gap-2'>


         </div>
        
        </div>
    
        <hr />
        <p> 
          {car.description}
        </p>

        <div className='mt-3 flex gap-4'>
          <CustomBtn btnName='Rent' onClick={handleRent} btnStyles='w-full bg-yellow-500 rounded-full border p-2 text-white hover:scale-110 transition' />

          {/* <CustomBtn btnName='More Info' handleClick={handleRent} btnStyles='w-full bg-blue-500 rounded-full border p-2 text-white hover:scale-110 transition' /> */}
          <Link className='w-full text-center bg-blue-500 rounded-full border p-2 text-white hover:scale-110 transition'  href={`CarDetail/${car.id}`}>More Info</Link>
        </div>
       </div>
       
    </div>
    
  )
}

export default HomeCard
