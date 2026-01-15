"use client";
import Cookies from "js-cookie";
import axios from "axios";
import { FormatErrorResponse } from "@/helpers/FormatErrorResponse";
import { getApiUrl } from "@/helpers/getApiUrl";

export const getActiveUserClient = async () => {
  try {
    const token = Cookies.get("accessToken");
    const baseUrl = await getApiUrl();

    const res = await axios.get(`${baseUrl}/users/me`, {
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
