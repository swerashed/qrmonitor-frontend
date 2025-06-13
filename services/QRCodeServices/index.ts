"use server"
import { FormatErrorResponse } from '@/helpers/FormatErrorResponse';
import { getActiveUser } from '@/hooks/getActiveUser';
import app_axios from '@/lib/axios';
import axios from 'axios';

interface QRCodeScanData {
  slug: string
}
export const CreateQRCode = async (data: any) => {

  if (!data) {
    return {
      success: false,
      message: "No data provided"
    }
  }
  try {
    const activeUserResponse = await getActiveUser()
    if('statusCode' in activeUserResponse || !activeUserResponse?.userId) return
    const finalQRData = {
      ...data,
      creatorId: activeUserResponse?.userId as string
    }
  
    const response = await app_axios.post(`/qr-code/create-qr`,
      finalQRData)
    return response.data
  } catch (error) {
    return FormatErrorResponse(error)
  }
}


export const editQRCode = async (data: any) => {
  if (!data) {
    return {
      success: false,
      message: "No data provided"
    };
  }

  const { id } = data;

  if (!id) {
    return {
      success: false,
      message: "QR Code ID is required for editing"
    };
  }

  const updateData = data;

  try {
    const response = await app_axios.patch(`/qr-code/update-qr/${id}`,
      updateData
    );

    return response.data;
  } catch (error) {
    return FormatErrorResponse(error)
  }
};


export const scanQRCode = async (data: any) => {

  if (!data) {
    return {
      success: false,
      message: "No data provided"
    };
  }

  const { fingerprint, qrId } = data;

  if (!qrId) {
    return {
      success: false,
      message: "QR Id is required for tracking"
    };
  }
  if (!fingerprint) {
    return {
      success: false,
      message: "fingerprint is required for tracking"
    };
  }


  try {
    const response = await app_axios.post(`qr-code/track-scan`,{qrId, fingerprint}
    );

    return response.data;
  } catch (error) {
    return FormatErrorResponse(error)
  }
}

export const GetSingleQRCode = async (id: string) => {
  if (!id) {
    return {
      success: false,
      message: "No id provided"
    }
  }

  const response = await app_axios.get(`/qr-code/get-single-qr/${id}`)
  return {
    success: true,
    message: "QR code fetched successfully",
    data: response.data
  }
}


export const deleteQrCode = async (id: string) => {
  if (!id) {
    return {
      success: false,
      message: "No id provided"
    }
  }

  const response = await app_axios.delete(`/qr-code/delete/${id}`)
  return response.data
}


export const getDashboardStats = async () => {
  const response = await app_axios.get(`/qr-code/dashboard/stats`)
  return response.data
}

export const getDashboardAnalytics = async () => {
  const response = await app_axios.get(`/qr-code/dashboard/analytics`)
  return response.data
}


export const GetAllQRCode = async () => {
  const response = await app_axios.get(`/qr-code/get-all-qr`)
  return response.data

}

