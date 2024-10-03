
import apiService from "@/app/services/apiService";
import Image from "next/image";
import DatePicker from "@/components/DatePicker";


const CarDetailPage = async({ params}: {params:{id:string}}) => {
 
    const car_detail  = await apiService.get(`/api/cars/${params.id}/`);
    
    console.log('Car Detail', car_detail)
    console.log("hello")

  
  return (
    <div className="mx-4 overflow-hidden relative">
      {/* for images */}
      <div className="grid grid-cols-4 md:gap-5 md:p-10">
        <div className="relative w-full h-full col-span-3 row-span-2">
          <Image
            src={`http://localhost:8000${car_detail.main_img}`}
            alt="home"
            fill
            className="object-cover"
            // onClick={openModal.bind(this, 0)}
          />
        </div>
        {Array.isArray(car_detail.image) &&car_detail.image.map((img, index) => (
                    <div key={index} className="relative w-full h-60">
                        <Image
                            src={`http://localhost:8000${img.image}`} // Adjust as needed
                            alt={`Car image`}
                            className="object-cover"
                        />
                    </div>
                ))}
            
        {car_detail.image}
        <div className="relative w-full h-60 col-span-1 row-span-1">
          <Image
            src="/dummy-home.jpg"
            alt="home"
            fill
            className="object-cover"
            // onClick={openModal.bind(this, 0)}
          />
        </div>

        <div className="md:hidden flex justify-between items-center">
          <div className="flex space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="size-4 cursor-pointer"
            >
              <path
                fillRule="evenodd"
                d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8Zm10.25.75a.75.75 0 0 0 0-1.5H6.56l1.22-1.22a.75.75 0 0 0-1.06-1.06l-2.5 2.5a.75.75 0 0 0 0 1.06l2.5 2.5a.75.75 0 1 0 1.06-1.06L6.56 8.75h4.69Z"
                clipRule="evenodd"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="size-4 cursor-pointer"
            >
              <path
                fillRule="evenodd"
                d="M15 8A7 7 0 1 0 1 8a7 7 0 0 0 14 0ZM4.75 7.25a.75.75 0 0 0 0 1.5h4.69L8.22 9.97a.75.75 0 1 0 1.06 1.06l2.5-2.5a.75.75 0 0 0 0-1.06l-2.5-2.5a.75.75 0 0 0-1.06 1.06l1.22 1.22H4.75Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* for text */}
      <div className="flex justify-between md:flex-row flex-col items-center">
        <div className="flex flex-col items-center justify-center md:ml-14">
          <div className="">description
            {car_detail.description}
          </div>

          <table className="border-collapse border ">
            <tbody>
              <tr>
                <td className="border border-slate-300 p-4">
                  {car_detail.gas_type}
                </td>
                <td className="border border-slate-300 p-4">
                  {car_detail.suitcases}
                </td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-4">
                  Bret "The Hitman" Hart
                </td>
                <td className="border border-slate-300 p-4">
                  The Sharpshooter
                </td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-4">Razor Ramon</td>
                <td className="border border-slate-300 p-4">
                  Razor's Edge, Fallaway Slam
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex flex-col">
         <DatePicker/>
        </div>
       
      </div>
    </div>
  );
};

export default CarDetailPage;
