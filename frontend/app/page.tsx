import BestReviews from "@/components/BestReviews";
import Hero from "@/components/Hero";
import MessageBox from "@/components/MessageBox";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen ">
        <Hero/>
         <BestReviews/>
     
    </main>
  );
}
