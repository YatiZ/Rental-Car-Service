"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import CustomBtn from "./CustomBtn";
import Link from "next/link";
import { CarType } from "@/types";
import useRentInfoModal from "@/app/hooks/useRentInfoModal";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import apiService from "@/app/services/apiService";
import UnavailableSign from "./UnavailableSign";
import AvailableSign from "./AvailableSign";
interface CarProps {
  car: CarType;
}
const HomeCard: React.FC<CarProps> = ({ car }) => {
  const [checkStatus, setCheckStatus] = useState(false);
  const openRentInfoBox = useRentInfoModal();
  const get_reservation = async()=>{
      const reservations = await apiService.get(`/api/get_bookings/${car.id}`)
 

      const booked_date = reservations.reservation_data;
      const todayDate = new Date();
      const booked_start_dates = booked_date.map((booked:any)=>new Date(booked.start_date))
 
      const booked_end_dates = booked_date.map((booked:any)=>new Date(booked.end_date))


      let isUnavailable = false;
      for(let i = 0; i< booked_start_dates.length; i++){
        if(todayDate >= booked_start_dates[i] && todayDate <= booked_end_dates[i]){
          isUnavailable =true;
          break;
        }
      }

      if(isUnavailable){
        setCheckStatus(false)
      }else{
        setCheckStatus(true)
      }
  };  
  
 
    get_reservation();

  // const additionalImages = home.images?.map(imgObj => `http://localhost:8000${imgObj.image}`);
  // console.log('Additional Images:', additionalImages);
  const handleRent = () => {
    openRentInfoBox.open();

  };
  return (
   
      <Card className="w-full">
        <CardHeader>
          <CardTitle>
            <div className="relative w-full h-60 overflow-hidden">
              <div className="absolute right-0">
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
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
              </div>
              <Image
                src={`http://localhost:8000${car.main_img}`}
                alt="car"
                fill
                className="object-contain hover:scale-110 w-full h-full"
              />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mt-2">
            <h1 className="flex items-center justify-center font-bold text-2xl">
              {car.brand} {car.model}
            </h1>

            <div className="flex justify-between mb-3">
              <p className="text-lg">
                <strong>${car.price_per_day}</strong>
              </p>

              <div className="flex gap-2">
              <Image
                src={`http://localhost:8000${car.brand_logo}`}
                alt="car"
                width={60}
                height={30}
              />
              </div>
            </div>

            <hr />
           {checkStatus? <AvailableSign/>:<><UnavailableSign/></>}

            <div className="mt-3 flex gap-4">
              {/* <CustomBtn btnName='Rent' onClick={handleRent} btnStyles='w-full bg-yellow-500 rounded-full border p-2 text-white hover:scale-110 transition' /> */}

              {/* <CustomBtn btnName='More Info' handleClick={handleRent} btnStyles='w-full bg-blue-500 rounded-full border p-2 text-white hover:scale-110 transition' /> */}
              <Link
                className="w-full text-center bg-blue-500 rounded-full border p-2 text-white hover:scale-110 transition"
                href={`CarDetail/${car.id}`}
              >
                More Info
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

  );
};

export default HomeCard;
