import { PostList } from "components/Community/PostList";
import AccountLayout from "../layout";
import { useEffect, useState } from "react";
import { Post, RawPost } from "types";
import { postParser } from "utils/DataUtil";
import styled from "styled-components";
import { getMyPostList } from "utils/api/community";
import UseAccessToken from "hooks/UseAccessToken";

export default function MyPost() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { getAccessToken } = UseAccessToken();

  function setParsedPosts(rawPost: RawPost) {
    setPosts((prev) => [...prev, postParser(rawPost)]);
  }

  useEffect(() => {
    getAccessToken()
      .then((accessToken) => getMyPostList(accessToken))
      .then((res) => {
        res.result.map(setParsedPosts);
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <AccountLayout>
      <Header>내가 쓴 글</Header>
      <PostList posts={posts} />
    </AccountLayout>
  );
}

const Header = styled.div`
  margin-top: 23px;
  margin-bottom: 30px;
  color: var(--Main-Orange, #ff9522);
  font-size: 28px;
  font-weight: 700;
  line-height: 23px;
  letter-spacing: -0.3;
`;
