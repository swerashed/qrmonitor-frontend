import app_axios from "@/lib/axios"

export const getUserProfile = async () => {

    const response = await app_axios.get(`/users/me`)
    return {
      success: true,
      message: "User fetched successfully",
      data: response.data
    }
  }
  