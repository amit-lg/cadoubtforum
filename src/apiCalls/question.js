import axios from "axios";
import { getAccessToken } from "../utils/cookies";
import { backendUrl, dAuth } from "../../config";
import { errorResponse, successResponse } from "../utils/errors";

export const getQuestions = async (data) => {
    const token = getAccessToken();
    try {
        const response = await axios.post(`${backendUrl}/doubtforum/getquestions`, data, {
            headers: {
                "Content-Type": "application/json",
                "D-Auth": dAuth,
                "Authorization": `Bearer ${token}`,
            },
        });
        if (response.status === 200) {
            return successResponse("Data fetched successfully", 200, response.data);
        }
    } catch (error) {
        return errorResponse(error.response.data.msg, error);
    }
};

export const getPinnedQuestions = async (data) => {
    const token = getAccessToken();
    try {
        const response = await axios.post(`${backendUrl}/doubtforum/pinnedquestion`, data, {
            headers: {
                "Content-Type": "application/json",
                "D-Auth": dAuth,
                "Authorization": `Bearer ${token}`,
            },
        });
        if (response.status === 200) {
            return successResponse("Data fetched successfully", 200, response.data);
        }
    } catch (error) {
        return errorResponse(error.response.data.msg, error);
    }
};

export const getAskedQuestions = async (data) => {
    const token = getAccessToken();
    try {
        const response = await axios.post(`${backendUrl}/doubtforum/askedquestion`, data, {
            headers: {
                "Content-Type": "application/json",
                "D-Auth": dAuth,
                "Authorization": `Bearer ${token}`,
            },
        });
        if (response.status === 200) {
            return successResponse("Data fetched successfully", 200, response.data);
        }
    } catch (error) {
        return errorResponse(error.response.data.msg, error);
    }
};

export const getUnansweredQuestions = async (data) => {
    const token = getAccessToken();
    try {
        const response = await axios.post(`${backendUrl}/doubtforum/unansweredquestion`, data, {
            headers: {
                "Content-Type": "application/json",
                "D-Auth": dAuth,
                "Authorization": `Bearer ${token}`,
            },
        });
        if (response.status === 200) {
            return successResponse("Data fetched successfully", 200, response.data);
        }
    } catch (error) {
        return errorResponse(error.response.data.msg, error);
    }
};

export const addQuestion = async (data) => {
    const token = getAccessToken();
    try {
        const response = await axios.post(`${backendUrl}/doubtforum/postquestion`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
                "D-Auth": dAuth,
                "Authorization": `Bearer ${token}`,
            },
        });
        if (response.status === 200) {
            return successResponse("Question added successfully", 200, response.data);
        }
    } catch (error) {
        return errorResponse(error.response.data.msg, error);
    }
};

export const likeAQuestion = async (data) => {
    const token = getAccessToken();
    try {
        const response = await axios.post(`${backendUrl}/doubtforum/questionLike`, data, {
            headers: {
                "Content-Type": "application/json",
                "D-Auth": dAuth,
                "Authorization": `Bearer ${token}`,
            },
        });
        if (response.status === 200) {
            return successResponse("Question added successfully", 200, response.data);
        }
    } catch (error) {
        return errorResponse(error.response.data.msg, error);
    }
}

export const viewAQuestion = async (data) => {
    const token = getAccessToken();
    try {
        const response = await axios.post(`${backendUrl}/doubtforum/questionView`, data, {
            headers: {
                "Content-Type": "application/json",
                "D-Auth": dAuth,
                "Authorization": `Bearer ${token}`,
            },
        });
        if (response.status === 200) {
            return successResponse("Question added successfully", 200, response.data);
        }
    } catch (error) {
        return errorResponse(error.response.data.msg, error);
    }
}

export const pinAQuestion = async (data) => {
    const token = getAccessToken();
    try {
        const response = await axios.post(`${backendUrl}/doubtforum/questionpin`, data, {
            headers: {
                "Content-Type": "application/json",
                "D-Auth": dAuth,
                "Authorization": `Bearer ${token}`,
            },
        });
        if (response.status === 200) {
            return successResponse("Question added successfully", 200, response.data);
        }
    } catch (error) {
        return errorResponse(error.response.data.msg, error);
    }
}

export const reportAQuestion = async (data) => {
    const token = getAccessToken();
    try {
        const response = await axios.post(`${backendUrl}/doubtforum/questionreport`, data, {
            headers: {
                "Content-Type": "application/json",
                "D-Auth": dAuth,
                "Authorization": `Bearer ${token}`,
            },
        });
        if (response.status === 200) {
            return successResponse("Question added successfully", 200, response.data);
        }
    } catch (error) {
        return errorResponse(error.response.data.msg, error);
    }
}
export const reportAAnswer = async (data) => {
    const token = getAccessToken();
    try {
        const response = await axios.post(`${backendUrl}/doubtforum/answerreport`, data, {
            headers: {
                "Content-Type": "application/json",
                "D-Auth": dAuth,
                "Authorization": `Bearer ${token}`,
            },
        });
        if (response.status === 200) {
            return successResponse("Question added successfully", 200, response.data);
        }
    } catch (error) {
        return errorResponse(error.response.data.msg, error);
    }
}

export const getQuestionDetails = async (data) => {
    const token = getAccessToken();
    try {
        const response = await axios.post(`${backendUrl}/doubtforum/getQuestion`, data, {
            headers: {
                "Content-Type": "application/json",
                "D-Auth": dAuth,
                "Authorization": `Bearer ${token}`,
            },
        });
        if (response.status === 200) {
            return successResponse("Question added successfully", 200, response.data);
        }
    } catch (error) {
        return errorResponse(error.response.data.msg, error);
    }
};

export const getStats = async () => {
    const token = getAccessToken();
    try {
        const response = await axios.post(`${backendUrl}/doubtforum/questionstats`, {} , {
            headers: {
                "Content-Type": "application/json",
                "D-Auth": dAuth,
                "Authorization": `Bearer ${token}`,
            },
        });
        if (response.status === 200) {
            return successResponse("Question added successfully", 200, response.data);
        }
    } catch (error) {
        return errorResponse(error.response.data.msg, error);
    }
};

export const getDashboardQuestionAndReplies = async () => {
    const token = getAccessToken();
    try {
        const response = await axios.post(`${backendUrl}/doubtforum/dashboarddata`, {} , {
            headers: {
                "Content-Type": "application/json",
                "D-Auth": dAuth,
                "Authorization": `Bearer ${token}`,
            },
        });
        if (response.status === 200) {
            return successResponse("Data fetched succesfully", 200, response.data);
        }
    } catch (error) {
        return errorResponse(error.response.data.msg, error);
    }
}



