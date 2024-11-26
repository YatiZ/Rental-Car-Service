"use client";
import apiService from "../services/apiService";
import { getUserId } from "../lib/action";
import { useEffect, useState } from "react";

const UserPage = () => {
    const [userId, setUserId] = useState<string | null>(null);
    const [avatar, setAvatar] = useState<File | null>(null);
    const [username, setUserName] = useState<string>('');
    const [email, setEmail] = useState('');
  useEffect(() => {
    const fetchUser = async () => {
      const userId = await getUserId();
      const response = await apiService.get(`/api/user/${userId}`);
      console.log(response)
    //   setUserId(userId)
      setUserName(response.user.name)
      setEmail(response.user.email)
    };
    fetchUser();
  },[]);

  return (
    <div>
 
      This is user page
 
      <form>
        <label>Username</label>
        <input type="text" value={username} onChange={(e)=>setUserName(e.target.value)}/>
        <label>Email</label>
        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
      </form>
    </div>
  );
};

export default UserPage;
