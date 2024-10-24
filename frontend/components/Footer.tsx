import React from 'react'

const Footer = () => {
  return (
    <div className='mx-10'>
     <div className="flex flex-row justify-between">
        <div className="flex flex-col space-y-1">
          <h1 className='border-b-2 w-fit mb-5'>Address</h1>
          <p>Office:</p>
          <p>San Francisco, No.34(A) </p>
          <p>phone number</p>
          <iframe className='w-80 h-56' src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d61095.28422648127!2d96.2269772!3d16.853359!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2smm!4v1729783285659!5m2!1sen!2smm" width="600" height="450"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div className="flex flex-col">Recent News</div>
        <div className="flex flex-col">Email Us</div>
        <div className="flex flex-col">Our Gallery</div>
     </div>
    </div>
  )
}

export default Footer