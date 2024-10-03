'use client'
import apiService from "@/app/services/apiService";
import Image from "next/image";
import DatePicker from "@/components/DatePicker";
import { useEffect, useState } from "react";
import { CarType } from "@/types";


const CarDetailPage = ({ params}: {params:{id:string}}) => {
    const [carDetail, setCarDetail] = useState<CarType | null>(null);
  
    useEffect(() => {
      const fetchCarDetails = async () => {

        try {
          const car_detail = await apiService.get(`/api/cars/${params.id}/`); 
          console.log(car_detail); // Check if the image array is included
          setCarDetail(car_detail)
        } catch (error) {
          console.log(error)
        }
       
      };
      fetchCarDetails();
    }, []);
    
    if (!carDetail) {
      return <p>Loading...</p>; // Display loading state
    }


  
  return (
    <div className="mx-4 overflow-hidden relative">
      {/* for images */}
      <div className="grid grid-cols-4 md:gap-5 md:p-10">
        <div className="relative w-full h-full col-span-3 row-span-2">
          <Image
            src={`http://localhost:8000/${carDetail.main_img}`}
            alt="home"
            fill
            className="object-cover"
            // onClick={openModal.bind(this, 0)}
          />
        </div>
        {Array.isArray(carDetail.image) &&carDetail.image.map((img, index) => (
                    <div key={index} className="relative w-full h-60">
                        <Image
                            src={`http://localhost:8000${img.image}`} // Adjust as needed
                            alt={`Car image`}
                            className="object-cover"
                            fill
                        />
                    </div>
                ))}
            

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
          <div className="">description
            {carDetail.description}
          </div>

          <table className="border-collapse border ">
            <tbody>
              <tr>
                <td className="border border-slate-300 p-4">
                  {carDetail.gas_type}
                </td>
                <td className="border border-slate-300 p-4">
                  {carDetail.suitcases}
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
         <DatePicker/>
        </div>
       
      </div>
    </div>
  );
};

export default CarDetailPage;
