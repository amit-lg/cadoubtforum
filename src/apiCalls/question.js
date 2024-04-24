import axios from "axios";
import { backendUrl } from "../../config";
import { errorResponse, successResponse } from "../utils/errors";
import { getHeaders, getHeadersWithFormData } from "../utils/requestHeaders";

export const getQuestions = async (data) => {
  const headers = getHeaders();
  const source = axios.CancelToken.source();
  try {
    const response = await axios.post(
      `${backendUrl}/doubtforum/getquestions`,
      data,
      {
        headers,
        cancelToken: source.token,
      }
    );
    if (response.status === 200) {
      return successResponse("Data fetched successfully", 200, response.data);
    }
  } catch (error) {
    return errorResponse(error.response.data.msg, error);
  }

  return () => {
    // Cancel the request on component unmount or when a new request is made
    source.cancel("Request canceled by user or replaced by new request");
  };
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
  const headers = getHeaders();
  try {
    const response = await axios.post(
      `${backendUrl}/doubtforum/pinnedquestion`,
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

export const getAskedQuestions = async (data) => {
  const headers = getHeaders();
  try {
    const response = await axios.post(
      `${backendUrl}/doubtforum/askedquestion`,
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

export const getUnansweredQuestions = async (data) => {
  const headers = getHeaders();
  try {
    const response = await axios.post(
      `${backendUrl}/doubtforum/unansweredquestion`,
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
