"use client";
import { CustomBtn } from "@/components";
import AuthBox from "@/components/AuthBox";
import Link from "next/link";
import React, { useState } from "react";
import apiService from "../services/apiService";
import { useRouter } from "next/navigation";
import { handleLogin } from "../lib/action";

const SignupPage = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [showPassword, setShowPassword] = useState<Boolean>(false);
  const [showCfPassword, setShowCfPassword] = useState<Boolean>(false);
  const [isFocused, setIsFocused] = useState<Boolean>(false);
  const [isCfpwFocused, setIsCfpwFocused] = useState<Boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      name: name,
      email: email,
      password: password,
      re_password: password2,
    };

    try {
      const response = await apiService.SignUpPost(
        "/api/users/",
        formData
      ); // No need to JSON.stringify here
      console.log("account-registration-Response:", response);

      if (response && response.id) {
        setSuccessMessage(
          "Registration successful! Please check your email for activation."
        );
      } else if (response) {
        // Handle errors returned from the API
        const tmpErrors: string[] = Object.values(response).flatMap(
          (error: any) => error
        );
        setErrors(tmpErrors);
      } else {
        setErrors(["Unknown error occurred"]);
      }
    } catch (error: any) {
      console.error("Error during registration:", error);
      setErrors([error.message]); // Show error message to the user
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/api/o/google-oauth2/";
  };

  return (
    <section className="container mx-auto px-0 w-fit md:tracking-wider lg:tracking-wider tracking-normal">
      <div className="flex justify-center">
        {successMessage && (
          <div className="p-5 mx-5 md:right-8 absolute md:top-32 top-24 bg-green-600 text-black rounded-xl opacity-80">
            {successMessage}
          </div>
        )}
      </div>
      <div className="flex justify-center">
        {Array.isArray(errors) && errors.length > 0 && (
          <div className="p-5 mx-5 md:right-8 absolute md:top-32 top-24 bg-red-600 text-white rounded-xl opacity-80">
            {" "}
            {errors.map((error, index) => {
              return <div key={`error_${index}`}>{error}</div>;
            })}
          </div>
        )}
      </div>

      <div className="flex flex-row mt-20 md:border lg:border justify-center md:gap-10 gap-0 md:shadow-lg lg:shadow-lg md:m-10 m-0 md:py-10 py-8 border-none">
        <div className="border mx-5 p-10 shadow-lg md:w-full">
          <h1 className="text-xl font-bold leading-relaxed">
            Create your account!
          </h1>
          <p className="text-sm flex">
            Already have account?
            <Link href="Login" className=" font-bold underline text-blue-400">
              Login
            </Link>
          </p>
          <form className="flex flex-col gap-y-4 mt-3" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label className="text-sm mb-1">Username</label>
              <input
                type="text"
                placeholder="your name"
                className="auth__input"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm mb-1">Email Address</label>
              <input
                type="email"
                placeholder="youremail@gmail.com"
                className="auth__input"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex-col flex">
              <div className="flex justify-between">
                <label className="text-sm my-2">Password</label>
              </div>

              <div
                className={`border flex justify-around pr-2 focus:outline focus:outline-blue-600 ${
                  isFocused ? "outline outline-blue-600 rounded outline-2" : ""
                }`}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter 8 characters or more"
                  className="auth__input w-full border-hidden focus:outline-none"
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
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

            <div className="flex-col flex">
              <div className="flex justify-between">
                <label className="text-sm my-2">confirmation Password</label>
              </div>

              <div
                className={`border flex justify-around pr-2 focus:outline focus:outline-blue-600 ${
                  isCfpwFocused
                    ? "outline outline-blue-600 rounded outline-2"
                    : ""
                }`}
              >
                <input
                  type={showCfPassword ? "text" : "password"}
                  placeholder="Must same with your password"
                  className="auth__input w-full border-hidden focus:outline-none"
                  onFocus={() => setIsCfpwFocused(true)}
                  onBlur={() => setIsCfpwFocused(false)}
                  onChange={(e) => setPassword2(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowCfPassword(!showCfPassword)}
                >
                  {showCfPassword ? (
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

            {/* <div className="flex flex-row gap-2">
              <input type="checkbox" />
              <label className="text-sm">Accept terms & conditions</label>
            </div> */}

            <div className="">
              <CustomBtn
                btnType="submit"
                btnStyles="bg-blue-500 p-2 rounded-md text-center text-white w-full"
                btnName="Sign Up"
              />
            </div>
          </form>

          <div className="flex mt-5">
            <button
              onClick={handleGoogleLogin}
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

export default SignupPage;
