import React from 'react'
import Image from 'next/image'

const page = () => {
  return (
    <div>
        <h2 className="text-lg font-semibold mb-4">Image Text</h2>

<p className="mb-6">Center text in image:</p>

<div className="inset-0 z-50 relative w-[90%] mx-auto">

  <Image src="/hero.png" alt="Cinque Terre" fill className="w-full h-[500px] opacity-30 z-50"/>
  
  <div className="absolute inset-0 flex items-center justify-center">
    <span className="text-xl text-center">Centered</span>
  </div>
</div>
{/* <Image src="/hero.png" alt="Cinque Terre" fill className="w-full h-auto opacity-30"/> */}
    </div>
  )
}

export default page