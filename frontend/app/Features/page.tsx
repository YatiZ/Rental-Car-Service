'use client'
import HomeCard from '@/components/HomeCard'
import SearchFilter from '@/components/SearchFilter'
import React, { useEffect, useState } from 'react'
import apiService from '../services/apiService'
import { CarType } from '@/types'
import {motion, AnimatePresence, delay} from "framer-motion";

// for types for Home Model

const containerVarients = {
  hidden: {
    opacity: 0,
    x: "100vw",
  },
  visible: {
    opacity: 1,
    x: 0,
    trasition: {
      type: "spring",
    },
  },
  exit:{
    x: '-100vh',
    transition: {ease: 'easeInOut'}
  }
};

const FeaturePage = () => {
  const [cars, setCars] = useState<CarType[]>([]);
  
  //fetching data from backend through apiService.ts
  const getCarsList = async()=>{
    const tmpCars = await apiService.get('/api/cars')
    setCars(tmpCars.data)
    // console.log('car-list:',tmpCars.data)
  }
  // must add useEffect 
  useEffect(()=>{
    getCarsList()
  },[])
  return (

    <motion.div variants={containerVarients} initial='hidden' animate='visible' exit='exit'>
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
   
    </motion.div>

  )
}

export default FeaturePage