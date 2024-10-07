"use client";
import React from "react";
import Image from "next/image";
import { CustomBtn } from ".";
import { motion } from "framer-motion";

const Hero = () => {
  const handleScroll = () => {};
  return (
    <div className="hero">
      <motion.div animate={{opacity:1}} initial={{opacity:0}} transition={{delay:0.1}} className="flex-[1.3] md:pt-36 pt-12 padding-x">
        <h1  className="hero__title">Let's Chill in Our Houses</h1>
        <p className="hero__subtitle">Are you looking for renting luxury cars?</p>

        <CustomBtn
          btnName="Explore Location"
          btnStyles="bg-blue-500 text-white rounded-full p-3 mt-10"
          btnType="button"
          onClick={handleScroll}
        />
      </motion.div>

      <div className="hero__image-container">
        <motion.div initial={{x:'100vw'}} animate={{x:0}} transition={{type:'spring', delay:0.2,stiffness: 25 }} className="hero__img">
          <Image alt="hero" src="/driving-car.png" fill className="object-contain" />
        </motion.div>
        <div className="hero__img-overlay"></div>
      </div>
    </div>
  );
};

export default Hero;
