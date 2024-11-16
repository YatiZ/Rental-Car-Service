// 'use client'
import apiService from "@/app/services/apiService";
import Image from "next/image";
import DatePicker from "@/components/DatePicker";
import { CarType } from "@/types";
import { getUserId } from "@/app/lib/action";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { CarouselPlugin } from "@/components/CarGallery";

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
        <div className="flex flex-col gap-y-5 w-full items-center">
         
            <CarouselPlugin car_images={car_detail.image}/>
         
          <Card className="w-full py-5 px-3">
            <CardTitle className="my-3 text-xl text-center">
              {car_detail.brand}
            </CardTitle>
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
                  <p>
                    {car_detail.model} {car_detail.year}
                  </p>
                </div>
              </div>
              <hr />
              <div>
                <h1>Description</h1>
                <p>{car_detail.description}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="px-3 py-5">
            <CardTitle className="my-3 text-xl text-center">
              Get a rental car insurance plan
            </CardTitle>
            <CardContent>
              <ul className=" space-y-3">
                <li className="flex gap-x-3">
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
                      d="m4.5 12.75 6 6 9-13.5"
                    />
                  </svg>
                  <span>Covers certain bumps, scratches, and other damage</span>
                </li>
                <li className="flex gap-x-3">
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
                      d="m4.5 12.75 6 6 9-13.5"
                    />
                  </svg>
                  <span>Helps protect your rental vehicle in case of an accident or collision</span>
                </li>
                <li className="flex gap-x-3">
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
                      d="m4.5 12.75 6 6 9-13.5"
                    />
                  </svg>
                  <span>Gives you access to 24/7 emergency travel assistance</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-col">
          <DatePicker car={car_detail} userId={userId} />
          <div className=" h-36">
            <p>hello</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailPage;
