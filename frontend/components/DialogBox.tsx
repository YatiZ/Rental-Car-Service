"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
const DialogBox = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}>
        <Image
          src="/chat-box.png"
          alt="chat-box"
          width={80}
          height={80}
          className="fixed z-30 bottom-5 right-5"
        />
      </button>
      <div className="fixed z-30 bottom-24 right-16 md:bottom-14 md:right-20">
        {isOpen && (
          <iframe
            src="https://console.dialogflow.com/api-client/demo/embedded/0468d711-bd52-41e5-85c3-c32adfc0a389"
            width="300"
            height="430"
            style={{ border: "1px solid" }}
            title="Dialogflow Chat"
          ></iframe>
        )}
      </div>
    </>
  );
};

export default DialogBox;
