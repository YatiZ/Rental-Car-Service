"use client";
import React, { useEffect, useState } from "react";
import { CarType } from "@/types";
import FeatureLoading from "./loading/FeatureLoading";
import HomeCard from "./HomeCard";
import { motion } from "framer-motion";

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
    },
  },
  exit: {
    x: "-100vh",
    transition: { ease: "easeInOut" },
  },
};

interface CarsProps {
  cars: CarType[];
  loading: boolean;
}

const SearchFilter = ({ cars, loading }: CarsProps) => {
  const [filteredData, setFilteredData] = useState(cars);
  const [searchData, setSearchData] = useState<string>("");

  useEffect(() => {
    setFilteredData(cars);
  }, [cars]);
  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchData(value);

    const filteredBrands = cars.filter((car) =>
      car.brand.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filteredBrands);
    console.log(filteredBrands);
  };
  return (
    <>
      <div className="flex space-x-6 items-center justify-center">
        <div className="h-[64px] md:w-[500px] w-[350px] shadow-xl mt-4 flex flex-row items-center justify-between border rounded-lg">
          <input
            type="text"
            value={searchData}
            onChange={handleFilter}
            placeholder="Search your desired cars ..."
            className="w-full mx-2 px-3 py-3 bg-gray-200 rounded-lg"
          />
        </div>
      </div>
      <motion.div
        variants={containerVarients}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="grid md:grid-cols-3 grid-cols-1 m-5 gap-4"
      >
        {loading ? (
          <FeatureLoading />
        ) : (
          filteredData.map((car) => {
            return <HomeCard key={car.id} car={car} />;
          })
        )}
        {filteredData.length === 0 && <div className="mt-7">No car found!</div>}
      </motion.div>
    </>
  );
};

export default SearchFilter;
