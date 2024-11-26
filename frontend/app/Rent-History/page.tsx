import { Card } from "@/components/ui/card";
import { getUserId } from "../lib/action";
import apiService from "../services/apiService";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const RentHistoryPage = async () => {
  const userId = await getUserId();
  const response = await apiService.get(`/api/rent-history/${userId}`);
  console.log(response)
  if (response.success === false) {
    console.log(response.message);
  }
  return (
    <div className="m-10">
      {response.success === true ? (
        <>
          {response.history.map((data: any) => (
            <Card className="flex md:flex-row flex-col mb-5" key={data.id}>
               <div className="p-5">
                <Image src={`http://localhost:8000/${data.car.main_img}`} alt="car-img" width={400} height={400}/>
               </div>
               <div className="p-5 space-y-5">
                 <h1 className="font-bold text-center text-lg">{data.car.brand} {data.car.model}</h1>
                 
                 <div className="grid grid-cols-2 gap-x-5 md:ml-0 ml-8 items-center">
                    <div>Pickup location: <Badge variant="secondary">{data.pickup_location}</Badge></div>
                    <div>Start Date: <Badge variant="secondary">{new Date(data.start_date).toLocaleDateString()}</Badge></div>
                 </div>

                 <div className="grid grid-cols-2 gap-x-5 md:ml-0 ml-8 items-center">
                    <div>Dropoff location: <Badge variant="secondary">{data.dropoff_location}</Badge></div>
                    <div>End Date: <Badge variant="secondary">{new Date(data.end_date).toLocaleDateString()}</Badge></div>
                 </div>

            
                    <div className="flex justify-center items-center gap-x-4">Total Cost: <Badge variant="secondary">{data.total_price}</Badge>
                    </div>
                    
          
               </div>
            </Card>
          ))}
        </>
      ) : (
        <div>{response.message}</div>
      )}
    </div>
  );
};

export default RentHistoryPage;
