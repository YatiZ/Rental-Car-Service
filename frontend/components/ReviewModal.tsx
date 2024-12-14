"use client";
import { createReview } from "@/app/lib/action";
import apiService from "@/app/services/apiService";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { FaStar } from "react-icons/fa";

interface ReviewProps {
  user: string;
  car_id: string;
}

export function ReviewModal({ user, car_id }: ReviewProps) {
  const [hover, setHover] = useState(0);
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState<string>("");
  const [comments, setComments] = useState<string>("");
  const [openDialog, setOpenDialog] = useState(true);

  const handleSendReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating <= 0 || rating == null) {
      toast({
        variant: "destructive",
        title: "Error!",
        description:
          "Rating is required. Please select a rating before submitting.",
      });
      return;
    }

    if (!comments.trim()) {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Comments are required.",
      });
      return;
    }

    const formData = {
      user: user,
      car_id: car_id,
      image: image,
      rating: rating,
      comments: comments,
    };

    try {
      const create_review = await createReview(formData);
      // const create_review = await apiService.post(
      //   `/api/create-review/${user}`,
      //   formData
      // );

      console.log(create_review);

      if (create_review.success === true && create_review) {
        toast({
          variant: "success",
          title: "Thank you for your feedback!",
          description: create_review.message,
        });
        setRating(0);
        setComments("");
        setImage("");
        setOpenDialog(!openDialog);
      } else {
        toast({
          variant: "destructive",
          title: "Error!",
          description: create_review.message,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-5">
      <Dialog onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <Button variant="outline" onClick={() => setOpenDialog(true)}>
            Add review
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center">
              Rate your experience
            </DialogTitle>
            <DialogDescription className="pt-3">
              We highly value your feedback! Kindly take a moment to rate your
              experience and provide us with your valuable feedback.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex justify-center">
              {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                  <label key={ratingValue} className="space-x-3">
                    <input
                      type="radio"
                      name="rating"
                      value={ratingValue}
                      onClick={(e) =>
                        setRating(Number((e.target as HTMLInputElement).value))
                      }
                      className=" hidden"
                      required
                    />
                    <FaStar
                      key={ratingValue}
                      color={
                        ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                      }
                      className=" cursor-pointer transition-colors"
                      size={25}
                      onMouseEnter={() => setHover(ratingValue)}
                      onMouseLeave={() => setHover(0)}
                    />
                  </label>
                );
              })}
            </div>
            <div className="flex w-full">
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="border w-full p-2 rounded h-24 text-sm"
                placeholder="Tell us about your experience"
                required
              />
            </div>
            <div className="flex items-center justify-center ">
              <label
                htmlFor="file"
                className="flex space-x-2 text-center border-dashed border border-lime-950 cursor-pointer rounded w-fit px-4 py-2"
              >
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
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                  />
                </svg>
                <span>Upload Image</span>
              </label>
              <input
                type="file"
                id="file"
                className="hidden"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
            {image}
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-blue-600"
              onClick={handleSendReview}
            >
              Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
