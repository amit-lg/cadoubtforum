import { backendUrl } from "../../config";
import { instance } from "../utils/axiosInstance";
import { errorResponse, successResponse } from "../utils/errors";
import { getHeaders } from "../utils/requestHeaders";

export const addFeedback = async (data) => {
  const headers = getHeaders();
  try {
    const response = await instance.post(
      `${backendUrl}/doubtforum//addfeedback`,
      data,
      {
        headers,
      }
    );
    if (response?.status === 200) {
      return successResponse("Feedback added successfully", 200, response.data);
    }
  } catch (error) {
    return errorResponse(error.response.data.msg, error);
  }
};

export const addIssue = async (data) => {
  const headers = getHeaders();
  try {
    const response = await instance.post(
      `${backendUrl}/doubtforum//addissue`,
      data,
      {
        headers,
      }
    );
    if (response?.status === 200) {
      return successResponse("Feedback added successfully", 200, response.data);
    }
  } catch (error) {
    return errorResponse(error.response.data.msg, error);
  }
};
