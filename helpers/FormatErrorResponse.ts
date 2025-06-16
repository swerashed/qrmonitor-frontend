export const FormatErrorResponse = (error:any) => {
  return {
    statusCode: error.response.status,
    success: error.response.data.success,
    message:  error.response.data.message,
    error: error.response.data.error,
    data: null
  }
}

