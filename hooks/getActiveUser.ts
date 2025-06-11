//@ts-nocheck
import { FormatErrorResponse } from "@/helpers/FormatErrorResponse";
import app_axios from "@/lib/axios";



export const getActiveUser = async () => {
    try {
      const res = await app_axios.get(`/users/me`);
      
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
  
