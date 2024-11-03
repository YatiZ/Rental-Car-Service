'use client'
import Calendar from "@/components/forms/Calendar";
import { Range } from "react-date-range";
import { CarType } from "@/types";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { CustomBtn } from "@/components";
import apiService from "@/app/services/apiService";
import { renameSync } from "fs";
import { differenceInDays, format } from "date-fns";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

export type Car = {
  id:string,
  price_per_day: number,
  model: string
}

interface ReservationProps{
  car: Car,
  userId: string | null;
}




const DatePicker:React.FC<ReservationProps> = ({car, userId}) => {
    const [renter, setRenter] = useState('');
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);
    const [pickup, setPickup] = useState<string>('');
    const [dropoff, setDropoff] = useState<string>('');
    const [totalPrice, setTotalPrice] = useState<number>();
    const [error, setError] = useState('');


    useEffect(()=>{
      const fetchRenterInfo = async()=>{
        const renter_info = await apiService.get(`/api/renter_info_check/${userId}`);
        setRenter(renter_info)
      }
      fetchRenterInfo();
    },[])

    const bookCar = (e:React.FormEvent)=>{
      e.preventDefault()
      
      if (renter && userId){
        console.log(renter)
        if(dateRange.startDate && dateRange.endDate){

          
          const formData = {
            start_date: format(dateRange.startDate,"yyyy-MM-dd"),
            end_date:format(dateRange.endDate,"yyyy-MM-dd"),
            total_date: differenceInDays(dateRange.endDate, dateRange.startDate),
            total_pirce: totalPrice,
            pickup_location: pickup,
            dropoff_location: dropoff
         }

         console.log("FormData from date picker",formData)
         
        }
      }else{
        setError('errpr')
      }
    }

  return (
    <form className="flex flex-col border" >
        <div className="flex">
        <Calendar
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />
        <div className="flex flex-col mt-10">
        <div className="flex flex-col h-28">
          <label htmlFor="pickup_location">pick up location</label>
          <input type="text" name="" id="" className="border" onChange={(e)=>setPickup(e.target.value)}/>
         
        </div>
        <div className="flex flex-col h-28">
          <label htmlFor="dropoff_location">Drop off location</label>
          <textarea name="dropoff_location" id="" className="border" onChange={(e)=>setDropoff(e.target.value)}></textarea>
        </div>
        </div>
       
        </div>
         

        <CustomBtn btnName="Rent" btnType="submit" onClick={bookCar}/>
    </form>
  )
}

export default DatePicker