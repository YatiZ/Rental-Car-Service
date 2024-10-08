"use client";
import React from "react";
import Image from "next/image";
import { color, motion } from "framer-motion";
import Link from "next/link";

const buttonVariants ={
  visible:{

  },
  hover:{
    scale: [1,1.1,1,1.1,1,1.1,1,1.1,1],
    textShadow:'0px 0px 1px rgb(0,0,0)',
    boxShadow:'0px 0px 8px rgb(0,0,0)',
    transition:{
      delay: 0.3
    }
  }
}
const Hero = () => {
  const handleScroll = () => {};
  return (
    <div className="hero">
      <motion.div animate={{opacity:1}} initial={{opacity:0}} transition={{delay:0.1}} className="flex-[1.3] md:pt-36 pt-12 padding-x">
        <h1  className="hero__title">Let's Chill in Our Houses</h1>
        <p className="hero__subtitle">Are you looking for renting luxury cars?</p>

        <Link href='/Features'>
        <motion.button variants={buttonVariants} whileHover='hover' className="text-black rounded-full p-3 mt-10  border-2 border-blue-500">
          Explore Best Cars
        </motion.button>
        </Link>
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
