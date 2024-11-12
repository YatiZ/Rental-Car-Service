"use client";
import React from "react";
import Image from "next/image";
import { color, motion } from "framer-motion";
import Link from "next/link";


const buttonVariants = {
  visible: {},
  hover: {
    scale: [1, 1.1, 1, 1.1, 1, 1.1, 1, 1.1, 1],
    textShadow: "0px 0px 1px rgb(0,0,0)",
    boxShadow: "0px 0px 8px rgb(0,0,0)",
    transition: {
      delay: 0.3,
    },
  },
};
const containerVarients = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { delay: 1.5, duration: 1.5 },
  },
  exit: {
    x: "-100vh",
    transition: { ease: "easeInOut" },
  },
};
const Hero = () => {
  return (
    <motion.div initial="hidden" animate="visible" exit="exit" className="hero">
      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ delay: 0.1 }}
        className="flex-[1.3] md:pt-36 pt-12 padding-x"
      >
        <h1 className="hero__title">Skip the rental car counter</h1>
        <p className="hero__subtitle">
          Discover a better way to rent cars on Turo, the world’s largest car
          sharing marketplace. Browse an incredible selection of cars, from the
          everyday to the extraordinary, and rent just about any car, just about
          anywhere, right from your phone.
        </p>

        <Link href="/Features">
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            className="text-black rounded-full p-3 mt-10  border-2 border-blue-500"
          >
            Explore the best cars
          </motion.button>
        </Link>
      </motion.div>

      <div className="hero__image-container">
        <motion.div
          initial={{ x: "100vw" }}
          animate={{ x: 0 }}
          transition={{ type: "spring", delay: 0.2, stiffness: 25 }}
          className="hero__img"
        >
          <Image
            alt="hero"
            src="/driving-car.png"
            fill
            className="object-contain"
          />
        </motion.div>
        <div className="hero__img-overlay"></div>
      </div>
    </motion.div>
  );
};

export default Hero;
