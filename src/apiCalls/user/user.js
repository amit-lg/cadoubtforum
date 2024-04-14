import { getHeaders } from "../../utils/requestHeaders";
import { instance } from "../../utils/axiosInstance";
import { errorResponse, successResponse } from "../../utils/errors";
import axios from "axios";
import { getAccessToken } from "../../utils/cookies";
import { backendUrl, dAuth } from "../../../config";

export const getProfile = async () => {
  const headers = getHeaders();
  try {
    const response = await instance.get("/doubtforum/bio", { headers });
    if (response.status === 200) {
      return successResponse("User fetched", 200, response.data);
    }
  } catch (error) {
    return errorResponse(500, error);
  }
};

export const updateProfile = async (data) => {
  const headers = getHeaders();
  try {
    const response = await instance.post("/doubtforum/bio", data, { headers });
    if (response.status === 200) {
      return successResponse("User fetched", 200, response.data);
    }
  } catch (error) {
    return errorResponse(500, error);
  }
};

export const updateProfileWithImage = async (data) => {
  const token = getAccessToken();
  try {
    const response = await axios.post(`${backendUrl}/doubtforum/bio`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        "D-Auth": dAuth,
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return successResponse("User fetched", 200, response.data);
    }
  } catch (error) {
    return errorResponse(500, error);
  }
};
