"use client";
import React from "react";
import { motion } from "framer-motion";
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

const AboutUsPage = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVarients}
      className="mx-5"
    >
      <div className="my-5">
        <div className="">
          <div className="font-bold text-center md:absolute border border-red-600 p-3">
            Welcome to Enterprise, your trusted partner in car rental services,
            providing you with the freedom to travel with ease, comfort, and
            reliability. With a commitment to customer satisfaction, Enterprise
            is a leading provider of rental vehicles for both business and
            leisure travelers, ensuring you have the right car for every
            occasion.
          </div>

          <div className="flex items-center justify-center">
          <Image
            src="/cars-collection.png"
            alt="mission-img"
            width={800}
            height={500}
            className="object-contain"
          />
          </div>
        </div>
      </div>
  

      <div className="md:mx-60 mx-3 mb-10">
        <h1 className="text-center font-bold text-2xl">Why Choose Us?</h1>
        <p className="text-center">
          If you want to drive a car for rideshare services in Milwaukee, Buggy
          is the perfect choice for you. Simply provide your driver’s license
          and choose the car you want to drive. Then, you can start driving for
          different rideshare apps and earn money easily.
        </p>
      </div>

      <div className="grid md:grid-cols-3 grid-cols-1 justify-between text-center gap-y-6 gap-x-14 my-10">
        <div className="card p-4">
          <h1>Icon</h1>
          <h2 className="font-bold text-lg">24 / 7 Customer Service</h2>
          <p>
            Our friendly and professional staff are always ready to assist you
            with your booking, offer guidance on choosing the right vehicle, and
            ensure a smooth rental experience.
          </p>
        </div>

        <div className="card p-4">
          <h1>Icon</h1>
          <h2 className="font-bold text-lg">Convenient Locations</h2>
          <p>
            With thousands of locations worldwide, including airports, downtown
            offices, and residential areas, we make it easy for you to pick up
            and drop off your rental.
          </p>
        </div>

        <div className="card p-4">
          <h1>Icon</h1>
          <h2 className="font-bold text-lg">Competitive Pricing</h2>
          <p>
            We believe in offering fair and transparent pricing with no hidden
            fees, giving you great value for your money. Plus, we offer special
            deals and discounts for frequent renters.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 my-10 items-center">
        <div className=" text-center">
          <h1 className="font-bold text-xl">Our Mission</h1>
          <p>
            At Enterprise, our mission is simple: to make your travel experience
            as enjoyable and stress-free as possible. We aim to provide
            exceptional customer service, high-quality vehicles, and an easy
            rental process that ensures you’re ready to hit the road whenever
            you need us. Whether you’re traveling for business, pleasure, or
            anything in between, Enterprise is here to meet your car rental
            needs with reliability and excellence.
          </p>
        </div>
        <div className="">
          <Image
            src="/mission.png"
            alt="mission-img"
            width={300}
            height={300}
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default AboutUsPage;
