import React from "react";
import { Card } from "./ui/card";
import apiService from "@/app/services/apiService";
import { FaStar } from "react-icons/fa";
import DateFormat from "./DateFormat";
import Image from "next/image";

interface ReviewProps {
  car: string;
  userId: string | null;
}

const Reviews = async ({ car, userId }: ReviewProps) => {
  const response = await apiService.get(`/api/filtered-reviews/${car}`);
  const reviews = response.reviews;

  return (
    <Card className="w-full flex overflow-x-scroll gap-x-6 items-center justify-around p-5">
      {reviews.map((review: any, index:number) => {
        return (
          <Card className="px-10 p-5" key={index}>
            <div className="flex flex-col gap-5">
              <div className="flex justify-around gap-x-10">
                <div className="flex">
                  {[...Array(5)].map((_, starIndex) => {
                    const ratingValue = starIndex + 1;
                    return (
                        <div key={starIndex}>
                      <label key={review.rating}>
                        <FaStar
                          key={review.rating}
                          color={
                            ratingValue <= (review.rating || ratingValue)
                              ? "#ffc107"
                              : "#e4e5e9"
                          }
                          className=" transition-colors"
                          size={25}
                        ></FaStar>
                      </label>
                      </div>
                    );
                  })}
                </div>
                <DateFormat date={review.review_date} />
              </div>

              <div className="flex w-[500px] h-[100px] overflow-y-scroll p-4 text-sm">
                <p>{review.comments}</p>
              </div>

              <div className="flex items-center gap-x-3 ml-3">
                <div className="">
                  <Image
                    src={review.user.avatar}
                    alt={review.user.name}
                    width={60}
                    height={60}
                  />
                </div>
                <div className="flex flex-col font-bold">
                  <p>{review.user.name}</p>
                  <p className="text-xs hover:underline">{review.user.email}</p>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </Card>
  );
};

export default Reviews;
