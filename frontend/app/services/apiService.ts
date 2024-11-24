import axios from "axios";

const apiService = {
    //get data from backend
    get: async function(url:string): Promise<any>{
    //  console.log('get',url)
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`,{
            method:'GET',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        });
        if(!response.ok){
            console.error("Error fetching data:",response.statusText);
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();

        return data;
    } catch (error) {
        console.log("error")
    }
    },

    favGet: async (url:string) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`,{
                method:'GET',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            });
            if(!response.ok){
                console.error("Error fetching data:",response.statusText);
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            // const data = await response.json();
    
            return response.json();// Ensure you're returning `response.data`
        } catch (error) {
          console.error("Error in API call:", error);
          throw error; // Rethrow error for proper handling
        }
      },

    post: async function(url: string, data: any): Promise<any> {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'POST',
                body: JSON.stringify(data), // Ensure data is stringified
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });
    
            const json = await response.json(); // Parse the response as JSON
  

            if (!response.ok) {
                // If response is not OK, log and throw an error with the response message
                console.log('Full error response: ', json.password);
                console.log('Status Code:', response.status); // Log status code
                console.log('Error Detail:', json.detail); // Log specific error detail from response
                throw new Error(json.detail || response);
          
            }
    
        
            return json;

        } catch (error) {
            console.error('Error during API call:', error);
            throw error; // This preserves the error for handling in the calling function
        }
    },
    BookPost: async function(url: string, data: any): Promise<any> {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'POST',
                body: JSON.stringify(data), // Ensure data is stringified
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            // if(!response.ok){
            //     const errorResponse = await response.json();
            //     throw new Error(errorResponse || 'AN error ')
            // }
            return await response.json();

        } catch (error) {
            console.error('Error during API call:', error);
            throw error; // This preserves the error for handling in the calling function
        }
    },

    AuthPost: async function(url:string, data: any):Promise<any>{
          try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`,{
                method:'POST',
                body: JSON.stringify(data),
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });
            
            let json;
            try {
                json = await response.json();
              
            } catch (parsingError) {
                console.error("Response is not JSON:", parsingError);
                throw new Error("The server returned an unexpected response format.");
            }
            if(!response.ok){
                console.log("Full error response: ",json);
                throw new Error(json.password || json.email || json.non_field_errors || json.detail|| "An error occurred.");
            }
            return json;
          }catch(error){
             console.error("Error during API call",error)
             throw error;
          }
      }
   
 }

 export default apiService;