import { MouseEventHandler } from "react";

export interface CustomBtnProps{
    btnName: string;
    btnStyles?: string;
    handleClick: MouseEventHandler<HTMLButtonElement>;
    btnType?: "button" | "submit"
}

export type HomeType = {
    id: string;
    title: string;
    price_per_month: number;
    address: string;
    main_img: string;
    description: string;
    built_at: string; // Assuming you're handling dates as strings (e.g., ISO format)
    
    bedrooms: number;
    bathrooms: number;
    living_areas: number;
    kitchen: boolean;
    laundry: boolean;
  
    heating: boolean;
    cooling: boolean;
    water_supply: boolean;
    internet_access: boolean;
    electricity: boolean;
  
    security_system: boolean;
    smoke_detector: boolean;
  
    yard: boolean;
    parking_space: boolean;
  
    images: string[]; // Assuming images are URLs; adjust as needed based on how you handle images
  };
  