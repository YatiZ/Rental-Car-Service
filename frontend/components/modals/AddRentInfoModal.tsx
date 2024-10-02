'use client'
import React, { useState } from 'react'
import Modal from '../Modal'
import useRentInfoModal from '@/app/hooks/useRentInfoModal'
import CustomBtn from '../CustomBtn'

const AddRentInfoModal = () => {
  const addRentInfoModal = useRentInfoModal();
  const [currentStep, setCurrentStep] = useState(1);
  const content = (
    <>
      {currentStep == 1? (
         <><h2 className="">Your Info</h2>
         <CustomBtn btnName='Next' onClick={()=>setCurrentStep(2)}/>
         </>
      ): currentStep == 2? (
        <><h2 className="">Your Info</h2>
        <CustomBtn btnName='Previous' onClick={()=>setCurrentStep(1)}/>
        <CustomBtn btnName='Next' onClick={()=>setCurrentStep(3)}/>
        </>
      ):
      (
        <></>
      )}
      <div>Hello it is me</div>
    </>
  )
  return (
    <Modal label='Add rent info' isOpen={addRentInfoModal.isOpen} content={content} close={addRentInfoModal.close}/>
  )
}

export default AddRentInfoModal