import { useDispatchContext, useStateContext } from "hooks/ContextProvider";
import UseAccessToken from "hooks/UseAccessToken";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Post } from "types";
import { getPopularPosts } from "utils/api/community";
import { postParser } from "utils/DataUtil";

export function BoardHeader() {
  const { loginStatus } = useStateContext();
  const { setLoginModal } = useDispatchContext();
  const router = useRouter();
  const { checkAccessToken } = UseAccessToken();

  const [popularPost, setPopularPost] = useState<Post | null>(null);

  async function fetchPopularPost() {
    const accessToken = await checkAccessToken();

    if (accessToken) {
      return getPopularPosts(accessToken)
        .then((res) => {
          const { result } = res;
          setPopularPost(postParser(result[0]));
        })
        .catch((e) => console.error(e));
    }
  }

  function handleClickWriteButton() {
    if (loginStatus === false) {
      setLoginModal(true);
      return;
    }
    router.push("/community/write");
  }

  useEffect(() => {
    fetchPopularPost();
  }, []);

  return (
    <Container>
      <Link
        href={
          popularPost ? `/community/boards/${popularPost?.boardId}/posts/${popularPost?.id}` : "/"
        }
      >
        <HotPost>
          <Title>{popularPost?.title}asdfasdfadasdfasdffasdfasdfasdfadsfdsfasdfasdfasdf</Title>
          <ContentPreview>
            {popularPost?.content}asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf
            aasdfasdfasdfasdf asdfasfdasasdfasdfasdf
          </ContentPreview>
          <Likes>
            <Icon src="/img/post-like.svg" />
            {popularPost?.likeCount}
          </Likes>
        </HotPost>
      </Link>
      <WriteButton>
        <ButtonImg onClick={handleClickWriteButton} src={"/img/write-post-button.svg"} />
      </WriteButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  @media (max-width: 768px) {
    margin: 10px 0;
  }
`;

const HotPost = styled.div`
  display: flex;
  gap: 15px 10px;
  width: min(100% - 56px, 573px);
  height: 100%;
  background-color: #ff952233;
  padding: 15px 17px;
  border-radius: 8px;
  box-sizing: border-box;
  font-size: 16px;
  cursor: pointer;
  @media (max-width: 768px) {
    width: 100%;
    padding: 10px 15px;
    border-radius: 12px;
    font-size: 12px;
  }
`;

const Title = styled.div`
  max-width: 220px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
`;
const ContentPreview = styled.div`
  flex: 1;
  width: 100%;
  color: #393939;
  overflow: hidden;
  margin-right: 14px;
  white-space: nowrap;
`;
const Likes = styled.div`
  display: flex;
  align-items: center;
  color: #ff9522;
  font-size: 12px;
  @media (max-width: 768px) {
    font-size: 10px;
  }
`;
const Icon = styled.img`
  margin-right: 4px;
  @media (max-width: 768px) {
    width: 11.5px;
    height: 11px;
  }
`;
const WriteButton = styled.button`
  margin: 0;
  padding: 0;
  margin-right: 20px;
  background: transparent;
  border: none;
  outline: none;
  z-index: 1;
  cursor: pointer;
  @media (max-width: 768px) {
    position: fixed;
    bottom: 100px;
    right: 29px;
  }
`;
const ButtonImg = styled.img``;
