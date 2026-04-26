"use client";

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
import useError from "hooks/useError";

export default function MyPost() {
  const [posts, setPosts] = useState<Post[]>([]);

  const { authStatus, getAccessToken, authGuard } = useAuth();
  const { onHttpError } = useError();

  const router = useRouter();

  useEffect(authGuard, [authStatus]);

  const fetchMyPosts = (size: number, page: number) =>
    getAccessToken()
      .then((accessToken) => getMyPostList(accessToken, size, page))
      .then(({ result, hasNext }) => {
        result.map((rawPost) => setPosts((prev) => [...prev, postParser(rawPost)]));
        return hasNext;
      })
      .catch(onHttpError);

  useEffect(() => {
    setPosts([]);
  }, []);

  if (authStatus === "login")
    return (
      <>
        <MobileSubHeader title="내가 쓴 글" handleBack={router.back} />
        <Container $isEmpty={posts.length === 0}>
          <Header>내가 쓴 글</Header>
          {posts.length === 0 ? (
            <NoPost>내가 쓴 글이 없어요.</NoPost>
          ) : (
            <PostList posts={posts} fetch={fetchMyPosts} />
          )}
          {posts.length >= 1 ? <BreakLine /> : null}
        </Container>
      </>
    );
}

const Container = styled.div<{ $isEmpty: boolean }>`
  padding: 0 18.5px;
  width: 701px;
  border-radius: 8px;
  box-sizing: border-box;
  background-color: var(--SemanticColor-Background-Secondary);

  @media (max-width: 768px) {
    padding-top: 16px;
    width: 100%;
    margin-top: -4px;
    border: none;
    height: ${(props) => (props.$isEmpty ? "100%" : "auto")};
  }
`;

const Header = styled.div`
  margin: 24.08px 0 29.42px 4.5px;
  color: var(--Color-Foundation-gray-900);
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
  font-size: 14px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.3px;
  color: var(--Color-Foundation-gray-600);
`;

const BreakLine = styled.hr`
  margin-bottom: 29.4px;
  border: 0;
  height: 1px;
  background: var(--Color-Foundation-gray-100);
`;
