import React from "react";
import CustomBtn from "./CustomBtn";
import { resetAuthCookies } from "@/app/lib/action";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/useUserIdContext";

const LogoutBtn = () => {
  const { setUserId } = useUser();
  const router = useRouter();
  const submitLogout = async () => {
    setUserId(null);
    resetAuthCookies();
    router.push("/");
  };
  return <CustomBtn btnType="button" btnName="logout" onClick={submitLogout} />;
};

export default LogoutBtn;
