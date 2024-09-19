'use client'
import { HomeCard } from '@/components'
import SearchFilter from '@/components/SearchFilter'
import React, { useEffect, useState } from 'react'
import apiService from '../services/apiService'
import { HomeType } from '@/types'

// for types for Home Model


const FeaturePage = () => {
  const [homes, setHomes] = useState<HomeType[]>([]);
  
  //fetching data from backend through apiService.ts
  const getHomesList = async()=>{
    const tmpHomes = await apiService.get('/api/homes')
    setHomes(tmpHomes.data)
  }
  // must add useEffect 
  useEffect(()=>{
    getHomesList()
  },[])
  return (
    <div>
       <div className="flex space-x-6 items-center justify-center">
       <SearchFilter/>
       </div>
        <div className='home__card-wrappers'>
      {homes.map((home)=>{
        return (
          <HomeCard  key={home.id} home={home}/>
        )
      })}
        </div>
   
    </div>
  )
}

export default FeaturePage