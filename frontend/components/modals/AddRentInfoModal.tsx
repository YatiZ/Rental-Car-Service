'use client'
import React, { useEffect, useState } from 'react'
import Modal from '../Modal'
import useRentInfoModal from '@/app/hooks/useRentInfoModal'
import CustomBtn from '../CustomBtn'
import { getUserId } from '@/app/lib/action'
import apiService from '@/app/services/apiService'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const AddRentInfoModal = () => {
  const addRentInfoModal = useRentInfoModal();
  const [currentStep, setCurrentStep] = useState(1);
  const [renterName, setRenterName] = useState('');
  const [phoneno, setPhoneno] = useState('');
  const [address, setAddress] = useState('');
  const [driverLicense, setDriverLicenseNo] = useState('')
  const [licenseExpiration,setLicenseExpiration] = useState('')
  const [LicensePhoto, setLicensePhoto] = useState('')
  const [userId, setUserId] = useState<string|null>(null);
  const router = useRouter();

  useEffect(()=>{
    const fetchUserId = async()=>{
      const id = await getUserId();
      setUserId(id);
    };
    fetchUserId();
    
    const interval = setInterval(fetchUserId, 500);
    return ()=> clearInterval(interval);
  },[])
  console.log('User Id from add rent info',userId)

  const submitRenterInfo= async(e:React.FormEvent)=>{
    e.preventDefault();

    // const formData = new FormData();
    // formData.append('renter_name', renterName);
    //     formData.append('phonenumber', phoneno);
    //     formData.append('address', address);
    //     formData.append('driver_license_number', driverLicense);
    //     formData.append('license_expiration_date', licenseExpiration);
    //     formData.append('license_photo', LicensePhoto);
    const formData = {
      renter_name: renterName,
      phonenumber: phoneno,
      address: address,
      driver_license_number: driverLicense,
      license_expiration_date: licenseExpiration,
      license_photo: LicensePhoto
    }
    console.log('Form Data:', formData)
    try {
  
      const response = await axios.post(`http://localhost:8000/api/renter_info/${userId}`,formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
      },
      });

      // console.log('Response from renter info form:',response)
      if(response){
        router.push('/');
        addRentInfoModal.close()
      }
  
      
    } catch (error) {
      console.log(error)
    }
  }
  
  

  const content = (
    
    <div className="flex flex-col gap-y-4 mt-3">
      {currentStep == 1? (
         <><h2 className="">Your Info</h2>
      
           <input
                type="text"
                placeholder="your name"
                className="auth__input"
                value={renterName}
                onChange={(e)=>setRenterName(e.target.value)}
              />

           <input
                type="text"
                placeholder="your phone no"
                className="auth__input"
                value={phoneno}
                onChange={(e)=>setPhoneno(e.target.value)}
              />

           <input
                type="text"
                placeholder="your address"
                className="auth__input"
                value={address}
                onChange={(e)=>setAddress(e.target.value)}
              />
          
    
         <CustomBtn btnName='Next' onClick={()=>setCurrentStep(2)} btnStyles='next__btn'/>
         </>
      ): currentStep == 2? (
        <><h2 className="">Your Driver License Info</h2>
       
       <div className="flex flex-col gap-y-1">
       <label htmlFor='licenseDate'>License No:</label>
         <input
                type="text"
                placeholder="your driver license number"
                className="auth__input"
                value={driverLicense}
                onChange={(e)=>setDriverLicenseNo(e.target.value)}
              />
       </div>
        
       
       <div className="flex flex-col gap-y-1">
       <label htmlFor='licenseDate'>License Expiration Date:</label>
           <input
                type="date"
                className="auth__input"
                value={licenseExpiration}
                onChange={(e)=>setLicenseExpiration(e.target.value)}
              />
       </div>

        <CustomBtn btnName='Previous' onClick={()=>setCurrentStep(1)} btnStyles='previous__btn'/>
        <CustomBtn btnName='Next' onClick={()=>setCurrentStep(3)} btnStyles='next__btn'/>
        </>
      ):
      (
        <>
          <input
                type="file"
                placeholder="your phone no"
                className="auth__input"
                value={LicensePhoto}
                onChange={(e)=>setLicensePhoto(e.target.value)}
              />
        <CustomBtn btnName='Previous' onClick={()=>setCurrentStep(2)} btnStyles='previous__btn'/>
        <CustomBtn btnName='Submit' onClick={submitRenterInfo} btnStyles='submit__btn'/>
        </>
      )}
    </div>
  )
  return (
    <Modal label='Add rent info' isOpen={addRentInfoModal.isOpen} content={content} close={addRentInfoModal.close}/>
  )
}

export default AddRentInfoModal