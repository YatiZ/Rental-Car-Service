import React from "react";
import { Card } from "./ui/card";
import apiService from "@/app/services/apiService";
import { FaStar } from "react-icons/fa";

interface ReviewProps {
  car: string;
  userId: string | null;
}

const Reviews = async ({ car, userId }: ReviewProps) => {
//   const get_user_response = await apiService.get('/api/users');
  const reviews = await apiService.get(`/api/filtered-reviews/${car}`);
//   const reviews = response.reviews;
  console.log("Reviews", reviews);

//   const reviewsWithUsernames = reviews.map(review =>{
//     const user = get_user_response.find(review.user === userId);
//     console.log('User Filtered Name',user)
//     return user
//   })
  return (
    <Card className="w-full flex gap-x-5 items-center justify-around p-5">
      {/* {reviews.map((review: any) => {
        return (
          <Card className="px-10 p-2" key={review.id}>
            <div className="flex flex-col">
              <div className="flex">
             
                <p>username</p>
                {review.rating}
              </div>
              <div className="flex">
                {[...Array(5)].map((_, index) => {
                  const ratingValue = index + 1;
                  return (
                    <label key={review.rating}>
                      <FaStar
                        key={review.rating}
                        color={
                          ratingValue <= ( review.rating || ratingValue )
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
              <p>{review.comments} </p>
            </div>
          </Card>
        );
      })} */}
    </Card>
  );
};

export default Reviews;
