import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import AddRentInfoModal from "@/components/modals/AddRentInfoModal";
import UpdateRentInfoModal from "@/components/modals/UpdateRentInfo";
import MessageBox from "@/components/MessageBox";
import DialogBox from "@/components/DialogBox";
import { UserProvider } from "./context/useUserIdContext";




export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
        <NavBar/>
        {children}
        <AddRentInfoModal/>
        <UpdateRentInfoModal/>
        <div id="scroll" className=" ">
           {/* <MessageBox/> */}
           <DialogBox/>
        </div>
        <Footer/>
        </UserProvider>
      </body>
    </html>
  );
}
