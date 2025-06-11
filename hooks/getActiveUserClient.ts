"use client";
import Cookies from "js-cookie";
import axios from "axios";
import { FormatErrorResponse } from "@/helpers/FormatErrorResponse";

export const getActiveUserClient = async () => {
  try {
    const token = Cookies.get("accessToken");

    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
 
    const user = res?.data?.data;
    const userData = {
      name: user?.name,
      email: user?.email,
      userId: user?.id,
      role: user?.role,
    };

    return userData;
  } catch (error: any) {
      return FormatErrorResponse(error)
  }
};
