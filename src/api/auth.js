import {
  SignInResponse,
  getCsrfToken,
  getSession,
  signIn,
  signOut,
} from "next-auth/react";
import { axiosAuth, axiosDefault } from "./axios-instance";

const BASE_PATH = process.env.BASE_PATH || "/";

export const googleSignIn = async () => {
  await signIn("google", { callbackUrl: `${BASE_PATH}` });
};

export const signOutApi = async () => {
  await signOut({ callbackUrl: `${BASE_PATH}` });
  await axiosAuth.post("/auth/logout");
};

export const refreshAccessToken = async (refreshToken) => {
  const tokens = await axiosDefault.post("auth/token", {
    refresh_token: refreshToken,
  });

  const csrfToken = await getCsrfToken();
  await getSession({
    req: {
      body: {
        csrfToken,
        data: {
          accessToken: tokens.data.access_token,
          refreshToken: tokens.data.refresh_token,
        },
      },
    },
  });
};
