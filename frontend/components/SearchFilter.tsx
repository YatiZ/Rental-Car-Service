
import React from 'react'


const SearchFilter = () => {
  return (
    <div className='h-[64px] w-[500px] shadow-xl mt-4 flex flex-row items-center justify-between border rounded-full'>
        <input type="text" placeholder='Type your message ...' className='w-full ml-2 px-3 py-3 bg-gray-200 rounded-full' />
        <div className='p-2'>
        <div className="p-2 lg:p-4 cursor-pointer btn__color hover:bg-blue-600 transition rounded-full text-white">
          <svg
            viewBox="0 0 32 32"
            style={{
              display: "block",
              fill: "none",
              height: "16px",
              width: "16px",
              stroke: "currentColor",
              strokeWidth: 4,
              overflow: "visible",
            }}
            aria-hidden="true"
            role="presentation"
            focusable="false"
          >
            <path
              fill="none"
              d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"
            ></path>
          </svg>
        </div>
        </div>
     
    </div>
  )
}

export default SearchFilter