"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CustomBtn from "@/components/CustomBtn";
import apiService from "../services/apiService";
import AuthBox from "@/components/AuthBox";

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
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState("");

  const handleSendMessages = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      username: username,
      email: email,
      message: message,
    };


    try {
      const response = await apiService.post("/api/contact", formData);
  

      if (response.success) {
        setSuccessMessage(response.message);
        setUserName("");
        setEmail("");
        setMessage("");
      } else {
        setErrors(response.error || "An error occurred");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setErrors("An error occurred while sending the message.");
    }
  };

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        setSuccessMessage("");
      }, 2000);
    }
  }, [successMessage]);

  return (
    <motion.section initial="hidden"
    animate="visible"
    exit="exit"
    variants={containerVarients} className="container mx-auto px-0 w-fit md:tracking-wider lg:tracking-wider tracking-normal">
    <div className="flex flex-row md:border lg:border justify-center md:gap-10 gap-0 md:shadow-lg lg:shadow-lg md:m-10 m-0 md:py-10 py-8 border-none">
      <>
      {successMessage && (
        <div
          className="flex bg-green-100 rounded-lg p-4 mb-4 text-sm text-green-700"
          role="alert"
        >
          <svg
            className="w-5 h-5 inline mr-3"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <div>
            <span className="font-medium">Success alert!</span> {successMessage}
          </div>
        </div>
      )}
      {errors && (
        <div
          className="flex bg-red-100 rounded-lg p-4 mb-4 text-sm text-red-700"
          role="alert"
        >
          <svg
            className="w-5 h-5 inline mr-3"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <div>
            <span className="font-medium">Danger alert!</span> {errors}
          </div>
        </div>
      )}
      </>
      <div className="border mx-5 p-10 shadow-lg md:w-full">
        <h1 className="text-xl font-bold leading-relaxed">Contact Us</h1>
        
        <p className="text-sm text-cen">We will get back to you ASAP.</p>
        <form
            className="flex flex-col gap-y-4 mt-3"
            onSubmit={handleSendMessages}
          >
            <div className="flex flex-col">
              <label className="text-sm mb-1">Username</label>
              <input
                type="text"
                placeholder="your name"
                className="auth__input"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm mb-1">Email Address</label>
              <input
                type="email"
                placeholder="youremail@gmail.com"
                className="auth__input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex-col flex">
              <label className="text-sm mb-1">Messages</label>
              <textarea
                placeholder="Enter your messages"
                className="auth__input"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
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
      <div className="md:flex hidden">
        <AuthBox />
      </div>
    </div>
  </motion.section>


   
  );
};

export default ContactPage;
