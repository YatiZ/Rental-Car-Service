"use client";
import CustomBtn from "@/components/CustomBtn";
import AuthBox from "@/components/AuthBox";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import apiService from "../services/apiService";
import { handleLogin } from "../lib/action";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "@/hooks/use-toast";


const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState<Boolean>(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState<Boolean>(false);
  const router = useRouter();
  const submitLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      email: email,
      password: password,
    };
    
    try {
      const response = await apiService.AuthPost("/api/jwt/create/", formData);

      if (!response.access) {
        const tmpErrors: string[] = Object.values(response).flatMap(
          (error:any)=> error
        );
        toast({
          variant:"destructive",
          title: "Account Login Error!",
          description: tmpErrors,
        })

      }
      // else if(response.detail){
      //   console.log(response.detail)
      // }
  
      const accessToken = response.access;
      const refreshToken = response.refresh;
      

      //fetch user details with the access token
      const userResponse = await axios.get(
        "http://localhost:8000/api/users/me/",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (userResponse && userResponse.data.id) {
        const isSuccess = await handleLogin(userResponse.data.id, accessToken, refreshToken);
        if(isSuccess){
          toast({
            variant:"success",
            title: "Account Login Successfully!",
            description: userResponse.statusText,
          })
          router.push("/");
        }
  

      }


    } catch (error:any) {
      if(error.response && error.response.status === 401){
        toast({
          variant:"destructive",
          title: "Account Login Error!",
          description: "Incorrect email or password. Please try again.",
        })

      }else{
        toast({
          variant:"destructive",
          title: "Account Login Error!",
          description: error.message,
        })
    
      }
    }

   
  };
  return (
    <section className="container mx-auto px-0 w-fit md:tracking-wider lg:tracking-wider tracking-normal">
  
      <div className="flex flex-row mt-14 md:border lg:border justify-center md:gap-10 gap-0 md:shadow-lg lg:shadow-lg md:m-10 m-0 md:py-10 py-8 border-none">
  
        <div className="border mx-5 p-10 shadow-lg md:w-full">
          <h1 className="text-xl font-bold leading-relaxed">Login</h1>
          <p className="text-sm flex">
            Doesn't have an account yet?
            <Link href="Signup" className=" font-bold underline text-blue-400">
              Sign Up
            </Link>
          </p>
          <form className="flex flex-col gap-y-4 mt-3" onSubmit={submitLogin}>
            <div className="flex flex-col">
              <label className="text-sm mb-1">Email Address</label>
              
              <input
                type="text"
                placeholder="your email@gmail.com"
                className="auth__input"
                onChange={(e) => setEmail(e.target.value)}
              />
         
             
            </div>

            <div className="flex-col flex">
              <div className="flex justify-between">
                <label className="text-sm my-2">Password</label>
                <span className="text-sm my-2 underline text-blue-400">
                  Forget Password
                </span>
              </div>
              
              <div className={`border flex justify-around pr-2 focus:outline focus:outline-blue-600 ${isFocused ? 'outline outline-blue-600 rounded outline-2':''}`} tabIndex={0}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="your password"
                className="auth__input w-full border-hidden focus:outline-none"
                value={password}
                onFocus={()=>setIsFocused(true)}
                onBlur={()=>setIsFocused(false)}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  </p>
                ) : (
                  <p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                    
                  </p>
                )}
              </button>
              </div>

            </div>

            <div className="flex flex-row gap-2">
              <input type="checkbox" />
              <label className="text-sm">Remember me</label>
            </div>

            <div className="">
              <CustomBtn
                btnType="submit"
                btnStyles="bg-blue-500 p-2 rounded-md text-center text-white w-full"
                btnName="Login"
              />
            </div>
          </form>

          <div className="flex mt-5 w-full">
            <button
              type="button"
              className="border flex items-center justify-center gap-2 border-red-500 rounded-md px-6 py-2 w-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="30"
                height="30"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                ></path>
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                ></path>
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
              </svg>
              <span>Google</span>
            </button>

    
          </div>
        </div>
        <div className="md:flex hidden">
          <AuthBox />
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
