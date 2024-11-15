// 'use client'
import apiService from "@/app/services/apiService";
import Image from "next/image";
import DatePicker from "@/components/DatePicker";
// import { useEffect, useState } from "react";
import { CarType } from "@/types";
import { getUserId } from "@/app/lib/action";
import { Card, CardContent, CardTitle } from "@/components/ui/card";


const CarDetailPage = async ({ params }: { params: { id: string } }) => {
  const userId = await getUserId();
  const car_detail = await apiService.get(`/api/cars/${params.id}/`);
  console.log("Car Detail->"); // Check if the image array is included

  return (
    <div className="mx-4 overflow-hidden relative">

      <div className="flex items-center justify-center">
      <Image
            src={`http://localhost:8000${car_detail.main_img}`}
            width={500}
            height={500}
            alt="car-logo"
          />
        
      </div>
      {/* for text */}
      <div className="flex justify-between md:flex-row gap-x-5 flex-col items-center px-auto md:px-12 mx-auto">
        <Card className="w-full py-5 px-3">
          <CardTitle className="my-3 text-xl text-center">{car_detail.brand}</CardTitle>
          <CardContent>
            <div className="flex justify-between">
              <div className="">
                <p>{car_detail.passengers} Passengers</p>
                <p>{car_detail.suitcases} Suitcases</p>
                <p>{car_detail.color} Color</p>
              </div>
              <div className="">
                <p>{car_detail.transmission}</p>
                <p>{car_detail.gas_type}</p>
                <p>{car_detail.model} {car_detail.year}</p>
              </div>
             
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col">
          <DatePicker car={car_detail} userId={userId} />
        </div>
      </div>
    </div>
  );
};

export default CarDetailPage;
