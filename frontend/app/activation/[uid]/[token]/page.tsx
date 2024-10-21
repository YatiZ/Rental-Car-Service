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
                    const response = await apiService.post('/api/users/activation/',{uid, token});

                    if(response){
                        console.log('Account activated!',response)

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
    },[uid, token,router])
  return (
    <div>ActivationPage
        <h1>Activating account ...</h1>
        <p>Please wait while we activate your account.</p>
    </div>
  )
}

export default ActivationPage