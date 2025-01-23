import React from "react";
import { Skeleton } from "../ui/skeleton";
import Image from "next/image";

const FAQLoading = () => {
  return (
    <div className="m-5 md:mx-7 lg:mx-8 ">
      {[...Array(5)].map((_, index) => (
        <Skeleton key={index} className="border w-full mb-3 rounded-none">
          <div className="border-l-4 border-l-gray-500">
            <div className="py-3 pl-2 flex justify-between items-center">
              <Image
                src="/question.png"
                alt="question"
                width={50}
                height={50}
              />
              <div className="pr-2">
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
                    d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"
                  />
                </svg>
              </div>
            </div>
          </div>
        </Skeleton>
      ))}
    </div>
  );
};

export default FAQLoading;
