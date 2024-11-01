'use client'
import AddRenterInfo from '@/components/AddRenterInfo'
import React, { useEffect, useState } from 'react'
import useRentInfoModal from '../hooks/useRentInfoModal'
import { CustomBtn } from '@/components';
import apiService from '../services/apiService';
import Link from 'next/link';
import { getUserId } from '../lib/action';

const AddRenterPage = () => {
    const [renterExists, setRenterExists] = useState<boolean|null>(null);
    const [errorMessage, setErrorMessage] = useState<string|null>(null);
    const addRentInfoModal = useRentInfoModal();

    useEffect(()=>{
        const renterInfoChecker = async()=>{
            const id = await getUserId()
            console.log('Id from renterinfo',id)
            try {
                const response = await apiService.get(`/api/renter_info_check/${id}`);
                console.log(response)
                if(response.renter_exists === true){
                    setRenterExists(true) 
                }else{
                    setRenterExists(false)
                }

            } catch (error) {
                setErrorMessage('An error occurred!');
            }
        }
        renterInfoChecker();
    },[])
    
    if(errorMessage) return <p>{errorMessage}</p>

    const handleRent=()=>{
        addRentInfoModal.open();
        console.log('Open')
      }
  return (
    <div>
        {renterExists ? <p>already filled</p> :
        <>
        <h1>You haven't filled your info yet!</h1>
        <CustomBtn btnName='Rent' onClick={handleRent} btnStyles='w-full bg-yellow-500 rounded-full border p-2 text-white hover:scale-110 transition' />
        </>
        
    }
        
    </div>
  )
}

export default AddRenterPage;