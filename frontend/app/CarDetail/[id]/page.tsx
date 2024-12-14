// 'use client'
import apiService from "@/app/services/apiService";
import Image from "next/image";
import DatePicker from "@/components/DatePicker";
import { getUserId } from "@/app/lib/action";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { CarouselPlugin } from "@/components/CarGallery";
import AddRenterPage from "@/components/RenterInfo";
import Link from "next/link";
import { ReviewModal } from "@/components/ReviewModal";
import Reviews from "@/components/Reviews";

const CarDetailPage = async ({ params }: { params: { id: string } }) => {
  const userId = await getUserId();

  const car_detail = await apiService.get(`/api/cars/${params.id}/`);

  const get_renter_info = await apiService.get(
    `/api/renter_info_display/${userId}`
  );

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

      <div className="flex justify-between md:flex-row gap-5 flex-col items-center px-auto md:px-12 mx-auto text-[15px]">
        <div className="flex flex-col gap-y-5 w-full items-center">
          <CarouselPlugin car_images={car_detail.image} />

          <Card className="w-full py-5 px-3">
            <CardTitle className="my-3 text-xl font-bold text-center">
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
            <CardTitle className="my-3 text-xl text-center font-bold">
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
                    className="size-5"
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
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 12.75 6 6 9-13.5"
                    />
                  </svg>
                  <span>
                    Helps protect your rental vehicle in case of an accident or
                    collision
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 12.75 6 6 9-13.5"
                    />
                  </svg>
                  <span>
                    Gives you access to 24/7 emergency travel assistance
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {userId && (
            <>
              <h1>Would you like to suggest about this car?</h1>
              <ReviewModal
                key={`review-${userId}-${car_detail.id}`}
                user={userId}
                car_id={car_detail.id}
              />
            </>
          )}
        </div>
        <div className="flex flex-col gap-y-5">
          <DatePicker
            car={car_detail}
            userId={userId}
            renterId={get_renter_info}
          />

          {get_renter_info &&
          Object.values(get_renter_info).some((value) => value) ? (
            <Card className="px-1 pt-7" key={get_renter_info.id}>
              <CardTitle className="text-center text-xl font-bold">
                {get_renter_info.account_name.name}'s info for rent
              </CardTitle>
              <CardContent className="flex text-[15px] justify-between items-center pt-2">
                <div className="font-bold space-y-2">
                  <p>Renter name: </p>
                  <p>Phone no: </p>
                  <p>License: </p>
                </div>
                <div className="space-y-2">
                  <p>{get_renter_info.renter_name}</p>
                  <p>{get_renter_info.phonenumber}</p>
                  <p>{get_renter_info.driver_license_number}</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="px-1 pt-7" key={get_renter_info.id}>
              <CardTitle className="text-center text-xl font-bold">
                {" "}
                User's info for rent
              </CardTitle>
              <CardContent className="">
                <div className="flex text-[15px] justify-between items-center pt-2">
                  <div className="font-bold space-y-3">
                    <p>Renter name: </p>
                    <p>Phone no: </p>
                    <p>License: </p>
                  </div>
                  <div className="space-y-3">
                    <p className="">.............</p>
                    <p className="">.............</p>
                    <p className="">.............</p>
                  </div>
                </div>

                <hr />
                {userId ? (
                  <AddRenterPage />
                ) : (
                  <Link
                    href="/Login"
                    className="flex items-center justify-center border bg-blue-600 p-1 w-full rounded text-white text-center"
                  >
                    Login
                  </Link>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      <div className="md:mx-12 mx-3 mt-6">
        <Reviews car={car_detail.id} userId={userId} />
      </div>
    </div>
  );
};

export default CarDetailPage;
