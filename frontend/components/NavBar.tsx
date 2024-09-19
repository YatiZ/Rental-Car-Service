"use client";
import React, { useState } from "react";
import { CustomBtn } from ".";
import Link from "next/link";

const NavBar = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const handleLoginPage = () => {};
  return (
    <nav className="py-2 md:px-14 flex flex-row justify-between items-center border-b">
        
     
        <div className="m-4 items-center flex">
          <h3 className="font-bold text-3xl md:text-4xl">Warm</h3>
        </div>

        {/* menu icons */}
        <div className="md:hidden lg:hidden mx-5" onClick={()=>setOpenMenu(!openMenu)}>
        {!openMenu ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="size-4"
          >
            <path
              fillRule="evenodd"
              d="M2 3.75A.75.75 0 0 1 2.75 3h10.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 3.75ZM2 8a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 8Zm0 4.25a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="size-4"
          >
            <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
          </svg>
        )}
        </div>

        <div className={`md:flex block md:gap-4 right-0 md:bg-white gap-0 absolute z-20 top-20 md:top-1 p-5
         bg-gray-200 w-full md:w-auto mx-0 transition-all duration-200 ${openMenu ? 'block':'hidden'}`}>
          <div className="navbar__link">
            <Link href="/">Home</Link>
          </div>
          <div className="navbar__link">
            <Link href="/Features">For Rent</Link>
          </div>
          <div className="navbar__link">
            <Link href="/">About Us</Link>
          </div>
          <div className="navbar__link">
            <Link href="/">Contact</Link>
          </div>
        
     
            <Link href='/Login' className="bg-blue-500 rounded-full p-2 text-center text-white min-w-[130px]">
              Login
            </Link>

        </div>
    
  
    </nav>
  );
};

export default NavBar;
