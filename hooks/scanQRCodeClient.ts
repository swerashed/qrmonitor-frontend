"use client"

import { FormatErrorResponse } from "@/helpers/FormatErrorResponse";
import axios from "axios";

export const scanQRCodeClient = async (data: any) => {

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
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API}/qr-code/track-scan`, { qrId, fingerprint }
        );
        return response.data;
    } catch (error) {
        return FormatErrorResponse(error)
    }
}