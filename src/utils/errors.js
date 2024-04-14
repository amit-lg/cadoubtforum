import { AxiosError } from "axios";

export const errorResponse = (status, error) => {
  let msg = "";
  if (error) {
    if (error instanceof AxiosError) {
      status = error?.response?.status || status;
      msg = error?.response?.data?.message || "Something went wrong";
      error = error?.response?.data || error.message;
    }
  }
  const response = {
    status: status || 500,
    msg: msg || "Internal Server Error",
    error,
  };

  return response;
};

export const successResponse = (msg, status, data) => {
  const response = {
    status: status,
    msg: msg,
    data: data,
  };

  return response;
};
