'use client'
import Calendar from "@/components/forms/Calendar";
import { Range } from "react-date-range";
import { CarType } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CustomBtn } from "@/components";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};


const DatePicker = () => {
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  return (
    <div>
         <Calendar
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />

        <CustomBtn btnName="Rent" onClick={()=>console.log('booked')}/>
    </div>
  )
}

export default DatePicker