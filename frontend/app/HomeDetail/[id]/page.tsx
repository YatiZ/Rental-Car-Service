"use client";
import apiService from "@/app/services/apiService";
import { HomeType } from "@/types";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";



type Props ={
  home: HomeType | null;
}
const HomeDetailPage: React.FC<Props> = ({ home }) => {
  // const router = useRouter();
  // const { id } = router.query;
  // const [home, setHome] = useState<HomeType[]>([]);

  // const getHomeDetail = async () => {
  //   const homedata = await apiService.get(`/api/homes/${id}/`)
  //   setHome(homedata.data)
  // }

  // useEffect(()=>{
  //   if (router.isReady) {
  //     getHomeDetail();
  //   }
  // },[router.isReady, id]);

  return (
    <div className="mx-4 overflow-hidden relative">
      {/* for images */}
      <div className="grid grid-rows-1 md:grid-cols-4 md:gap-5 md:p-10">
        <div className="relative w-full h-full col-span-3 row-span-2">
          {/* {home.images?.map((img, index) => (
            <Image
              key={index}
              src={`http://localhost:8000${img}`}
              alt="home"
              fill
              className="object-cover"
              // onClick={openModal.bind(this, 0)}
            />
          ))} */}
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
      <div className="grid grid-cols-3"></div>
    </div>
  );
};


export default HomeDetailPage;
