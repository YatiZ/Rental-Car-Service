"use client";
import apiService from "../services/apiService";
import { getUserId } from "../lib/action";
import { FormEvent, ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

const UserPage = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPath, setAvatarPath] = useState<string>("");
  const [username, setUserName] = useState<string>("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const userId = await getUserId();
      setUserId(userId)
      const response = await axios.get(`http://localhost:8000/api/user/${userId}`);
      console.log(userId)
      console.log(response);
      setUserName(response.data.user.name);
      setEmail(response.data.user.email);
      const url = "http://localhost:8000";
      const filePath = `${url}${response.data.user.avatar}`;
      setAvatarPath(filePath);
    };
    fetchUser();
  }, [userId]);


const handleChangePhoto = (e:React.ChangeEvent<HTMLInputElement>)=>{
  const file = e.target.files ? e.target.files[0]: null;
  if(file){
    setAvatar(file);
    const preview = URL.createObjectURL(file);
    setAvatarPath(preview);
  }else{
    console.log("No file selected")
  }
}

  const updateProfile = async(e: FormEvent) => {
    e.preventDefault();
    const formData = {
      avatar: avatar?.name,
      name: username,
      email: email,
    }
    console.log("FormData", formData);

    try {
      await axios.patch(`http://localhost:8000/api/user/${userId}`,formData)
      .then(response =>{
        console.log(response)
        // setAvatar(response.data.avatar)
        // setUserName(response.data.name)
        // setEmail(response.data.email)
      })

    } catch (error) {
      console.log(error)
    }
  };
  return (
    <div>
      <form>
        <input
          type="file"
          className="hidden"
          name="avatar"
          id="avatar"
          onChange={handleChangePhoto}
          accept="image/*"
        />
        <label htmlFor="avatar">
          <div className="border rounded-full w-52 h-52 flex items-center justify-center overflow-hidden">
            {avatar && (
              <Image
                alt="avatar"
                src={avatarPath}
                width={208}
                height={208}
                className="object-cover"
              />
            )}
          </div>
        </label>

        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={updateProfile}>Save</button>
      </form>
    </div>
  );
};

export default UserPage;
