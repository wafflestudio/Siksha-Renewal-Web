import axios from "axios";
import APIendpoint from "constants/constants";
import { User, RawUser } from "types";

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

export const loginApple = async (id_token: string): Promise<string> => {
  return axios
    .post(
      `${APIendpoint()}/auth/login/apple`,
      {},
      {
        headers: { "apple-token": `Bearer ${id_token}` },
      },
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

export const getMyData = async (accessToken: string): Promise<User> => {
  return axios
    .get(`${APIendpoint()}/auth/me/image`, {
      headers: { "authorization-token": `Bearer ${accessToken}` },
    })
    .then((res: { data: RawUser }) => {
      const {
        data: { id, nickname, profile_url },
      } = res;
      return { id, nickname, image: profile_url };
    })
    .catch((e) => {
      throw new Error(e);
    });
};

export const updateProfile = async (formData: FormData, accessToken: string): Promise<User> => {
  if (!formData.get("nickname")) {
    throw new Error("nickname is required");
  }
  return axios
    .patch(`${APIendpoint()}/auth/me/profile`, formData, {
      headers: {
        "authorization-token": `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res: { data: RawUser }) => {
      const {
        data: { id, nickname, profile_url },
      } = res;
      return { id, nickname, image: profile_url };
    })
    .catch((e) => {
      throw new Error(e);
    });
};

export const updateProfileWithImage = async (
  formData: FormData,
  accessToken: string,
): Promise<User> => {
  if (!formData.get("change_to_default_image") && !formData.get("image")) {
    throw new Error("image is required");
  }

  return axios
    .patch(`${APIendpoint()}/auth/me/image/profile`, formData, {
      headers: {
        "authorization-token": `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res: { data: RawUser }) => {
      const {
        data: { id, nickname, profile_url },
      } = res;
      return { id, nickname, image: profile_url };
    })
    .catch((e) => {
      throw new Error(e);
    });
};

export const deleteAccount = async (accessToken: string): Promise<void> => {
  return axios
    .delete(`${APIendpoint()}/auth/`, {
      headers: { "authorization-token": `Bearer ${accessToken}` },
    })
    .then(() => {})
    .catch((e) => {
      throw new Error(e);
    });
};

export const validateNickname = async (nickname: string): Promise<boolean> => {
  return axios
    .get(`${APIendpoint()}/auth/nicknames/validate`, {
      params: { nickname },
    })
    .then(({ status }) => (status === 200 ? true : false))
    .catch((e) => {
      console.error(e);
      return false;
    });
};
