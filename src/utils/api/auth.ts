import axios from "axios";
import APIendpoint from "constants/constants";

export const loginKakao = async (code: string): Promise<string> => {
  const grantType = "authorization_code";
  const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_RESTAPI;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECTURI;

  return axios
    .post(
      `https://kauth.kakao.com/oauth/token?grant_type=${grantType}&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
      {},
      { headers: { "Content-type": "application/x-www-form-urlencoded;charset=utf-8" } },
    )
    .then((res) => {
      const { access_token } = res.data;
      return access_token;
    })
    .then((access_token: string) =>
      axios.post(
        `${APIendpoint()}/auth/login/kakao`,
        {},
        {
          headers: { "kakao-token": `Bearer ${access_token}` },
        },
      ),
    )
    .then((res) => {
      const {
        data: { access_token: accessToken },
      } = res;
      return accessToken;
    })
    .catch((e) => {
      throw new Error(e);
    });
};

export const loginGoogle = async (code: string): Promise<string> => {
  const response_type = "id_token";
  const grantType = "authorization_code";
  const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENTID;
  const REST_SECRET_KEY = process.env.NEXT_PUBLIC_GOOGLE_SECRET;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECTURI;

  return axios
    .post(
      `https://oauth2.googleapis.com/token?response_type=${response_type}&grant_type=${grantType}&client_id=${CLIENT_ID}&client_secret=${REST_SECRET_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
      {},
      { headers: { "Content-type": "application/x-www-form-urlencoded;charset=utf-8" } },
    )
    .then((res) => {
      const {
        data: { id_token },
      } = res;
      return id_token;
    })
    .then((id_token: string) =>
      axios.post(
        `${APIendpoint()}/auth/login/google`,
        {},
        {
          headers: { "google-token": `Bearer ${id_token}` },
        },
      ),
    )
    .then((res) => {
      const {
        data: { access_token: accessToken },
      } = res;
      return accessToken;
    })
    .catch((e) => {
      throw new Error(e);
    });
};

export const loginApple = async (code: string): Promise<string> => {
  const grantType = "authorization_code";
  const CLIENT_ID = process.env.NEXT_PUBLIC_APPLE_CLIENTID;
  const REST_SECRET_KEY = process.env.NEXT_PUBLIC_APPLE_SECRET;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_APPLE_REDIRECTURI;

  return axios
    .post(
      `https://appleid.apple.com/auth/token?grant_type=${grantType}&client_id=${CLIENT_ID}&client_secret=${REST_SECRET_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
      {},
      { headers: { "Content-type": "application/x-www-form-urlencoded;charset=utf-8" } },
    )
    .then((res) => {
      const {
        data: { id_token },
      } = res;
      return id_token;
    })
    .then((id_token: string) =>
      axios.post(
        `${APIendpoint()}/auth/login/apple`,
        {},
        {
          headers: { "apple-token": `Bearer ${id_token}` },
        },
      ),
    )
    .then((res) => {
      const {
        data: { access_token: accessToken },
      } = res;
      return accessToken;
    })
    .catch((e) => {
      throw new Error(e);
    });
};

export const loginRefresh = async (accessToken: string): Promise<string> => {
  return axios
    .post(
      `${APIendpoint()}/auth/refresh`,
      {},
      { headers: { "authorization-token": `Bearer ${accessToken}` } },
    )
    .then((res) => {
      const {
        data: { access_token: newAccessToken },
      } = res;
      return newAccessToken;
    })
    .catch((e) => {
      throw new Error(e);
    });
};

export const getMyData = async (accessToken: string): Promise<{ id: number; nickname: string }> => {
  return axios
    .get(`${APIendpoint()}/auth/me`, {
      headers: { "authorization-token": `Bearer ${accessToken}` },
    })
    .then((res) => {
      const {
        data: { id, nickname },
      } = res;
      return { id, nickname };
    })
    .catch((e) => {
      throw new Error(e);
    });
};

export const updateMyData = async (formData: FormData, accessToken: string): Promise<void> => {
  return axios
    .patch(`${APIendpoint()}/auth/me/profile`, formData, {
      headers: { "authorization-token": `Bearer ${accessToken}` },
    })
    .then(() => {})
    .catch((e) => {
      throw new Error(e);
    });
};

export const deleteAccount = async (accessToken: string): Promise<void> => {
  return axios
    .delete(`${APIendpoint()}/auth/me`, {
      headers: { "authorization-token": `Bearer ${accessToken}` },
    })
    .then(() => {})
    .catch((e) => {
      throw new Error(e);
    });
};
