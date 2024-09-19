import AuthBox from "@/components/AuthBox";
import Link from "next/link";
import React from "react";

const LoginPage = () => {
  return (
    <section className="container mx-auto px-4 w-fit">
      <div className="flex flex-row border justify-center gap-10 shadow-lg m-10 py-10">
        <div className="border mx-20 p-8">
          <h1 className="text-xl font-bold space-y-2">Login</h1>
          <p className="text-sm">
            Doesn't have an account yet?
            <Link href="SignUp" className=" font-bold underline text-blue-400">
              Sign Up
            </Link>
          </p>
          <form className="flex flex-col gap-y-4 mt-3">
            <div className="">
              <label className="text-sm mb-1">Email Address</label>
              <input
                type="text"
                placeholder="youremail@gmail.com"
                className="auth__input"
              />
            </div>

            <div className="flex-col flex">
              <label className="text-sm my-2">Email Address</label>
              <input type="password" placeholder="Enter 8 characters or more" className="auth__input"/>
            </div>

            <div></div>
          </form>
        </div>
        <div className="md:flex hidden">
          <AuthBox />
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
