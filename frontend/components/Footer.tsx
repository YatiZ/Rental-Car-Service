import React from 'react'

const Footer = () => {
  return (
    <div>
      <hr />
     <div className="flex md:flex-row flex-col justify-between mx-10 mt-4">
        <div className="flex flex-col space-y-1">
          <h1 className='border-b-2 w-fit mb-5'>Address</h1>
          <p>Office:</p>
          <p>San Francisco, No.34(A) </p>
          <p>phone number</p>
          <iframe className='w-auto h-48' src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d61095.28422648127!2d96.2269772!3d16.853359!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2smm!4v1729783285659!5m2!1sen!2smm" width="600" height="450" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div className="flex flex-col">
        <h1 className='border-b-2 w-fit mb-5'>Recent News</h1>
        <li className=''>One blog</li>
        <li className=''>One blog</li>
        <li className=''>One blog</li>
        <li className=''>One blog</li>
        </div>
        <div className="flex flex-col">
        <h1 className='border-b-2 w-fit mb-5'>Brand</h1>
        <li className=''>One blog</li>
        <li className=''>One blog</li>
        <li className=''>One blog</li>
        <li className=''>One blog</li>
        </div>
        <div className="flex flex-col">
        <h1 className='border-b-2 w-fit mb-5'>Our Gallery</h1>
        </div>
     </div>
    </div>
  )
}

export default Footer