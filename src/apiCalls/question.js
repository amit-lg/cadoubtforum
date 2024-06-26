import axios from "axios";
import { backendUrl } from "../../config";
import { errorResponse, successResponse } from "../utils/errors";
import { getHeaders, getHeadersWithFormData } from "../utils/requestHeaders";

export const getQuestions = async (data) => {
  const canCelToken = data.cancelToken;
  const headers = getHeaders();
  try {
    const response = await axios.post(
      `${backendUrl}/doubtforum/getquestions`,
      data,
      {
        headers,
        cancelToken: canCelToken,
      }
    );
    if (response.status === 200) {
      return successResponse("Data fetched successfully", 200, response.data);
    }
  } catch (error) {
    return errorResponse(error.response.data.msg, error);
  }
};

export const getQuestionsTest = async (data) => {
  const headers = getHeaders();
  try {
    const response = await axios.post(
      `https://connect-api-hc5x.onrender.com/api/post/feed?page=${data.cursor}`,
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

export const getPinnedQuestions = async (data) => {
  const canCelToken = data.cancelToken;
  const headers = getHeaders();
  try {
    const response = await axios.post(
      `${backendUrl}/doubtforum/pinnedquestion`,
      data,
      {
        headers,
        cancelToken: canCelToken,
      }
    );
    if (response.status === 200) {
      return successResponse("Data fetched successfully", 200, response.data);
    }
  } catch (error) {
    return errorResponse(error.response.data.msg, error);
  }
};

export const getAskedQuestions = async (data) => {
  const headers = getHeaders();
  const cancelToken = data.cancelToken;
  try {
    const response = await axios.post(
      `${backendUrl}/doubtforum/askedquestion`,
      data,
      {
        headers,
        cancelToken: cancelToken,
      }
    );
    if (response.status === 200) {
      return successResponse("Data fetched successfully", 200, response.data);
    }
  } catch (error) {
    return errorResponse(error.response.data.msg, error);
  }
};

export const getUnansweredQuestions = async (data) => {
  const headers = getHeaders();
  const cancelToken = data.cancelToken;
  try {
    const response = await axios.post(
      `${backendUrl}/doubtforum/unansweredquestion`,
      data,
      {
        headers,
        cancelToken: cancelToken,
      }
    );
    if (response.status === 200) {
      return successResponse("Data fetched successfully", 200, response.data);
    }
  } catch (error) {
    return errorResponse(error.response.data.msg, error);
  }
};

export const addQuestion = async (data) => {
  const headers = getHeadersWithFormData();
  try {
    const response = await axios.post(
      `${backendUrl}/doubtforum/postquestion`,
      data,
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

export const likeAQuestion = async (data) => {
  const headers = getHeaders();
  try {
    const response = await axios.post(
      `${backendUrl}/doubtforum/questionLike`,
      data,
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

export const viewAQuestion = async (data) => {
  const headers = getHeaders();
  try {
    const response = await axios.post(
      `${backendUrl}/doubtforum/questionView`,
      data,
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

export const pinAQuestion = async (data) => {
  const headers = getHeaders();
  try {
    const response = await axios.post(
      `${backendUrl}/doubtforum/questionpin`,
      data,
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

export const reportAQuestion = async (data) => {
  const headers = getHeaders();
  try {
    const response = await axios.post(
      `${backendUrl}/doubtforum/questionreport`,
      data,
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
export const reportAAnswer = async (data) => {
  const headers = getHeaders();
  try {
    const response = await axios.post(
      `${backendUrl}/doubtforum/answerreport`,
      data,
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

export const getQuestionDetails = async (data) => {
  const headers = getHeaders();
  try {
    const response = await axios.post(
      `${backendUrl}/doubtforum/getQuestion`,
      data,
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

export const getStats = async () => {
  const headers = getHeaders();
  try {
    const response = await axios.post(
      `${backendUrl}/doubtforum/questionstats`,
      {},
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

export const getDashboardQuestionAndReplies = async () => {
  const headers = getHeaders();
  try {
    const response = await axios.post(
      `${backendUrl}/doubtforum/dashboarddata`,
      {},
      {
        headers,
      }
    );
    if (response.status === 200) {
      return successResponse("Data fetched succesfully", 200, response.data);
    }
  } catch (error) {
    return errorResponse(error.response.data.msg, error);
  }
};

export const editQuestion = async (data) => {
  const url = `${backendUrl}/doubtforum/editquestion`;
  const headers = getHeadersWithFormData();
  try {
    const response = await axios.patch(url, data, { headers });
    if (response.status === 200 || response.status === 201) {
      return successResponse(
        "Question edited successfully",
        response.status,
        response.data
      );
    }
  } catch (error) {
    return errorResponse(error.response.data.msg, error);
  }
};

export const removeQuestionImage = async (id) => {
  const url = `${backendUrl}/doubtforum/removequestionimage?attachmentID=${id}`;
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
