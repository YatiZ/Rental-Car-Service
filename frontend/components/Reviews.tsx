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
  //   const get_user_response = await apiService.get('/api/users');
  const response = await apiService.get(`/api/filtered-reviews/${car}`);
  const reviews = response.reviews;
  console.log("Reviews", reviews);

  return (
    <Card className="w-full flex overflow-scroll gap-x-6 items-center justify-around p-5">
      {reviews.map((review: any) => {
        return (
          <Card className="px-10 p-2" key={review.id}>
            <div className="flex flex-col">
              <div className="flex justify-around gap-x-10">
                <div className="flex">
                  {[...Array(5)].map((_, index) => {
                    const ratingValue = index + 1;
                    return (
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
                    );
                  })}
                </div>
                <DateFormat date={review.review_date} />
              </div>

              <div className="flex">
                <p>{review.comments}</p>
              </div>
              
              <div className="flex items-center">
                <div className="">
                    <Image src={review.user.avatar} alt={review.user.name} width={60} height={60}/>
                </div>
                <div className="flex flex-col">
                    <p>{review.user.name}</p>
                    <p>{review.user.email}</p>
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
