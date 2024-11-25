"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import LogoutBtn from "./LogoutBtn";
import AddRenterPage from "@/components/RenterInfo";
import NavDropDown from "./NavDropDown";

interface NavBarProps{
  userId: string | null;
}
const NavBar =  ({userId}:NavBarProps) => {
  const [openMenu, setOpenMenu] = useState(false);


//  if(loading) return <div>Loading ...</div>;


  return (
    <AnimatePresence>
      <motion.nav className="sticky bg-blue-200 top-0 z-50 md:px-14 ">
        <motion.div
          initial={{ y: -250 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
          className=" py-2 flex flex-row justify-between items-center "
        >
          <div className="m-4 items-center flex">
            <h3 className="font-bold text-3xl md:text-4xl">
              <Link href="/">Warm</Link>
            </h3>
          </div>

          {/* menu icons */}
          <div
            className="md:hidden lg:hidden mx-5"
            onClick={() => setOpenMenu(!openMenu)}
          >
            {!openMenu ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="size-5"
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
                className="size-6"
              >
                <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
              </svg>
            )}
          </div>

          <motion.div
            className={`md:flex items-center text-center block md:gap-4 md;bg-transparent border-t-2 border-t-blue-800 md:border-none right-0 gap-0 absolute z-20 top-20 md:top-1 p-5
          w-full md:w-auto mx-0 transition-all duration-200 ${
            openMenu ? "block bg-blue-200" : "hidden"
          }`}
          >
            <motion.div
              whileHover={{ scale: 1.1, originX: 0, color: "#f8e112" }}
              transition={{ type: "spring", stiffness: 120 }}
              className="navbar__link"
            >
              <Link href="/Features">Our Cars</Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.1, originX: 0, color: "#f8e112" }}
              transition={{ type: "spring", stiffness: 120 }}
              className="navbar__link"
            >
              <Link href="/Q&Asession">Q & A</Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1, originX: 0, color: "#f8e112" }}
              transition={{ type: "spring", stiffness: 120 }}
              className="navbar__link"
            >
              <Link href="/AboutUs">About Us</Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1, originX: 0, color: "#f8e112" }}
              transition={{ type: "spring", stiffness: 120 }}
              className="navbar__link"
            >
              <Link href="/Contact">Contact</Link>
            </motion.div>

            {userId && (
              <motion.div
                whileHover={{ scale: 1.1, originX: 0, color: "#f8e112" }}
                transition={{ type: "spring", stiffness: 120 }}
                className="navbar__link"
              >
                {/* <Link href="/RenterInfo">Your Info</Link> */}
                {/* <AddRenterPage /> */}
                <NavDropDown/>
              </motion.div>
            )}

            <div className="md:mt-0 mt-5">
              {userId ? (
                <>
                  <LogoutBtn />
                </>
              ) : (
                <Link
                  href="/Login"
                  className="bg-blue-500 rounded-full p-2 text-center text-white px-10"
                >
                  Login
                </Link>
              )}
            </div>
          </motion.div>

        </motion.div>
      </motion.nav>
    </AnimatePresence>
  );
};

export default NavBar;
