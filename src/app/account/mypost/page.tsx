import { PostList } from "app/community/boards/[boardId]/components/PostList";
import AccountLayout from "../layout";
import { useEffect, useState } from "react";
import { Post } from "types";
import { postParser } from "utils/DataUtil";
import styled from "styled-components";
import { getMyPostList } from "utils/api/community";
import MobileSubHeader from "components/general/MobileSubHeader";
import { useRouter } from "next/navigation";
import useAuth from "hooks/UseAuth";

export default function MyPost() {
  const [posts, setPosts] = useState<Post[]>([]);

  const { authStatus, getAccessToken, authGuard } = useAuth();
  const router = useRouter();

  useEffect(authGuard, [authStatus]);

  const fetchMyPosts = (size: number, page: number) =>
    getAccessToken()
      .then((accessToken) => getMyPostList(accessToken, size, page))
      .then(({ result, hasNext }) => {
        result.map((rawPost) => setPosts((prev) => [...prev, postParser(rawPost)]));
        return hasNext;
      })
      .catch((e) => console.error(e));

  useEffect(() => {
    setPosts([]);
  }, []);

  if (authStatus === "login")
    return (
      <>
        <MobileSubHeader title="내가 쓴 글" handleBack={router.back} />
        <AccountLayout>
          <Container>
            <Header>내가 쓴 글</Header>
            <PostList posts={posts} fetch={fetchMyPosts} />
            {posts.length >= 1 ? <BreakLine /> : null}
          </Container>
        </AccountLayout>
      </>
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
    padding-top: 24px;
    border: 0;
  }
`;

const Header = styled.div`
  margin: 24.08px 0 29.42px 4.5px;
  color: var(--Main-Orange, #ff9522);
  font-size: 20px;
  font-weight: 700;
  line-height: 23px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NoPost = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 160.84px;
  text-align: center;
  font-size: 20px;
  font-weight: 400;
  line-height: 23px;
  color: #a6a6a6;
`;

const BreakLine = styled.hr`
  margin-bottom: 29.4px;
  border: 0;
  height: 1px;
  background: #eeeeee;
`;
