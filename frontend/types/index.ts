import { MouseEventHandler } from "react";

export interface CustomBtnProps{
    btnName: string;
    btnStyles?: string;
    handleClick: MouseEventHandler<HTMLButtonElement>;
    btnType?: "button" | "submit"
}