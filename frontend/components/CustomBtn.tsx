'use client'
import { CustomBtnProps } from '@/types'
import React from 'react'

const CustomBtn = ({btnName, btnStyles, btnType, handleClick}:CustomBtnProps) => {
  return (
    <button disabled={false} className={`${btnStyles}`} type={btnType || 'button'} onClick={()=> {handleClick}}>
        <span>{btnName}</span>
    </button>
  )
}

export default CustomBtn