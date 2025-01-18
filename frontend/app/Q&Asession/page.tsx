"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";

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
  exit: {
    x: "-100vh",
    transition: { ease: "easeInOut" },
  },
};
const QApage = () => {
  const [isOpen, setIsOpen] = useState<{ [key: string]: boolean }>({});
  const handleIsOpen = (id: string) => {
    setIsOpen((prevState) => ({
      // ...prevState,
      [id]: !prevState[id],
    }));
  };
  return (
    <AnimatePresence>
      <motion.div
        variants={containerVarients}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <h1 className="text-center text-3xl p-4"> Frequently Asked Questions (FAQ)</h1>
        <div className="m-3">
        <div className="border w-full">
          <div className="border-l-4 flex justify-between">
            <div className="py-3 pl-2 text-lg">
              <Image src="/question.png" alt="question" width={50} height={50}/>
            </div>
            <button className="pr-2" id="1" onClick={() => handleIsOpen("1")}>
            Open
          </button>
          </div>
          
          {isOpen["1"] && <div>Hi</div>}
        </div>
        <div className="border w-full">
          <p>Hello</p>
          <button id="2" onClick={() => handleIsOpen("2")}>
            Open
          </button>
          {isOpen["2"] && <div>Hi</div>}
        </div>
        </div>
       
      </motion.div>
    </AnimatePresence>
  );
};

export default QApage;
