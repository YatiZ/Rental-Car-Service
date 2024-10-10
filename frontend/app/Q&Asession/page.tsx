'use client'
import React from 'react'
import {motion, AnimatePresence} from "framer-motion";

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
        mass: 0.4,
        damping: 8,
        when: "afterChildren",
        stagger: 0.4,
      },
    },
    exit:{
      x: '-100vh',
      transition: {ease: 'easeInOut'}
    }
  };
const QApage = () => {
  return (
    <AnimatePresence>
    <motion.div variants={containerVarients} initial='hidden' animate='visible' exit='exit'>QApage
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. At dolores magni incidunt id sint doloribus, illo in nemo veniam et qui, quibusdam expedita mollitia dolorum suscipit, praesentium natus unde tenetur!</p>
    </motion.div>
    </AnimatePresence>
  )
}

export default QApage