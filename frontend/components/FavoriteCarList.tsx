"use client";
import { CarType } from "@/types";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
import apiService from "@/app/services/apiService";
import { getUserId } from "@/app/lib/action";
import { toast } from "@/hooks/use-toast";

interface FavCarsProps {
  id: string;
  car: CarType;
}
const FavoriteCarList = ({ id, car }: FavCarsProps) => {
const [isRemoved, setIsRemoved] = useState(false);
const handleRemoveFav =  async() => {
    const userId = await getUserId();
    if(id){
        await apiService.favGet(`/api/remove-favorite/${id}/${userId}`);
        setIsRemoved(true);
    }
  };

  if(isRemoved){
    return null;
  }
  return (
    <>
        {id && 
              <Card className="w-full" >
              <button onClick={handleRemoveFav} className="absolute p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              
              <CardHeader>
                <CardTitle>
                  <div className="relative w-full h-60 overflow-hidden">
                    <Image
                      src={`http://localhost:8000${car.main_img}`}
                      alt="car"
                      fill
                      className="object-contain w-full h-full"
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
                  {/* {checkStatus? <AvailableSign/>:<><UnavailableSign/></>} */}
      
                  <div className="mt-3 flex gap-4">
                    {/* <CustomBtn btnName='Rent' onClick={handleRent} btnStyles='w-full bg-yellow-500 rounded-full border p-2 text-white hover:scale-110 transition' /> */}
      
                    {/* <CustomBtn btnName='More Info' handleClick={handleRent} btnStyles='w-full bg-blue-500 rounded-full border p-2 text-white hover:scale-110 transition' /> */}
                    <Link
                      className="w-full text-center bg-blue-500 rounded-full border p-2 text-white hover:scale-110 transition"
                      href={`CarDetail/${id}`}
                    >
                      More Info
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
        }

    </>
  );
};

export default FavoriteCarList;
