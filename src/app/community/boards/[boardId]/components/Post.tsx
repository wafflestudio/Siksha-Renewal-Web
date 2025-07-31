import styled, { css } from "styled-components";
import { Post as PostType } from "types";
import Link from "next/link";
import { LoadingAnimation } from "styles/globalstyle";

interface PropsPost {
  post: PostType;
}

export function Post({ post }: PropsPost) {
  const { boardId, id, title, content, isLiked, likeCount, commentCount, images } = post;
  const isLikedImg = isLiked ? "/img/post-like-fill.svg" : "/img/post-like.svg";

  return (
    <Link href={`/community/boards/${boardId}/posts/${id}`}>
      <Container>
        <Info isImages={images && images.length > 0}>
          <Title>{title}</Title>
          <ContentPreview>{content}</ContentPreview>
          <LikesAndComments>
            <Likes>
              <Icon src={isLikedImg} alt="좋아요" />
              {likeCount}
            </Likes>
            <Comments>
              <Icon src="/img/post-comment.svg" alt="댓글" />
              {commentCount}
            </Comments>
          </LikesAndComments>
        </Info>
        <PhotoZone>
          {images
            ? images.map((src, idx) =>
              idx < 1 ? <Photo key={src} src={src} alt="게시글 사진 모음" /> : null,
            )
            : null}
        </PhotoZone>
      </Container>
    </Link>
  );
}

const Container = styled.div`
  ${LoadingAnimation}
  display: flex;
  position: relative;
  width: 100%;
  justify-content: space-between;
  padding: 19px 7px 16px 17px;
  box-sizing: border-box;
  cursor: pointer;

  @media (max-width: 768px) {
    padding: 15px 12.5px 14px 0;
  }

  &::after {
    content: " ";
    position: absolute;
    width: 100%;
    height: 1px;
    top: 0;
    left: 50%;
    background-color: var(--SemanticColor-Border-Primary);
    transform: translateX(-50%);

    @media (max-width: 768px) {
      width: calc(100% + 25px);
      background-color: var(--SemanticColor-Border-Primary);
    }
  }
`;
const Info = styled.div<{ isImages: boolean | null }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
  max-width: 540px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    gap: 9px;
    height: min-content;

  ${(props) =>
    props.isImages !== null &&
    css`
      max-width: calc(100% - 71.5px);
    `}
  }
`;

const Title = styled.div`
  overflow: hidden;
  font-size: 18px;
  font-weight: bold;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: var(--Color-Foundation-base-black);
  @media (max-width: 768px) {
    font-size: 14px;
    font-weight: 800;
  }
`;
const ContentPreview = styled.div`
  color: var(--Color-Foundation-gray-700);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;
const LikesAndComments = styled.div`
  display: flex;
  margin-top: 3px;
  gap: 12px;
  font-size: 12px;
  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

const Likes = styled.div`
  display: flex;
  align-items: center;
  color: var(--Color-Foundation-orange-500);
`;
const Comments = styled.div`
  display: flex;
  align-items: center;
  color: var(--Color-Foundation-gray-600);
`;
const Icon = styled.img`
  margin-right: 4px;
  @media (max-width: 768px) {
    width: 11.5px;
    height: 11px;
  }
`;
const PhotoZone = styled.div`
  display: flex;
  position: relative;

  @media (max-width: 768px) {
    right: -12.5px;
  }
`;

const Photo = styled.img`
  position: relative;
  width: 84px;
  height: 84px;
  border-radius: 8px;
  background-color: #d9d9d9;

  @media (max-width: 768px) {
    width: 61px;
    height: 61px;
  }
`;
