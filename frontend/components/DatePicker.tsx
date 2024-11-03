'use client'
import Calendar from "@/components/forms/Calendar";
import { Range } from "react-date-range";
import { CarType } from "@/types";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { CustomBtn } from "@/components";
import apiService from "@/app/services/apiService";
import { renameSync } from "fs";
import { differenceInDays, eachDayOfInterval, format, setDate } from "date-fns";

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
    const [bookedDates, setBookedDates] = useState<Date[]>([]);
    const [pickup, setPickup] = useState<string>('');
    const [dropoff, setDropoff] = useState<string>('');
    const [totalDate, setTotalDate] = useState<number>(1);
    const [totalPrice, setTotalPrice] = useState<number>();
    const [texFee, setTexFee] = useState<number>();
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
            renter: userId,
            start_date: format(dateRange.startDate,"yyyy-MM-dd"),
            end_date:format(dateRange.endDate,"yyyy-MM-dd"),
            total_date: totalDate,
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
    
    const get_reservation = async()=>{
      const reservation_list = await apiService.get(`/api/get_bookings/${car.id}`);
      console.log('Reservation:',reservation_list.reservation_data)
      const reservations = reservation_list.reservation_data;

      let dates: Date[] = [];

      reservations.map((reservation:any)=>{
        const range = eachDayOfInterval({
          start: new Date(reservation.start_date),
          end: new Date(reservation.end_date)
        });
        console.log('Range',range)
        dates = [...dates, ...range];
        console.log('dates',dates)
      })
      setBookedDates(dates)
      
    }
    console.log('Booked Dates:',bookedDates)

    const _setDateRange =(selection:any)=>{
       const newStartDate = new Date(selection.startDate)
       const newEndDate = new Date(selection.endDate)

       if(newEndDate <= newStartDate){
        newEndDate.setDate(newStartDate.getDate() + 1);
       }

       setDateRange({
        ...dateRange,
        startDate:newStartDate,
        endDate: newEndDate
       });
    }

    useEffect(()=>{
      get_reservation();
       
      if(dateRange.startDate && dateRange.endDate){
        const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate)
        
        if(dayCount && car.price_per_day){
          const _taxFee = ((dayCount * car.price_per_day)/100) * 5;
          setTexFee(_taxFee);
          setTotalPrice(dayCount * car.price_per_day + _taxFee);
          setTotalDate(dayCount)
        }else{
          const _taxFee = (car.price_per_day/100) * 5;
          setTexFee(_taxFee)
          setTotalPrice(car.price_per_day + _taxFee);
        }
      }
    },[dateRange])
  return (
    <form className="flex flex-col border" >
        <div className="flex">
        <Calendar
          value={dateRange}
          bookedDates={bookedDates}
          onChange={(value) => _setDateRange(value.selection)}
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
        <div className="">
          car price per day : {car.price_per_day}
          Tax Fees: {texFee}
          total cost: {totalPrice}
        </div>
         

        <CustomBtn btnName="Rent" btnType="submit" onClick={bookCar}/>
    </form>
  )
}

export default DatePicker