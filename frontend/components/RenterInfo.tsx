"use client";
import AddRenterInfo from "@/components/AddRenterInfo";
import React, { useEffect, useState } from "react";
import useRentInfoModal from "../app/hooks/useRentInfoModal";
import CustomBtn from "./CustomBtn";
import apiService from "../app/services/apiService";
import { getUserId } from "../app/lib/action";
import useUpdateRentInfoModal from "@/app/hooks/useUpdateRentInfoModal";

const AddRenterPage = () => {
  const [renterExists, setRenterExists] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const addRentInfoModal = useRentInfoModal();
  const updateRentInfoModal = useUpdateRentInfoModal();

  useEffect(() => {
    const renterInfoChecker = async () => {
      const id = await getUserId();
      console.log("Id from renterinfo", id);
      try {
        if(id){
          const response = await apiService.get(`/api/renter_info_check/${id}`);
          console.log(response);
          if (response.renter_exists === true) {
            setRenterExists(true);
          } else {
            setRenterExists(false);
          }
        }
        
      } catch (error) {
        setErrorMessage("An error occurred!");
      }
    };
    renterInfoChecker();
  }, []);

  if (errorMessage) return <p>{errorMessage}</p>;

  const handleRent = () => {
    addRentInfoModal.open();
    console.log("Open");
  };
  
  const handleUpdateRentInfo = ()=>{
    updateRentInfoModal.open();
    
  }
  return (
    <div>
      {renterExists ? (
        <CustomBtn
        btnName="Your Info"
        onClick={handleUpdateRentInfo}
        btnStyles="w-full bg-yellow-500 rounded-full border p-2 text-white hover:scale-110 transition"
      />
      ) : (
        <>
          <CustomBtn
            btnName="Your Info"
            onClick={handleRent}
            btnStyles="w-full bg-yellow-500 rounded-full border p-2 text-white hover:scale-110 transition"
          />
        </>
      )}
    </div>
  );
};

export default AddRenterPage;
