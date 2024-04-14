import axios from "axios";
import { errorResponse, successResponse } from "../utils/errors";
import { backendUrl, dAuth } from "../../config";
import { getAccessToken } from "../utils/cookies";

export const fetchSubjectTopicPoints = async (data) => {
  const token = getAccessToken();
  try {
    const response = await axios.post(
      `${backendUrl}/doubtforum/getfilter`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          "D-Auth": dAuth,
          "Authorization": `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return successResponse("Data fetched successfully", 200, response.data);
    }
  } catch (error) {
    return errorResponse(error.response.data.msg, error);
  }
};
