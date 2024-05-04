import axios from "axios";
import { instance } from "../../utils/axiosInstance";
import { errorResponse, successResponse } from "../../utils/errors";
import { getHeaders } from "../../utils/requestHeaders";
import { backendUrl } from "../../../config";

export const loginUser = async (email, password) => {
  const headers = getHeaders();
  try {
    const response = await axios.post(
      `${backendUrl}/doubtforum/login`,
      {
        email,
        password,
      },
      {
        headers
      }
    );
    if (response.status === 200) {
      return successResponse(response?.data?.message, 200, response.data);
    }
  } catch (error) {
    return errorResponse(error?.response?.status, error);
  }
};

export const getUser = async () => {
  const headers = getHeaders();
  try {
    const response = await instance.get("/doubtforum/getuser", { headers });
    if (response.status === 200) {
      return successResponse("User fetched", 200, response.data);
    }
  } catch (error) {
    return errorResponse(500, error);
  }
};

export const signupUser = async (data) => {
  const headers = getHeaders();
  try {
    const response = await instance.post("/doubtforum/register", data, {
      headers,
    });
    if (response.status === 200) {
      return successResponse("Signup Successfull", 200, response.data);
    }
  } catch (error) {
    return errorResponse(error?.response?.status, error);
  }
};

export const verifyToken = async (token) => {
  try {
    const response = await instance.post(
      "/doubtforum/verifyemailuser",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
        },
      }
    );
    if (response.status === 200) {
      return successResponse("Signup Successfull", 200, response.data);
    }
  } catch (error) {
    return errorResponse(500, error);
  }
};

export const verifyForgetToken = async (token) => {
  try {
    const response = await instance.post(
      "/doubtforum/verifyforgotpassword",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
        },
      }
    );
    if (response.status === 200) {
      return successResponse("Signup Successfull", 200, response.data);
    }
  } catch (error) {
    return errorResponse(500, error);
  }
};


export const resendMailToUser = async (token) => {
  try {
    const response = await instance.post(
      "/doubtforum/resendverificationmail",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
        },
      }
    );
    if (response.status === 200) {
      return successResponse("Mail sent", 200, response.data);
    }
  } catch (error) {
    return errorResponse(500, error);
  }
}

export const resetPassword = async (token, data) => {
  try {
    const response = await instance.post(
      "/doubtforum/addpassword",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
        },
      }
    );
    if (response.status === 201) {
      return successResponse("Mail sent", response.status, response.data);
    }
  } catch (error) {
    return errorResponse(500, error);
  }
}

export const forgetPassword = async (data) => {
  try {
    const response = await instance.post(
      "/doubtforum/forgotpassword",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      return successResponse("Mail sent", 200, response.data);
    }
  } catch (error) {
    return errorResponse(500, error);
  }
}

export const resendForgetPasswordMail = async (data) => {
  try {
    const response = await instance.post(
      "/doubtforum/forgotpassword",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      return successResponse("Mail sent", 200, response.data);
    }
  } catch (error) {
    return errorResponse(500, error);
  }
}






