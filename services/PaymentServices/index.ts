"use server";

import { FormatErrorResponse } from "@/helpers/FormatErrorResponse";
import app_axios from "@/lib/axios";

export const createPaymentRequest = async (data: any) => {
    try {
        const res = await app_axios.post("/payment-request", data);
        return res.data;
    } catch (error: any) {
        return FormatErrorResponse(error);
    }
};
