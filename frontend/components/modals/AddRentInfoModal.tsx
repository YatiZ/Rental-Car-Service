'use client'
import React from 'react'
import Modal from '../Modal'
import useRentInfoModal from '@/app/hooks/useRentInfoModal'

const AddRentInfoModal = () => {
  const addRentInfoModal = useRentInfoModal();
  const content = (
    <>
      <div>Hello it is me</div>
    </>
  )
  return (
    <Modal label='Add rent info' isOpen={addRentInfoModal.isOpen} content={content} close={addRentInfoModal.close}/>
  )
}

export default AddRentInfoModal