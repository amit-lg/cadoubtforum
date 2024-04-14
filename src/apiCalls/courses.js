import { dAuth } from "../../config";
import { instance } from "../utils/axiosInstance";
import { errorResponse, successResponse } from "../utils/errors";

export const getCourses = async () => {
  try {
    const response = await instance.get("/doubtforum/getcourses", {
      headers: {
        "Content-Type": "application/json",
        "D-Auth": dAuth,
      },
    });
    if (response.status === 200) {
      return successResponse("Courses Fetched", 200, response.data);
    }
  } catch (error) {
    console.log(error);
    return errorResponse(500, error);
  }
};
