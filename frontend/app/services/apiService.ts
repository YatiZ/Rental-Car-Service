const apiService = {
    //get data from backend
    get: async function(url:string): Promise<any>{
     console.log('get',url)
 
     return new Promise((resolve, reject)=>{
         fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`,{
             method:'GET',
             headers:{
                 'Accept':'application/json',
                 'Content-Type':'application/json'
             }
         })
         .then(response => response.json())
         .then((json)=>{
             console.log('Response', json)
 
             resolve(json)
         })
         .catch((error)=>{
             reject(error)
         })
     })
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
                // If response is not OK, throw an error with the response
                throw new Error(json.non_field_errors ? json.non_field_errors.join(', ') : 'Unknown error');
            }
    
            console.log('Response from signup', json);
            return json; // Return the parsed JSON if successful
        } catch (error) {
            console.error('Error during API call:', error);
            throw error; // This preserves the error for handling in the calling function
        }
    }
    
 }

 export default apiService;