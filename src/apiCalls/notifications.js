import axios from "axios";
import { getHeaders } from "../utils/requestHeaders";
import { backendUrl } from "../../config";
import { errorResponse, successResponse } from "../utils/errors";

export const notificationSeen = async () => {
  const headers = getHeaders();
  try {
    const response = await axios.get(
      `${backendUrl}/doubtforum/seen`,
      {
        headers,
      }
    );
    if (response.status === 200) {
      return successResponse("Question added successfully", 200, response.data);
    }
  } catch (error) {
    return errorResponse(error.response.data.msg, error);
  }
};
