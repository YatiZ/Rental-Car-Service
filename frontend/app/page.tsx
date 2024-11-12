import BestReviews from "@/components/BestReviews";
import Hero from "@/components/Hero";
import MessageBox from "@/components/MessageBox";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <main className="min-h-screen ">
     
        <Hero/>

        <div className="flex justify-evenly my-10">
          <Card>
            <CardHeader>
              <CardTitle>Endless car & location options</CardTitle>
             
            </CardHeader>
            <CardContent>
              <p className="w-64">From SUV rentals and luxury car rentals to affordable options, you can search an extraordinary selection of cars and find the perfect vehicle for just about any occasion and any budget, right from your phone.</p>
            </CardContent>
   
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Airports, hotels, & more</CardTitle>
             
            </CardHeader>
            <CardContent>
              <p className="w-64">On Turo, you can rent just about any car, just about anywhere, just about any time. Decide which day and location you want to pick up your rental car, or have it delivered to your preferred location around town. From airport car rental alternatives to convenient doorstep delivery at hotels, train stations, and more, get the car you want where you want it.</p>
            </CardContent>
           
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Insurance, protection</CardTitle>
             
            </CardHeader>
            <CardContent>
              <p className="w-64">Third-party liability insurance is included, and you can choose from a selection of protection plans. You can also cancel free of charge up to 24 hours before your trip for added convenience.</p>
            </CardContent>
           
          </Card>
        </div>

        <div className="">
          <h1>Available Location</h1>
          <div className="">Hiii</div>
        </div>
         <BestReviews/>
     
    </main>
  );
}
