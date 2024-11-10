import React from "react";
import CustomBtn from "./CustomBtn";
import { resetAuthCookies } from "@/app/lib/action";
import { useRouter } from "next/navigation";

const LogoutBtn = () => {
  const router = useRouter();
  const submitLogout = async () => {
    // setUserId(null);
    resetAuthCookies().then(()=>{
      router.push("/");
    });

  };
  return <CustomBtn btnType="button" btnName="logout" onClick={submitLogout} />;
};

export default LogoutBtn;
