import axios from "axios";
import { getAccessToken } from "../utils/cookies";
import { backendUrl, dAuth } from "../../config";
import { errorResponse, successResponse } from "../utils/errors";

export const addAnswer = async (data) => {
    const token = getAccessToken();
    try {
        const response = await axios.post(`${backendUrl}/doubtforum/addanswers`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
                "D-Auth": dAuth,
                Authorization: `Bearer ${token}`,
            },
        });
        if (response?.status === 201) {
            return successResponse("Question added successfully", 201, response.data);
        }
    } catch (error) {
        return errorResponse(error.response.data.msg, error);
    }
};

export const likeAAnswer = async (data) => {
    const token = getAccessToken();
    try {
        const response = await axios.post(`${backendUrl}/doubtforum/addanswerlike`, data, {
            headers: {
                "Content-Type": "application/json",
                "D-Auth": dAuth,
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.status === 201) {
            return successResponse("Question added successfully", 201, response.data);
        }
    } catch (error) {
        return errorResponse(error.response.data.msg, error);
    }
}