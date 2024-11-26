import { Card } from "@/components/ui/card";
import { getUserId } from "../lib/action";
import apiService from "../services/apiService";

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
        <Card>
          {response.history.map((data: any) => (
            <div key={data.id}>{data.start_date}
            {data.car.brand}
            </div>
          ))}
        </Card>
      ) : (
        <div>{response.message}</div>
      )}
    </div>
  );
};

export default RentHistoryPage;
