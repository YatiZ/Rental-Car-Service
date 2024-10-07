'use client'
import { CustomBtnProps } from '@/types'
import React from 'react'


const CustomBtn = ({btnName, btnStyles, btnType, onClick}:CustomBtnProps) => {
  return (
    <button disabled={false} className={`${btnStyles}`} type={btnType || 'button'} onClick={onClick}>
        <span>{btnName}</span>
    </button>
  )
}

export default CustomBtn