"use server";

import { FormatErrorResponse } from "@/helpers/FormatErrorResponse";
import app_axios from "@/lib/axios";
import { FieldValues } from "react-hook-form";

export const sendContactMessage = async (data: FieldValues) => {
    try {
        const res = await app_axios.post("/contact/send-message", data);
        return res.data;
    } catch (error: any) {
        return FormatErrorResponse(error);
    }
};
