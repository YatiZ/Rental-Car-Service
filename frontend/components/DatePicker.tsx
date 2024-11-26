"use client";
import Calendar from "@/components/forms/Calendar";
import { Range } from "react-date-range";
import React, { useEffect, useState } from "react";
import apiService from "@/app/services/apiService";
import { differenceInDays, eachDayOfInterval, format, setDate } from "date-fns";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

import { Card, CardTitle } from "./ui/card";
import { DropdownMenuCheckboxes } from "./DropDownMenu";
import { toast } from "@/hooks/use-toast";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

export type Car = {
  id: string;
  price_per_day: number;
  model: string;
  total_date: number;
};

interface ReservationProps {
  car: Car;
  userId: string | null;
  renterId: string | null;
}

const DatePicker: React.FC<ReservationProps> = ({ car, userId, renterId }) => {
  const [renter, setRenter] = useState<Boolean>(false);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [pickup, setPickup] = useState<string>("");
  const [dropoff, setDropoff] = useState<string>("");
  const [totalDate, setTotalDate] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>();
  const [texFee, setTexFee] = useState<number>();
  const [error, setError] = useState("");
  const [alert, setAlert] = useState(false);


  useEffect(() => {
    const fetchRenterInfo = async () => {
      if (userId) {
        const renter_info = await apiService.get(
          `/api/renter_info_check/${userId}`
        );
        setRenter(renter_info.renter_exists);
      }
    };
    fetchRenterInfo();
  }, [renter]);

  const get_reservation = async () => {
    const reservation_list = await apiService.get(
      `/api/get_bookings/${car.id}`
    );
   
    const reservations = reservation_list.reservation_data;

    let dates: Date[] = [];

    reservations.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.start_date),
        end: new Date(reservation.end_date),
      });

      dates = [...dates, ...range];

    });
    setBookedDates(dates);
  };


  const _setDateRange = (selection: any) => {
    const newStartDate = new Date(selection.startDate);
    const newEndDate = new Date(selection.endDate);

    if (newEndDate <= newStartDate) {
      newEndDate.setDate(newStartDate.getDate() + 1);
    }

    setDateRange({
      ...dateRange,
      startDate: newStartDate,
      endDate: newEndDate,
    });
  };

  useEffect(() => {
    get_reservation();

    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);
      const pricePerDay = car.price_per_day;
      if (dayCount && pricePerDay) {
        const _taxFee = ((dayCount * pricePerDay) / 100) * 15;

        setTexFee(_taxFee);
        setTotalPrice(dayCount * pricePerDay + _taxFee);
        setTotalDate(dayCount);
      } else {
        const _taxFee = (pricePerDay / 100) * 15;
        setTexFee(_taxFee);
        setTotalPrice(pricePerDay + _taxFee);
      }
    }
  }, [dateRange]);

  const bookCar = async (e: React.FormEvent) => {
    e.preventDefault();

    if (renter && userId) {

      if (dateRange.startDate && dateRange.endDate && pickup && dropoff) {
        const formData = {
          renter_id: userId,
          start_date: format(dateRange.startDate, "yyyy-MM-dd"),
          end_date: format(dateRange.endDate, "yyyy-MM-dd"),
          total_date: totalDate,
          total_price: totalPrice,
          pickup_location: pickup,
          dropoff_location: dropoff,
        };
        

        const response = await apiService
          .BookPost(`/api/booking/${car.id}`, formData)
          .then((response) => {
            if (response && response.success) {
              toast({
                variant:"success",
                title: "Congratulations! You successfully booked!.",
                description: response.message,
              })
              setTotalPrice(0);
              setPickup('');
              setDropoff('');
            } else {
              console.log("error");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your book.",
        })
      }
    } else {
      setError("errpr");
      setAlert(true);
    }
  };

  return (

      <form className="flex flex-col gap-y-5">
       
        <Card className="flex flex-col px-7 py-7 text-[15px]">
          <CardTitle className="text-center text-xl font-bold">Fill data for rent</CardTitle>
          <Calendar
            value={dateRange}
            bookedDates={bookedDates}
            onChange={(value) => _setDateRange(value.selection)}
          />

          <label htmlFor="pickup_location" className="my-2">Pick up location</label>
          <textarea
            name="pickup_location"
            id=""
            className="border rounded pl-4"
            onChange={(e) => setPickup(e.target.value)}
            required
          ></textarea>

          <label htmlFor="dropoff_location" className="my-2">Drop off location</label>
          <textarea
            name="dropoff_location"
            id=""
            className="border rounded pl-4 "
            onChange={(e) => setDropoff(e.target.value)}
            required
          ></textarea>
        </Card>
        <Card className="px-7 py-7 space-y-1">
          <h1 className="font-bold text-xl text-center">Price details</h1>
          <p className="text-xs">Pay at pick-up</p>
          <div className="flex justify-between text-[15px]">
            <div className="flex items-center gap-x-2">
              <span>Car rental fee</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>

              <p> {totalDate}</p>
            </div>
            <p className="">${car.price_per_day * totalDate}</p>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-x-1 text-[15px]">
              <span>Taxes and fees</span>
              <DropdownMenuCheckboxes />
            </div>
            <p>${texFee}</p>
          </div>
          <hr />
          <div className="flex justify-between text-md font-bold">
            <p className="">Total</p>
            <p>${totalPrice}</p>
          </div>

          {userId ? (
            <>
             <AlertDialog>
               {renter === false ? <div className="text-center text-red-600 font-bold">You must fill renter info first</div>:
                 <AlertDialogTrigger className="flex items-center justify-center border bg-blue-600 p-1 w-full rounded text-white text-center">Rent</AlertDialogTrigger>
               }
              
                <AlertDialogContent> 
                    <AlertDialogTitle>Are you sure to rent?</AlertDialogTitle>
                    <AlertDialogDescription className="space-y-2">
                      <h2 className="text-center font-bold text-lg">Your Booking Date</h2>
                      <div className="flex justify-around">
                      <div className="flex justify-center space-x-3">
                        <h2>Start Day: </h2>
                        <p> {dateRange.startDate? dateRange.startDate.toLocaleDateString():"Not set"}</p>
                      </div>
                      <div className="flex justify-center space-x-3">
                        <h2>End Day: </h2>
                        <p> {dateRange.endDate? dateRange.endDate.toLocaleDateString():"Not set"}</p>
                      </div>
                      </div>
                      
                      <h2 className="text-center font-bold text-lg">Your Location</h2>
                      <div className="flex justify-around">
                      <div className="flex justify-center space-x-3">
                        <h2>Pickup: </h2>
                        <p> {pickup? pickup:"Not set"}</p>
                      </div>
                      <div className="flex justify-center space-x-3">
                        <h2>Dropoff: </h2>
                        <p> {dropoff? dropoff:"Not set"}</p>
                      </div>
                      </div>
                    </AlertDialogDescription>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={bookCar} type="submit">Confirm</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          ) : (
            <>
              <AlertDialog>
                <AlertDialogTrigger className="flex items-center justify-center border bg-blue-600 p-1 w-full rounded text-white text-center">Rent</AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Would you like to rent?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Login your account here{" "}
                      <Link href="/Login" className="text-blue-600 underline">
                        Login
                      </Link>{" "}
                      and fill renter info form. if you don't have an account,
                      go to
                      <Link href="/signup" className="text-blue-600 underline">
                        {" "}
                        SignUp Page
                      </Link>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          )}
        </Card>
      </form>

  );
};

export default DatePicker;
