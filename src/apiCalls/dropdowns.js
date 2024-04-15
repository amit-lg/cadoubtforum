import axios from "axios";
import { errorResponse, successResponse } from "../utils/errors";
import { backendUrl } from "../../config";
import { getHeaders } from "../utils/requestHeaders";

export const fetchSubjectTopicPoints = async (data) => {
  const headers = getHeaders();
  try {
    const response = await axios.post(
      `${backendUrl}/doubtforum/getfilter`,
      data,
      {
        headers,
      }
    );
    if (response.status === 200) {
      return successResponse("Data fetched successfully", 200, response.data);
    }
  } catch (error) {
    return errorResponse(error.response.data.msg, error);
  }
};
