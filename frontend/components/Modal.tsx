import React, { useEffect, useState } from 'react'

interface ModalProps{
    label: string;
    content: React.ReactElement;
    isOpen: Boolean;
    close: ()=>void;

}

const Modal = ({label, content, isOpen, close}:ModalProps) => {
    const [showModal, setShowModal] = useState(isOpen);

    useEffect(()=>{
        setShowModal(isOpen)
    },[isOpen])

    const handleClose = ()=>{
        setShowModal(false)

        
    }

  return (
    <div className='bg-white'>
        {label}
        <div onClick={handleClose}>Close</div>
        {content}
    </div>
  )
}

export default Modal