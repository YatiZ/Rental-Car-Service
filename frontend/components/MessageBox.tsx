"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { delay, motion } from "framer-motion";
import Image from "next/image";
import CustomBtn from "./CustomBtn";

const containerVarients = {
  hidden: {
    y: "100vh",
  },
  visible: {
    x: 0,
  },
  exit: {
    transition: { type: "spring", delay: 0.2, stiffness: 25 },
  },
};
const MessageBox = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Image src="/chat-box.png" alt="chat-box" width={80} height={80} />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center gap-7 mb-5">
                <div className="">
                    <Image src='/service-avatar.png' alt="" width={40} height={40} className=""/>
                </div>
                <div className="">
                    <h2>Chat Bot AI (24/7)</h2>
                </div>
            </div>
          </DialogTitle>
          <DialogDescription>
            <div className="max-h-[300px] overflow-auto flex flex-col space-y-4">
              <div className="w-[80%] py-4 px-6 rounded-xl bg-gray-200">
                <p className="font-bold text-gray-500">John Doe</p>
                <p>HKekwie</p>
              </div>

              <div className="w-[80%] ml-[20%] py-4 px-6 rounded-xl bg-blue-200">
                <p className="font-bold text-gray-500">John Doe</p>
                <p>HKekwie</p>
              </div>
              <div className="w-[80%] ml-[20%] py-4 px-6 rounded-xl bg-blue-200">
                <p className="font-bold text-gray-500">John Doe</p>
                <p>HKekwie</p>
              </div>
            </div>

            <div className="mt-4 py-4 px-6 flex border border-gray-300 space-x-4 rounded-xl">
              <input
                type="text"
                placeholder="Type your message ..."
                className="w-full p-2 bg-gray-200 rounded-xl"
              />

              <CustomBtn btnName="Send" btnStyles="w-[100px]" />
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default MessageBox;
