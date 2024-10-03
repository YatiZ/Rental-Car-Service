'use client'
import { HomeCard } from '@/components'
import SearchFilter from '@/components/SearchFilter'
import React, { useEffect, useState } from 'react'
import apiService from '../services/apiService'
import { CarType } from '@/types'

// for types for Home Model


const FeaturePage = () => {
  const [cars, setCars] = useState<CarType[]>([]);
  
  //fetching data from backend through apiService.ts
  const getCarsList = async()=>{
    const tmpCars = await apiService.get('/api/cars')
    setCars(tmpCars.data)
    console.log('car-list:',tmpCars.data)
  }
  // must add useEffect 
  useEffect(()=>{
    getCarsList()
  },[])
  return (
    <div>
       <div className="flex space-x-6 items-center justify-center">
       <SearchFilter/>
       </div>
        <div className='home__card-wrappers'>
      {cars.map((car)=>{
        return (
          <HomeCard  key={car.id} car={car}/>
        )
      })}
        </div>
   
    </div>
  )
}

export default FeaturePage