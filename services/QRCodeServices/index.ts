"use server"
import axios from 'axios';
interface QRCodeData {
  name: string
  url: string
  trackingEnabled: boolean
  description: string
}
interface QRCodeScanData {
  slug: string
}
export const CreateQRCode = async (data: QRCodeData) => {

  if (!data) {
    return {
      success: false,
      message: "No data provided"
    }
  }
  const { name, url, trackingEnabled, description } = data
  const staticQRData = {
    name,
    link: url,
    // trackingEnabled,
    description
  }

  console.log("staticQRData", staticQRData)
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/qrcode`,
    staticQRData)


  return {
    success: true,
    message: "QR code created successfully",
    data: response.data
  }
}
export const ScanQRCode = async (data: QRCodeScanData) => {

  if (!data) {
    return {
      success: false,
      message: "No data provided"
    }
  }
  const { slug } = data
  const hitUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/qrcode/scan/${slug}`
  console.log("hitUrl", hitUrl)

  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/qrcode/scan/${slug}`)


  return {
    success: true,
    message: "QR code scanned successfully",
    data: response.data
  }
}

export const GetAllQRCode = async () => {

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/qrcode`
  )
  return {
    success: true,
    message: "QR code retrieved successfully",
    data: response.data
  }

}