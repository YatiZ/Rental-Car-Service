"use server";

//to store account in the cookies
import { cookies } from "next/headers";
import apiService from "../services/apiService";
import { revalidatePath } from "next/cache";

export async function handleLogin(
  userId: string,
  accessToken: string,
  refreshToken: string
) {
  cookies().set("session_userid", userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, //one week
    path: "/",
  });

  cookies().set("session_access_token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60, //60 minutes
    path: "/",
  });
  cookies().set("session_refresh_token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  return true;
}

export async function getUserId() {
  const userId = cookies().get("session_userid")?.value;

  return userId ? userId : null;
}

export async function resetAuthCookies() {
  cookies().set("session_userid", ""),
    cookies().set("session_access_token", ""),
    cookies().set("session_refresh_token", "");
}

export async function createReview(formData: any) {
  try {
    const create_review = await apiService.post(
      `/api/create-review/${formData.user}`,
      formData
    );

    revalidatePath(`/CarDetail/${formData.car_id}`);

    return create_review;
  } catch (error) {
    return {
      message: "Failed",
      success: false,
    };
  }
}
