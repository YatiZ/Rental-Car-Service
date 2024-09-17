'use client'
import { HomeCard } from '@/components'
import SearchFilter from '@/components/SearchFilter'
import React, { useEffect, useState } from 'react'
import apiService from '../services/apiService'

export type HomeType ={
  id: string;
  title: string;
  price_per_month: number;
  address: string;
}

const FeaturePage = () => {
  const [homes, setHomes] = useState<HomeType[]>([]);
  
  const getHomesList = async()=>{
    const tmpHomes = await apiService.get('/api/homes')
    setHomes(tmpHomes.data)
  }

  useEffect(()=>{
    apiService.get('/api/homes')
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