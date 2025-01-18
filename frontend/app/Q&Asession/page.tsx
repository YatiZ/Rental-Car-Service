"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import apiService from "../services/apiService";
import { useToast } from "@/hooks/use-toast";
import { FAQType } from "@/types";

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
  const [faq, setFaq] = useState<FAQType[]>([]);
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState<{ [key: number]: boolean }>({});
  const handleIsOpen = (id: number) => {
    setIsOpen((prevState) => ({
      // ...prevState,
      [id]: !prevState[id],
    }));
  };

  const getFAQList = async () => {
    try {
      const response = await apiService.get("/api/get-faq");
      if (response) {
        setFaq(response.data);
      } else {
        toast({
          title: "Scheduled: Catch up ",
          description: response.data.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFAQList();
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        variants={containerVarients}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <h1 className="text-center text-3xl p-4">
          {" "}
          Frequently Asked Questions (FAQ)
          
        </h1>
      
        <div className="m-5 md:mx-7 lg:mx-8">
          {faq.map((f, index: number) => {
            return (
              <div className="border w-full mb-3" key={index}>
                <div className="border-l-4 ">
                  <div className="py-3 pl-2 flex justify-between items-center">
                    <Image
                      src="/question.png"
                      alt="question"
                      width={50}
                      height={50}
                    />
                    <p className="">{f.question}</p>
                    <button
                      className="pr-2"
                      onClick={() => handleIsOpen(index)}
                    >
                      open
                    </button>
                  </div>
                </div>

                {isOpen[index] && (
                  <div className="border-l-4 border-l-blue-600">
                    <p className="py-3 text-center px-6">{f.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default QApage;
