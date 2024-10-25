"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CustomBtn } from "@/components";

const containerVarients = {
  hidden: {
    opacity: 0,
    x: "100vw",
  },
  visible: {
    opacity: 1,
    x: 0,
    trasition: {
      type: "spring",
      // mass: 0.4,
      // damping: 8,
      // when: "afterChildren",
      // stagger: 0.4,
    },
  },
  exit: {
    x: "-100vh",
    transition: { ease: "easeInOut" },
  },
};
const ContactPage = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSendMessages =()=>{
    const formData = {
        username: username,
        email: email,
        message: message
    }
  }
  

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVarients}
    >
      <div className="flex flex-row md:border lg:border justify-center gap-10 md:shadow-lg lg:shadow-lg md:m-10 m-0 md:py-10 py-8 border-none">
        <div className="border w-96 md:mx-20 lg:mx-20 mx-5 p-10 shadow-lg">
          <h1 className="text-xl font-bold leading-relaxed text-center">
            Contact Us
          </h1>
          <p className="text-sm text-cen">We will get back to you ASAP.</p>
          <form className="flex flex-col gap-y-4 mt-3" onSubmit={handleSendMessages}>
            <div className="flex flex-col">
              <label className="text-sm mb-1">Username</label>
              <input
                type="text"
                placeholder="your name"
                className="auth__input"
                onChange={(e)=>setUserName(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm mb-1">Email Address</label>
              <input
                type="email"
                placeholder="youremail@gmail.com"
                className="auth__input"
                onChange={(e)=> setEmail(e.target.value)}
              />
            </div>

            <div className="flex-col flex">
              <label className="text-sm mb-1">Messages</label>
              <textarea
                placeholder="Enter your messages"
                className="auth__input"
                onChange={(e)=>setMessage(e.target.value)}
              ></textarea>
            </div>

            <div className="">
              <CustomBtn
                btnType="submit"
                btnStyles="bg-blue-500 p-2 rounded-md text-center text-white w-full"
                btnName="Send Messages"
              />
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactPage;
