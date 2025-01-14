import axios from "axios";
import { getSession, signOut } from "next-auth/react";
import { refreshAccessToken } from "./auth";
import { delay } from "lodash";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || "";
const ERROR_CODE_FOR_REFRESH_TOKEN = 2004;
const DEFAULT_ERROR_MESSAGE = "An error occurred";

export const axiosDefault = axios.create({
  baseURL: BACKEND_API_URL,
});

export const axiosAuth = axios.create({
  baseURL: BACKEND_API_URL,
});

const handleErrorResponse = async (error, isAuth = false) => {
  if (error.response && error.response.data) {
    const { errorCode, statusCode, errors, message } = error.response.data;
    let defaultMessage = message || DEFAULT_ERROR_MESSAGE;

    const originalRequest = error.config;

    if (errorCode in errorList) {
      defaultMessage = errorList[errorCode].description;

      if (
        errorCode === ERROR_CODE_FOR_REFRESH_TOKEN &&
        originalRequest &&
        originalRequest.headers &&
        !originalRequest._retry &&
        isAuth
      ) {
        originalRequest._retry = true;

        try {
          const session = await getSession();
          await refreshAccessToken(session?.refreshToken);
          const updatedSession = await getSession();
          originalRequest.headers["Authorization"] =
            "Bearer " + updatedSession?.accessToken;

          return axiosAuth.request(originalRequest);
        } catch (err) {
          delay(() => signOut(), 3000);
        }
      }
    }

    throw { message: defaultMessage, errorCode, statusCode, errors };
  } else {
    const unknownError = {
      message:
        error.code && errorList[error.code]
          ? errorList[error.code].description
          : error.message,
      errorCode: error.code,
      statusCode: "UNKNOWN",
      errors: undefined,
    };

    throw unknownError;
  }
};

axiosAuth.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    const accessToken = session?.accessToken;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosDefault.interceptors.response.use(
  (response) => response.data,
  handleErrorResponse
);
axiosAuth.interceptors.response.use(
  (response) => response.data,
  (error) => handleErrorResponse(error, true)
);
