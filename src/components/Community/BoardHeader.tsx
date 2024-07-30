import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useDispatchContext, useStateContext } from "hooks/ContextProvider";
import UseAccessToken from "hooks/UseAccessToken";
import useModals from "hooks/UseModals";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Post } from "types";
import { getTrendingPosts } from "utils/api/community";
import { postParser } from "utils/DataUtil";

export function BoardHeader() {
  const router = useRouter();
  const { checkAccessToken } = UseAccessToken();
  
  const [trendingPosts, setTrendingPosts] = useState<Post[]>([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ axis: "y", loop: true }, [
    Autoplay({ delay: 3000 })
  ]);

  async function fetchTrendingPosts() {
    const accessToken = await checkAccessToken();

    if (accessToken) {
      return getTrendingPosts(accessToken)
        .then((res) => {
          const { result } = res;
          console.log(result);
          setTrendingPosts(result.map((rawPost) => postParser(rawPost)));
        })
        .catch((e) => console.error(e));
    }
  }

  const { loginStatus } = useStateContext();
  const { openLoginModal } = useModals();

  function handleClickWriteButton() {
    if (!loginStatus) openLoginModal();
    else router.push("/community/write");
  }

  useEffect(() => {
    fetchTrendingPosts();
  }, []);

  return (
    <Container>
      {
        // TODO: trending post 없으면 띄우지 말기
        <TrendingPostWrapper>
          <PostSwiperViewport ref={emblaRef}>
            <PostSwiperContainer>
            {
            trendingPosts.length > 0 && trendingPosts.map((trendingPost) => (
              <Link
                key={trendingPost.id}
                href={`/community/boards/${trendingPost.boardId}/posts/${trendingPost.id}`}
              >
                <TrendingPost>
                  <Title>{trendingPost.title}</Title>
                  <ContentPreview>
                    {trendingPost.content}
                  </ContentPreview>
                  <Likes>
                    <Icon src="/img/post-like.svg" />
                    {trendingPost.likeCount}
                  </Likes>
                </TrendingPost>
              </Link>
            ))
          }
            </PostSwiperContainer>
          </PostSwiperViewport>
        </TrendingPostWrapper>
      }
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

const TrendingPostWrapper = styled.div`
  background-color: #ff952233;
  padding: 15px 17px;
  border-radius: 8px;
  box-sizing: border-box;
  width: min(100% - 56px, 573px);
  @media (max-width: 768px) {
    width: 100%;
    padding: 10px 15px;
    border-radius: 12px;
  }
`;

const PostSwiperViewport = styled.div`
  overflow: hidden;
  & > a {
    position: relative;
  }
`;

const PostSwiperContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 18px;
  @media (max-width: 768px) {
    height: 14px;
  }
`;

const TrendingPost = styled.div`
  display: flex;
  gap: 15px 10px;
  font-size: 16px;
  height: 18px;
  cursor: pointer;
  @media (max-width: 768px) {
    font-size: 12px;
    height: 14px;
  }
`;

const Title = styled.div`
  max-width: 220px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const ContentPreview = styled.div`
  flex: 1;
  width: 100%;
  color: #393939;
  overflow: hidden;
  text-overflow: ellipsis;
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
