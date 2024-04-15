import axios from "axios";
import { backendUrl } from "../../config";
import { errorResponse, successResponse } from "../utils/errors";
import { getHeaders } from "../utils/requestHeaders";

export const addAnswer = async (data) => {
  const headers = getHeaders();
  try {
    const response = await axios.post(
      `${backendUrl}/doubtforum/addanswers`,
      data,
      {
        headers,
      }
    );
    if (response?.status === 201) {
      return successResponse("Question added successfully", 201, response.data);
    }
  } catch (error) {
    return errorResponse(error.response.data.msg, error);
  }
};

export const likeAAnswer = async (data) => {
  const headers = getHeaders();
  try {
    const response = await axios.post(
      `${backendUrl}/doubtforum/addanswerlike`,
      data,
      {
        headers
      }
    );
    if (response.status === 201) {
      return successResponse("Question added successfully", 201, response.data);
    }
  } catch (error) {
    return errorResponse(error.response.data.msg, error);
  }
};
