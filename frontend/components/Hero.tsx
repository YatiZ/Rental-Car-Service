"use client";
import React from "react";
import Image from "next/image";
import { CustomBtn } from ".";

const Hero = () => {
  const handleScroll = () => {};
  return (
    <div className="hero">
      <div className="flex-[1.3] md:pt-36 pt-12 padding-x">
        <h1 className="hero__title">Let's Chill in Our Houses</h1>
        <p className="hero__subtitle">Are you looking for renting places?</p>

        <CustomBtn
          btnName="Explore Location"
          btnStyles="bg-blue-500 text-white rounded-full p-3 mt-10"
          btnType="button"
          handleClick={handleScroll}
        />
      </div>

      <div className="hero__image-container">
        <div className="hero__img">
          <Image alt="hero" src="/hero.png" fill className="object-contain" />
        </div>
        <div className="hero__img-overlay"></div>
      </div>
    </div>
  );
};

export default Hero;
