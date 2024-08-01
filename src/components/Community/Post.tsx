import styled, { css } from "styled-components";
import { Post as PostType } from "types";
import Link from "next/link";

interface PropsPost {
  post: PostType;
}

export function Post({ post }: PropsPost) {
  const { boardId, id, title, content, likeCount, commentCount, images } = post;

  return (
    <Link href={`/community/boards/${boardId}/posts/${id}`}>
      <Container>
        <Info isImages={images && images.length > 0}>
          <Title>{title}</Title>
          <ContentPreview>{content}</ContentPreview>
          <LikesAndComments>
            <Likes>
              <Icon src="/img/post-like.svg" />
              {likeCount}
            </Likes>
            <Comments>
              <Icon src="/img/post-comment.svg" />
              {commentCount}
            </Comments>
          </LikesAndComments>
        </Info>
        <PhotoZone>
          {images
            ? images.map((src, idx) => (idx < 1 ? <Photo key={src} src={src} /> : null))
            : null}
        </PhotoZone>
      </Container>
    </Link>
  );
}

const Container = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  justify-content: space-between;
  padding: 19px 7px 16px 17px;
  box-sizing: border-box;
  cursor: pointer;

  @media (max-width: 768px) {
    padding: 15px 12.5px 14px 12.5px;
  }

  &::after {
    content: " ";
    position: absolute;
    width: 100%;
    height: 1px;
    top: 0;
    left: 50%;
    background-color: #eeeeee;
    transform: translateX(-50%);

    @media (max-width: 768px) {
      width: calc(100% + 25px);
      background-color: #f0f0f0;
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
    gap: 12px;
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
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;
const ContentPreview = styled.div`
  color: #393939;
  overflow: hidden;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;
const LikesAndComments = styled.div`
  display: flex;
  gap: 12px;
  font-size: 12px;
  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

const Likes = styled.div`
  display: flex;
  align-items: center;
  color: #ff9522;
`;
const Comments = styled.div`
  display: flex;
  align-items: center;
  color: #797979;
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
