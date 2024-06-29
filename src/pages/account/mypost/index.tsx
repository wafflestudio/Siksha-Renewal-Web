import { PostList } from "components/Community/PostList";
import AccountLayout from "../layout";
import APIendpoint from "constants/constants";
import axios from "axios";
import { useEffect, useState } from "react";
import { useStateContext } from "hooks/ContextProvider";
import { Post, RawPost } from "types";
import { postParser } from "utils/DataUtil";

export default function MyPost() {
  const state = useStateContext();

  const [posts, setPosts] = useState<Post[]>([]);

  function parse(rawPost: RawPost) {
    setPosts((prev) => [...prev, postParser(rawPost)]);
  }

  async function fetchMyPosts() {
    await axios
      .get(`${APIendpoint()}/community/posts/me`, {
        headers: { "authorization-token": `Bearer ${localStorage.getItem("access_token")}` },
      })
      .then((res) => {
        res.data.result.map(parse);
      })
      .catch((e) => console.log(e));
  }

  console.log(posts);
  useEffect(() => {
    fetchMyPosts();
  }, []);
  return (
    <AccountLayout>
      <PostList posts={posts} />
    </AccountLayout>
  );
}
