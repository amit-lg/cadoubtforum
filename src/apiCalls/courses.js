import { instance } from "../utils/axiosInstance";
import { errorResponse, successResponse } from "../utils/errors";
import { getHeaders } from "../utils/requestHeaders";

export const getCourses = async () => {
  const headers = getHeaders();
  try {
    const response = await instance.get("/doubtforum/getcourses", {
      headers,
    });
    if (response.status === 200) {
      return successResponse("Courses Fetched", 200, response.data);
    }
  } catch (error) {
    console.log(error);
    return errorResponse(500, error);
  }
};
