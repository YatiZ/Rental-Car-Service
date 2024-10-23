const apiService = {
    //get data from backend
    get: async function(url:string): Promise<any>{
    //  console.log('get',url)
 
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
            console.log('Full response from API:', json);

            if (!response.ok) {
                // If response is not OK, log and throw an error with the response message
                console.log('Full error response: ', json);
    
                // Check if the response still has account creation data
                if (json.email && json.id) {
                    return json; // Return success data
                }
    
                // Throw an error for other cases
                throw new Error(json.non_field_errors ? json.non_field_errors.join(', ') : 'Unknown error');
            }
    
            console.log('Response from signup', json);
            return json;

        } catch (error) {
            console.error('Error during API call:', error);
            throw error; // This preserves the error for handling in the calling function
        }
    },

    // signUpPost: async function (url: string, data:any):Promise<any> {
    //     const token = await getAccessToken();

    //     return new Promise((resolve, reject)=>{
    //         fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`,{
    //             method:'POST',
    //             body: data,
    //             headers:{
    //                 'Authorization':
    //             }
    //         })
    //     })
    // }
    
 }

 export default apiService;