import { backendUrl } from "../../config";
import { errorResponse, successResponse } from "../utils/errors";
import { getHeaders, getHeadersWithFormData } from "../utils/requestHeaders";
import { instance } from "../utils/axiosInstance";
import axios from "axios";

export const addAnswer = async (data) => {
  const headers = getHeadersWithFormData();
  try {
    const response = await instance.post(
      `${backendUrl}/doubtforum/addanswers`,
      data,
      {
        headers,
      }
    );
    if (response?.status === 201) {
      return successResponse("Answers added successfully", 201, response.data);
    }
  } catch (error) {
    return errorResponse(error.response.data.msg, error);
  }
};

export const likeAAnswer = async (data) => {
  const headers = getHeaders();
  try {
    const response = await instance.post(
      `${backendUrl}/doubtforum/addanswerlike`,
      data,
      {
        headers
      }
    );
    if (response.status === 201) {
      return successResponse("Answer liked successfully", 201, response.data);
    }
  } catch (error) {
    return errorResponse(error.response.data.msg, error);
  }
};


export const editAnswer = async (data) => {
  const url = `${backendUrl}/doubtforum/editAnswer`;
  const headers = getHeadersWithFormData();
  try {
    const response = await axios.patch(url, data, { headers });
    if (response.status === 200 || response.status === 201) {
      return successResponse(
        "Answer edited successfully",
        response.status,
        response.data
      );
    }
  } catch (error) {
    return errorResponse(error.response.data.msg, error);
  }
};

export const removeAnswerImage = async (id) => {
  const url = `${backendUrl}/doubtforum/removeanswerimage?attachmentID=${id}`;
  const headers = getHeadersWithFormData();
  try {
    const response = await axios.delete(url, { headers });
    if (response.status === 200 || response.status === 201) {
      return successResponse(
        "Image deleted successfully",
        response.status,
        response.data
      );
    }
  } catch (error) {
    return errorResponse(error.response.data.msg, error);
  }
};
