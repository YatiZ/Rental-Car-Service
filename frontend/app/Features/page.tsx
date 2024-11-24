'use client'
import HomeCard from '@/components/HomeCard'
import SearchFilter from '@/components/SearchFilter'
import React, { useEffect, useState } from 'react'
import apiService from '../services/apiService'
import { CarType } from '@/types'
import {motion} from "framer-motion";
import FeatureLoading from '@/components/loading/FeatureLoading'

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
  const [loading, setLoading] = useState(true);
  
  //fetching data from backend through apiService.ts
  const getCarsList = async()=>{
    setLoading(true);
    try {
      // await new Promise((resolve)=>setTimeout(resolve,2500));
      const tmpCars = await apiService.get('/api/cars')
      setCars(tmpCars.data)
    } catch (error) {
      console.error(error)
    }finally{
      setLoading(false)
    }
   
  }
  // must add useEffect 
  useEffect(()=>{
    getCarsList()
  },[])
  return (

    <div>
       
       <SearchFilter cars={cars} loading={loading}/>
      
    </div>

  )
}

export default FeaturePage