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
  const [hasNextPosts, setHasNextPosts] = useState(false);
  const { getAccessToken } = UseAccessToken();

  function fetchMyPosts(size: number, page: number) {
    return getAccessToken()
      .then((accessToken) => getMyPostList(accessToken, size, page))
      .then((res) => {
        setHasNextPosts(res.hasNext);
        res.result.map((rawPost) => setPosts((prev) => [...prev, postParser(rawPost)]));
      })
      .catch((e) => console.error(e));
  }

  useEffect(() => {
    fetchMyPosts(10, 1);
  }, []);

  return (
    <AccountLayout>
      <Header>내가 쓴 글</Header>
      <PostList posts={posts} fetch={fetchMyPosts} hasNext={hasNextPosts} />
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
