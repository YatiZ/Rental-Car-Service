"use client";
import apiService from "@/app/services/apiService";
import Calendar from "@/components/forms/Calendar";
import { Range } from "react-date-range";
import { HomeType } from "@/types";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CustomBtn } from "@/components";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

type Props = {
  home: HomeType | null;
};
const CarDetailPage: React.FC<Props> = ({ home }) => {
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  return (
    <div className="mx-4 overflow-hidden relative">
      {/* for images */}
      <div className="grid grid-cols-4 md:gap-5 md:p-10">
        <div className="relative w-full h-full col-span-3 row-span-2">
          <Image
            src="/dummy-home.jpg"
            alt="home"
            fill
            className="object-cover"
            // onClick={openModal.bind(this, 0)}
          />
        </div>
        <div className="relative w-full h-60 col-span-1 row-span-1">
          <Image
            src="/dummy-home.jpg"
            alt="home"
            fill
            className="object-cover"
            // onClick={openModal.bind(this, 0)}
          />
        </div>
        <div className="relative w-full h-60 col-span-1 row-span-1">
          <Image
            src="/dummy-home.jpg"
            alt="home"
            fill
            className="object-cover"
            // onClick={openModal.bind(this, 0)}
          />
        </div>

        <div className="md:hidden flex justify-between items-center">
          <div className="flex space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="size-4 cursor-pointer"
            >
              <path
                fillRule="evenodd"
                d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8Zm10.25.75a.75.75 0 0 0 0-1.5H6.56l1.22-1.22a.75.75 0 0 0-1.06-1.06l-2.5 2.5a.75.75 0 0 0 0 1.06l2.5 2.5a.75.75 0 1 0 1.06-1.06L6.56 8.75h4.69Z"
                clipRule="evenodd"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="size-4 cursor-pointer"
            >
              <path
                fillRule="evenodd"
                d="M15 8A7 7 0 1 0 1 8a7 7 0 0 0 14 0ZM4.75 7.25a.75.75 0 0 0 0 1.5h4.69L8.22 9.97a.75.75 0 1 0 1.06 1.06l2.5-2.5a.75.75 0 0 0 0-1.06l-2.5-2.5a.75.75 0 0 0-1.06 1.06l1.22 1.22H4.75Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* for text */}
      <div className="flex justify-between md:flex-row flex-col items-center">
        <div className="flex flex-col items-center justify-center md:ml-14">
          <div className="">description</div>

          <table className="border-collapse border ">
            <tbody>
              <tr>
                <td className="border border-slate-300 p-4">
                  "Stone Cold" Steve Austin
                </td>
                <td className="border border-slate-300 p-4">
                  Stone Cold Stunner, Lou Thesz Press
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
          </table>
        </div>

        <div className="flex flex-col">
        <Calendar
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />

        <CustomBtn btnName="Rent" onClick={()=>console.log('booked')}/>
        </div>
       
      </div>
    </div>
  );
};

export default CarDetailPage;
