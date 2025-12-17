"use server";

import { FormatErrorResponse } from "@/helpers/FormatErrorResponse";
import app_axios from "@/lib/axios";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

// TODO: NEED TO CREATE A PROPER ERROR RETURN RESPONSE 

export const signUpUser = async (data: FieldValues) => {
  try {
    const res = await app_axios.post("/users/create-user", data);
    return res.data;
  } catch (error: any) {
    return FormatErrorResponse(error)
  }

};

export const signInUser = async (data: FieldValues) => {
  try {
    const res = await app_axios.post("/auth/login", data);
    const result = res.data;
    if (result?.success) {
      (await cookies()).set("accessToken", result?.data?.accessToken);
    }
    return result;
  } catch (error: any) {
    return FormatErrorResponse(error)
  }
};


export const changePassword = async (data: any) => {
  try {
    const res = await app_axios.post("/auth/change-password", data);
    const result = res.data;


    if (result?.success) {
      (await cookies()).set("accessToken", result?.data?.accessToken);
    }

    return result;
  } catch (error: any) {
    const message = error?.response?.data?.message || "Something went wrong!";
    return new Error(message);
  }
};

export const verifyEmail = async (data: FieldValues) => {
  try {
    const res = await app_axios.post("/auth/verify-email", data);
    return res.data;
  } catch (error: any) {
    return FormatErrorResponse(error);
  }
};

export const resendOtp = async (data: FieldValues) => {
  try {
    const res = await app_axios.post("/auth/resend-otp", data);
    return res.data;
  } catch (error: any) {
    return FormatErrorResponse(error);
  }
};

export const forgetPassword = async (data: FieldValues) => {
  try {
    const res = await app_axios.post("/auth/forgot-password", data);
    return res.data;
  } catch (error: any) {
    return FormatErrorResponse(error);
  }
};

export const resetPassword = async (data: FieldValues, token: string) => {
  try {
    const res = await app_axios.post("/auth/reset-password", data, {
      headers: {
        Authorization: token,
      },
    });
    return res.data;
  } catch (error: any) {
    return FormatErrorResponse(error);
  }
};



