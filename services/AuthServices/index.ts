"use server";

import app_axios from "@/lib/axios";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

// TODO: NEED TO CREATE A PROPER ERROR RETURN RESPONSE 

export const signUpUser = async (userData: FieldValues) => {
  try {
    const res = await app_axios.post("/users/create-user", userData);
    console.log("signup response", res.data)
    return res.data;
  } catch (error: any) {
    console.error("Signup failed:", error);
    const message = error?.response?.data?.message || "Something went wrong during sign up!";
    throw new Error(message);
  }

};

export const signInUser = async (data: FieldValues) => {

  console.log("data in action", data)
  try {
    const res = await app_axios.post("/auth/login", data);
    const result = res.data;
    if (result?.success) {
      (await cookies()).set("accessToken", result?.data?.accessToken);
    }
    return result;
  } catch (error: any) {
    return {
      statusCode: error.response.status,
      success: error.response.data.success,
      message:  error.response.data.message,
      error: error.response.data.error,
      data: null
    }
  }
};


export const changePassword = async (data:any) => {
  try {
    const res = await app_axios.post("/auth/change-password", data);
    const result = res.data;


    if (result?.success) {
      (await cookies()).set("accessToken", result?.data?.accessToken);
    }

    return result;
  } catch (error: any) {
    console.error(error);

    const message = error?.response?.data?.message || "Something went wrong!";
    return new Error(message);
  }
};



