import React from 'react'
import { Card } from './ui/card'
import apiService from '@/app/services/apiService'

interface ReviewProps{
    car: string;
}

const Reviews = async({car}:ReviewProps) => {
  const response = await apiService.get(`/api/filtered-reviews/${car}`);
  const reviews = response.reviews
  console.log("Reviews",reviews)
  return (
    <Card className="w-full flex gap-x-5 items-center justify-around p-5">
        
            {reviews.map((review:any)=>{
                return <Card className="px-10 p-2" key={review.id}> {review.comments} </Card>
            })}
   
      </Card>
  )
}

export default Reviews