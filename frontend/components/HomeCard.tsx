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
import { getUserId } from "@/app/lib/action";
import { toast } from "@/hooks/use-toast";

interface CarProps {
  car: CarType;
}
const HomeCard: React.FC<CarProps> = ({ car }) => {
  const [checkStatus, setCheckStatus] = useState(false);
  const [isFavorite, setIsFavorite] = useState<Boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);


useEffect(()=>{

  const get_favorite = async()=>{
    try {
      const userId = await getUserId();
      setUserId(userId)
      if(userId && car.id){
        const get_response = await apiService.favGet(`/api/get-favorite/${car.id}/${userId}`)
        if (get_response.success === true) {
          setIsFavorite(get_response.get_favorite.isFavorite);
        } else {
          setIsFavorite(false)
        }
      }
      
    } catch (error) {
      console.log(error)
    }
  }

if(car.id){
  get_favorite();
}

},[car.id])

const handleFav = async() => {
  setIsFavorite(!isFavorite);
  const formData = {
    isFavorite: !isFavorite,
    car_id: car.id,
    userId: userId
  }
  try {
    if(car.id){
      const response = await apiService.post(`/api/favorite/${car.id}`,formData)
      if(response.success === true){
        //  if(response.favorited.isFavorite === true){
          setIsFavorite(response.favorited.isFavorite)
        //  }
        toast({
          variant: "success",
          title: "Your new favorite is unlock!",
          description: response.message
        })
  
      }
    }
    
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Error!",
      description: "An unknown error"
    })
  }
};


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



  return (
   
      <Card className="w-full">
        <div className="m-4">
        {userId && 
         <button className="cursor-pointer absolute" onClick={handleFav}>
         {!isFavorite ? 
         <svg
             xmlns="http://www.w3.org/2000/svg"
             fill="none"
             viewBox="0 0 24 24"
             strokeWidth={1.5}
             stroke="currentColor"
             className="size-8"
           >
             <path
               strokeLinecap="round"
               strokeLinejoin="round"
               d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
             />
           </svg>
           :
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8">
           <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
         </svg>
           }
           
         </button>
        }
     </div>
           
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
           {checkStatus? <AvailableSign/>:<><UnavailableSign/></>}

            <div className="mt-3 flex gap-4">
            
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
