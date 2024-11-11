// 'use client'
import apiService from "@/app/services/apiService";
import Image from "next/image";
import DatePicker from "@/components/DatePicker";
// import { useEffect, useState } from "react";
import { CarType } from "@/types";
import { getUserId } from "@/app/lib/action";


const CarDetailPage = async ({ params }: { params: { id: string } }) => {
  const userId = await getUserId();
  const car_detail = await apiService.get(`/api/cars/${params.id}/`);
  console.log("Car Detail->", car_detail.id); // Check if the image array is included

  return (
    <div className="mx-4 overflow-hidden relative">

      <div className="flex items-center justify-center">
        <h2 className="text-lg font-bold">{car_detail.brand}</h2>
        <span>
          <Image
            src={`http://localhost:8000${car_detail.brand_logo}`}
            width={80}
            height={80}
            alt="car-logo"
          />
        </span>
      </div>
      {/* for text */}
      <div className="flex justify-between md:flex-row flex-col items-center px-auto md:px-12 mx-auto">
        <div className="col-12 col-lg-6">
          <p className="">
            {car_detail.description}
            {car_detail.description}
          </p>

          <div className="grid grid-cols-2 my-5 gap-x-8 gap-y-3">
            {/* <table className="border-collapse border w-full">
            <tbody>
              <tr>
                <td className="border border-slate-300 p-4">
                  {car_detail.gas_type}
                </td>
                <td className="border border-slate-300 p-4">
                  {car_detail.suitcases}
                </td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-4">
                  Bret "The Hitman" Hart
                </td>
                <td className="border border-slate-300 p-4">
                  The Sharpshooter
                </td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-4">Razor Ramon</td>
                <td className="border border-slate-300 p-4">
                  Razor's Edge, Fallaway Slam
                </td>
              </tr>
            </tbody>
          </table> */}
            <div className="bg-blue-400 rounded-full p-2 text-center shadow-md">
              {car_detail.brand}
            </div>
            <div className="bg-blue-400 rounded-full p-2 text-center shadow-md">
              {car_detail.brand}
            </div>
            <div className="bg-blue-400 rounded-full p-2 text-center shadow-md">
              {car_detail.brand}
            </div>
            <div className="bg-blue-400 rounded-full p-2 text-center shadow-md">
              {car_detail.brand}
            </div>
            <div className="bg-blue-400 rounded-full p-2 text-center shadow-md">
              {car_detail.brand}
            </div>
            <div className="bg-blue-400 rounded-full p-2 text-center shadow-md">
              {car_detail.brand}
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <DatePicker car={car_detail} userId={userId} />
        </div>
      </div>
    </div>
  );
};

export default CarDetailPage;
