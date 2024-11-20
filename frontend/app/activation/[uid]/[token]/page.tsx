'use client'
import apiService from '@/app/services/apiService';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const ActivationPage = () => {
    const router = useRouter();
    const {uid, token} = useParams();

    useEffect(()=>{
        const activationAccount = async()=>{

            if (uid && token){
                try {
                    // const response = await apiService.post('/api/users/activation/',{uid, token});
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/users/activation/`, {
                        method: 'POST',
                        body: JSON.stringify({uid,token}), // Ensure data is stringified
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        }
                    })
                    
                    // const response  = await result.json();
         
                    if(response.ok && response.status === 204){
              

                        router.push('/Login')
                    }
                    else{
                        console.error('Activation Error',response)
                    }
           
                } catch (error) {
                    console.log('Error during activation', error)
                }
            }
        };
        activationAccount();

    },[])
  return (
    <div>
        <h1>Your account is now active!</h1>
        <p>Thank you for confirming your account. You may log in now!</p>
       
    </div>
  )
}

export default ActivationPage