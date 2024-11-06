"use client";
import React, { useState } from "react";
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


const MessageBox = () => {
    const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog>
      <DialogTrigger onClick={()=>setIsOpen(true)}>
      <Image src="/chat-box.png" alt="chat-box" width={80} height={80} />
      </DialogTrigger>

      <DialogContent>
        {isOpen &&
      
      <iframe
        src="https://console.dialogflow.com/api-client/demo/embedded/0468d711-bd52-41e5-85c3-c32adfc0a389"
        width="350"
        height="430"
        style={{ border: 'none' }}
        title="Dialogflow Chat"
      ></iframe>
      
    
}
      </DialogContent>
    </Dialog>
  );
};

export default MessageBox;
