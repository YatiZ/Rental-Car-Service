"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import apiService from "../services/apiService";
import { useToast } from "@/hooks/use-toast";
import { FAQType } from "@/types";
import FAQLoading from "@/components/loading/FAQLoading";

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
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      const response = await apiService.getUC("/api/get-faq", setLoading);

      if (response && response.data) {
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

        {loading ? (
          <FAQLoading />
        ) : (
          <div className="m-5 md:mx-7 lg:mx-8">
            {faq.map((f, index: number) => {
              return (
                <div className="border w-full mb-3" key={index}>
                  <div className="border-l-4 border-l-gray-500">
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
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"
                          />
                        </svg>
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
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default QApage;
