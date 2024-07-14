import axios, { AxiosResponse } from "axios";
import APIendpoint from "constants/constants";
import { RawBoard, RawComment, RawPost } from "types";

export const getBoardList = (): Promise<RawBoard[]> => {
  return axios
    .get(`${APIendpoint()}/community/boards`)
    .then((res) => {
      const { data } = res;
      return data;
    })
    .catch((e) => {
      throw new Error(e);
    });
};

export const getPostList = (
  boardID: number,
  accessToken?: string,
): Promise<{
  result: RawPost[];
  totalCount: number;
  hasNext: boolean;
}> => {
  const apiUrl = accessToken
    ? `${APIendpoint()}/community/posts?board_id=${boardID}`
    : `${APIendpoint()}/community/posts/web?board_id=${boardID}`;

  const config = accessToken ? { headers: { "authorization-token": `Bearer ${accessToken}` } } : {};

  return axios
    .get(apiUrl, config)
    .then((res) => {
      const {
        data: { result, total_count: totalCount, has_next: hasNext },
      } = res;
      return { result, totalCount, hasNext };
    })
    .catch((e) => {
      throw new Error(e);
    });
};

export const getMyPostList = (
  accessToken: string,
): Promise<{
  result: RawPost[];
  totalCount: number;
  hasNext: boolean;
}> => {
  return axios
    .get(`${APIendpoint()}/community/posts/me`, {
      headers: { "authorization-token": `Bearer ${accessToken}` },
    })
    .then((res) => {
      const {
        data: { result, total_count: totalCount, has_next: hasNext },
      } = res;
      return { result, totalCount, hasNext };
    })
    .catch((e) => {
      throw new Error(e);
    });
};

export const getPost = (postID: number, accessToken?: string): Promise<RawPost> => {
  const apiUrl = accessToken
    ? `${APIendpoint()}/community/posts/${postID}`
    : `${APIendpoint()}/community/posts/${postID}/web`;

  const config = accessToken ? { headers: { "authorization-token": `Bearer ${accessToken}` } } : {};

  return axios
    .get(apiUrl, config)
    .then((res) => {
      const { data } = res;
      return data;
    })
    .catch((e) => {
      throw new Error(e);
    });
};

export const setPost = (body: FormData, accessToken: string): Promise<RawPost> => {
  return axios
    .post(`${APIendpoint()}/community/posts`, body, {
      headers: { "authorization-token": `Bearer ${accessToken}` },
    })
    .then((res) => {
      const { data } = res;
      return data;
    })
    .catch((e) => {
      throw new Error(e);
    });
};

export const updatePost = (
  postID: number,
  body: FormData,
  accessToken: string,
): Promise<RawPost> => {
  return axios
    .patch(`${APIendpoint()}/community/posts/${postID}`, body, {
      headers: { "authorization-token": `Bearer ${accessToken}` },
    })
    .then((res) => {
      const { data } = res;
      return data;
    })
    .catch((e) => {
      throw new Error(e);
    });
};

export const deletePost = (postID: number, accessToken: string): Promise<void> => {
  return axios
    .delete(`${APIendpoint()}/community/posts/${postID}`, {
      headers: { "authorization-token": `Bearer ${accessToken}` },
    })
    .then(() => {})
    .catch((e) => {
      throw new Error(e);
    });
};

export const setPostLike = (
  postID: number,
  accessToken: string,
): Promise<{ isLiked: boolean; likeCount: number }> => {
  return axios
    .post(
      `${APIendpoint()}/community/posts/${postID}/like`,
      {},
      { headers: { "authorization-token": `Bearer ${accessToken}` } },
    )
    .then((res) => {
      const {
        data: { is_liked: isLiked, like_cnt: likeCount },
      } = res;
      return { isLiked, likeCount };
    })
    .catch((e) => {
      throw new Error(e);
    });
};

export const setPostUnlike = (
  postID: number,
  accessToken: string,
): Promise<{ isLiked: boolean; likeCount: number }> => {
  return axios
    .post(
      `${APIendpoint()}/community/posts/${postID}/unlike`,
      {},
      { headers: { "authorization-token": `Bearer ${accessToken}` } },
    )
    .then((res) => {
      const {
        data: { is_liked: isLiked, like_cnt: likeCount },
      } = res;
      return { isLiked, likeCount };
    })
    .catch((e) => {
      throw new Error(e);
    });
};

export const setReportPost = (postID: number, reason: string, accessToken: string) => {
  const apiUrl = `${APIendpoint()}/community/posts/${postID}/report`;
  const data = { reason };
  const config = { headers: { "authorization-token": `Bearer ${accessToken}` } };

  return axios
    .post(apiUrl, data, config)
    .then(() => {})
    .catch((e) => console.error(e));
};

export const getCommentList = (
  postID: number,
  accessToken?: string,
  size: number = 10,
  page: number = 1,
): Promise<{
  result: RawComment[];
  totalCount: number;
  hasNext: boolean;
}> => {
  const apiUrl = accessToken
    ? `${APIendpoint()}/community/comments?post_id=${postID}&page=${page}&per_page=${size}`
    : `${APIendpoint()}/community/comments/web?post_id=${postID}&page=${page}&per_page=${size}`;

  const config = accessToken ? { headers: { "authorization-token": `Bearer ${accessToken}` } } : {};

  return axios
    .get(apiUrl, config)
    .then((res) => {
      const {
        data: { result, total_count: totalCount, has_next: hasNext },
      } = res;
      return { result, totalCount, hasNext };
    })
    .catch((e) => {
      throw new Error(e);
    });
};

export const setComment = (
  postID: number,
  content: string,
  isAnonymous: boolean,
  accessToken: string,
  // updateCallback: (raw: RawComment) => Promise<any>,
): Promise<AxiosResponse<any>> => {
  return (
    axios
      .post(
        `${APIendpoint()}/community/comments`,
        { post_id: postID, content, anonymous: isAnonymous },
        { headers: { "authorization-token": `Bearer ${accessToken}` } },
      )
      // .then((res: AxiosResponse<RawComment>) => updateCallback(res.data))
      .catch((e) => {
        throw new Error(e);
      })
  );
};

export const deleteComment = (commentID: number, accessToken: string): Promise<void> => {
  return axios
    .delete(`${APIendpoint()}/community/comments/${commentID}`, {
      headers: { "authorization-token": `Bearer ${accessToken}` },
    })
    .then(() => {})
    .catch((e) => {
      throw new Error(e);
    });
};

export const setCommentLike = (
  commentID: number,
  accessToken: string,
): Promise<{ isLiked: boolean; likeCount: number }> => {
  return axios
    .post(
      `${APIendpoint()}/community/comments/${commentID}/like`,
      {},
      { headers: { "authorization-token": `Bearer ${accessToken}` } },
    )
    .then((res) => {
      const {
        data: { is_liked: isLiked, like_cnt: likeCount },
      } = res;
      return { isLiked, likeCount };
    })
    .catch((e) => {
      throw new Error(e);
    });
};

export const setCommentUnlike = (
  commentID: number,
  accessToken: string,
): Promise<{ isLiked: boolean; likeCount: number }> => {
  return axios
    .post(
      `${APIendpoint()}/community/comments/${commentID}/unlike`,
      {},
      { headers: { "authorization-token": `Bearer ${accessToken}` } },
    )
    .then((res) => {
      const {
        data: { is_liked: isLiked, like_cnt: likeCount },
      } = res;
      return { isLiked, likeCount };
    })
    .catch((e) => {
      throw new Error(e);
    });
};

export const setReportComment = (commentID: number, reason: string, accessToken: string) => {
  const apiUrl = `${APIendpoint()}/community/comments/${commentID}/report`;
  const data = { reason };
  const config = { headers: { "authorization-token": `Bearer ${accessToken}` } };

  return axios
    .post(apiUrl, data, config)
    .then(() => {})
    .catch((e) => console.error(e));
};
