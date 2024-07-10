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
      <Container>
        <Header>내가 쓴 글</Header>
        <PostList posts={posts} />
        <BreakLine />
      </Container>
    </AccountLayout>
  );
}

const Container = styled.div`
  padding: 0 18.5px;
  width: 701px;
  background: #ffffff;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 100%;
    border: 0;
  }
`;

const Header = styled.div`
  margin: 24.08px 0 29.42px 4.5px;
  color: var(--Main-Orange, #ff9522);
  font-size: 20px;
  font-weight: 700;
  line-height: 23px;
  letter-spacing: -0.3px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const BreakLine = styled.hr`
  margin-bottom: 29.4px;
  border: 0;
  height: 1px;
  background: #eeeeee;
`;
