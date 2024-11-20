import React from 'react'

const UnavailableSign = () => {
  return (
    <div className='absolute -mt-72 md:ml-0 ml-9 -rotate-12 overflow-hidden border shadow border-red-700 p-2 text-xl text-red-600 font-bold font-serif'>
        <div className="border border-red-700 p-5">
        <p>Unavailable Today</p>
        </div>
    </div>
  )
}

export default UnavailableSign