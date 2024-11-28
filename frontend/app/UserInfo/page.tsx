"use client";
import apiService from "../services/apiService";
import { getUserId } from "../lib/action";
import { ReactNode, useEffect, useState } from "react";
import Image from "next/image";

const UserPage = () => {
    const [userId, setUserId] = useState<string | null>(null);
    const [avatar, setAvatar] = useState<string>('');
    const [username, setUserName] = useState<string>('');
    const [email, setEmail] = useState('');
  useEffect(() => {
    const fetchUser = async () => {
      const userId = await getUserId();
      const response = await apiService.get(`/api/user/${userId}`);
      console.log(response)
      setUserName(response.user.name)
      setEmail(response.user.email)
      const url = 'http://localhost:8000'
      const filePath = (`${url}${response.user.avatar}`)
      setAvatar(filePath)
    };
    fetchUser();
  },[]);

  const handleChangePhoto = (e:React.ChangeEvent<HTMLInputElement>)=>{
    console.log("hello")
     const file = e.target.files?.[0];
     if(file){
        const reader = new FileReader();
        reader.onload = ()=>{
            if(typeof reader.result === 'string'){
                setAvatar(reader.result);
            }
        };
        reader.readAsDataURL(file);
     }
  }
  return (
    <div>
 
      This is user page
 
      <form>
        
        <input type="file" className="hidden" name="avatar" id="avatar" onChange={handleChangePhoto} accept="image/*"/>
        <label htmlFor="avatar" >
            <div className="border rounded-full w-52 h-52 flex items-center justify-center overflow-hidden">
            <Image alt="avatar" src={avatar} width={208} height={208} className="object-cover"/>
            </div>
      
        </label>
      
        <label>Username</label>
        <input type="text" value={username} onChange={(e)=>setUserName(e.target.value)}/>
        <label>Email</label>
        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
      </form>
    </div>
  );
};

export default UserPage;
