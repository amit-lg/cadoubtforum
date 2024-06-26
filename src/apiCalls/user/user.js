import { getHeaders, getHeadersWithFormData } from "../../utils/requestHeaders";
import { instance } from "../../utils/axiosInstance";
import { errorResponse, successResponse } from "../../utils/errors";

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
  const headers = getHeadersWithFormData();
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
  const headers = getHeadersWithFormData();
  try {
    const response = await instance.post(`/doubtforum/bio`, data, {
      headers,
    });
    if (response.status === 200) {
      return successResponse("User fetched", 200, response.data);
    }
  } catch (error) {
    return errorResponse(500, error);
  }
};
