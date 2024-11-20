'use client'
import React, { useEffect, useId, useState } from 'react'
import Image from 'next/image'
import Modal from '../Modal'
import useRentInfoModal from '@/app/hooks/useRentInfoModal'
import CustomBtn from '../CustomBtn'
import { getUserId } from '@/app/lib/action'
import apiService from '@/app/services/apiService'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import useUpdateRentInfoModal from '@/app/hooks/useUpdateRentInfoModal'
import Link from 'next/link'

const UpdateRentInfoModal = () => {
  const updateRentInfoModal = useUpdateRentInfoModal();
  const [currentStep, setCurrentStep] = useState(1);
  const [renterName, setRenterName] = useState('');
  const [phoneno, setPhoneno] = useState('');
  const [address, setAddress] = useState('');
  const [driverLicense, setDriverLicenseNo] = useState('');
  const [licenseExpiration,setLicenseExpiration] = useState('');

  const [LicensePhoto, setLicensePhoto] = useState<File | null>(null);
  const [LicensePhotoPath, setLicensePhotoPath] = useState<string>('');

  const [userId, setUserId] = useState<string|null>(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');


  //trying not to get every render
  useEffect(() => {
    const fetchRenterInfo = async () => {
        const id = await getUserId();
        setUserId(id);
   
        if(id){
       
            const response = await apiService.get(`/api/renter_info_display/${id}?timestamp=${Date.now()}`)
            .then((response)=>{
              const renterData = response?.data || response || {};
     
              setRenterName(renterData.renter_name)
              setPhoneno(renterData.phonenumber)
              setAddress(renterData.address)
              setDriverLicenseNo(renterData.driver_license_number)
              setLicenseExpiration(renterData.license_expiration_date)
              const url = 'http://localhost:8000'
              const filePath = (`${url}${renterData.license_photo}`);
              setLicensePhotoPath(filePath)
            })
            
        }
        
        
        
    };
    fetchRenterInfo();
}, []);



  const handleChangePhoto =(e:React.ChangeEvent<HTMLInputElement>)=>{
    const file = e.target.files ? e.target.files[0] : null;
    if(file){
      setLicensePhoto(file);
     const preview = URL.createObjectURL(file); 
      setLicensePhotoPath(preview);

    }else{
      console.error("No file selected");
    }
   
  }

  const submitRenterInfo= async(e:React.FormEvent)=>{
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('renter_name', renterName);
    formData.append('phonenumber', phoneno);
    formData.append('address', address);
    formData.append('driver_license_number', driverLicense);
    formData.append('license_expiration_date', licenseExpiration);
    
    if(LicensePhoto){
        formData.append('license_photo', LicensePhoto);
    }
   


    try {
  
      const response = await axios.patch(`http://localhost:8000/api/update_renter_info/${userId}`,formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
      },
      });

   
      if(response.data.success === true){
        setAlertMessage('');
        setSuccessMessage(response.data.message);
        useEffect(()=>{
          if(successMessage){
            setTimeout(()=>{
              setSuccessMessage('')
            },2000)
          }
        },[successMessage])
        updateRentInfoModal.close()
      
      
      }else{
        setAlertMessage('Must fill data!')
      }
  

    } catch (error) {
      console.log(error)
    }
  };
  

  const content = (
    <>
          {successMessage && (
        <div
          className="flex bg-green-100 rounded-lg p-4 mb-4 text-sm text-green-700"
          role="alert"
        >
          <svg
            className="w-5 h-5 inline mr-3"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            ></path>
          </svg>
          <div>
            <span className="font-medium">Success alert!</span> {successMessage}
          </div>
        </div>
      )}
      {alertMessage && (
        <div
          className="flex bg-red-100 rounded-lg p-4 mb-4 text-sm text-red-700"
          role="alert"
        >
          <svg
            className="w-5 h-5 inline mr-3"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            ></path>
          </svg>
          <div>
            <span className="font-medium">Danger alert!</span> {alertMessage}
          </div>
        </div>
      )}
  
    <form className="flex flex-col gap-y-4 mt-3">
      {currentStep == 1? (
         <><h2 className="border-b-4 border-b-blue-700 w-fit">Renter Information</h2>
      
           <input
                type="text"
                placeholder="your name"
                className="auth__input"
                value={renterName}
                onChange={(e)=>setRenterName(e.target.value)}
                required
              />

           <input
                type="text"
                placeholder="your phone no"
                className="auth__input"
                value={phoneno}
                onChange={(e)=>setPhoneno(e.target.value)}
                required
              />

           <input
                type="text"
                placeholder="your address"
                className="auth__input"
                value={address}
                onChange={(e)=>setAddress(e.target.value)}
                required
              />
          
    
         <CustomBtn btnName='Next' onClick={()=>setCurrentStep(2)} btnStyles='next__btn'/>
         </>
      ): currentStep == 2? (
        <><h2 className="border-b-4 border-b-blue-700 w-fit">Your Driver License Info</h2>
       
       <div className="flex flex-col gap-y-1">
       <label htmlFor='licenseDate'>License No:</label>
         <input
                type="text"
                placeholder="your driver license number"
                className="auth__input"
                value={driverLicense}
                onChange={(e)=>setDriverLicenseNo(e.target.value)}
                required
              />
       </div>
        
       
       <div className="flex flex-col gap-y-1">
       <label htmlFor='licenseDate'>License Expiration Date:</label>
           <input
                type="date"
                className="auth__input"
                value={licenseExpiration}
                onChange={(e)=>setLicenseExpiration(e.target.value)}
                required
              />
       </div>

        <CustomBtn btnName='Previous' onClick={()=>setCurrentStep(1)} btnStyles='previous__btn'/>
        <CustomBtn btnName='Next' onClick={()=>setCurrentStep(3)} btnStyles='next__btn'/>
        </>
      ):
      (
        <>
       
        {successMessage? <div className='next__btn text-center'>
            {/* <Link href='/Features'>Explore Cars</Link> */}
        </div>:<>

          <h1 className='border-b-4 border-b-blue-700 w-fit'>Upload renter license photo</h1>
        
          <input
                type="text"
                
                className="auth__input"
                value={LicensePhotoPath}
                onChange={()=>document.getElementById("fileInput")?.click()}
               
                readOnly
              />
         <input
                type="file"
                id='fileInput'
                // className="hidden"
                
                onChange={handleChangePhoto}
                accept="image/*"
              />
            <Image src={LicensePhotoPath} alt='license-pic' width={200} height={200}/>
          <CustomBtn btnName='Previous' onClick={()=>setCurrentStep(2)} btnStyles='previous__btn'/>
          <CustomBtn btnName='Submit' onClick={submitRenterInfo} btnStyles='submit__btn'/>
        </>}
        
        </>
      )}
    </form>


    </>
  )
  return (


     <Modal label='Add rent info' isOpen={updateRentInfoModal.isOpen} content={content} close={updateRentInfoModal.close}/>

   
  )
}

export default UpdateRentInfoModal;