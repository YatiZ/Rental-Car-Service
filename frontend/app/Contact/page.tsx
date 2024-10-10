'use client'
import React from 'react'
import { AnimatePresence, motion } from "framer-motion";

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
    exit:{
      x: '-100vh',
      transition: {ease: 'easeInOut'}
    }
  };
const ContactPage = () => {
  return (
    <motion.div   initial="hidden"
    animate="visible"
    exit="exit"
    variants={containerVarients}>ContactPage</motion.div>
  )
}

export default ContactPage