'use client'
import AddRenterInfo from '@/components/AddRenterInfo'
import React from 'react'
import useRentInfoModal from '../hooks/useRentInfoModal'
import { CustomBtn } from '@/components';

const AddRenterPage = () => {
    const addRentInfoModal = useRentInfoModal();
    const handleRent=()=>{
        addRentInfoModal.open();
        console.log('Open')
      }
  return (
    <div>
        <h1>You haven't filled your info yet!</h1>
        <CustomBtn btnName='Rent' onClick={handleRent} btnStyles='w-full bg-yellow-500 rounded-full border p-2 text-white hover:scale-110 transition' />
    </div>
  )
}

export default AddRenterPage;