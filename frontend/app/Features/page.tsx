import { HomeCard } from '@/components'
import SearchFilter from '@/components/SearchFilter'
import React from 'react'

const FeaturePage = () => {
  return (
    <div>
       <div className="flex space-x-6 items-center justify-center">
       <SearchFilter/>
       </div>
        <div className='home__card-wrappers'>
        <HomeCard />
        <HomeCard />
        <HomeCard />
        <HomeCard />
        </div>
   
    </div>
  )
}

export default FeaturePage