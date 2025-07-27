"use client";

import { useRouter } from "next/navigation";
import styled from "styled-components";
import MobileActionsModal, {
  ModalAction,
} from "app/community/boards/[boardId]/posts/[postId]/components/MobileActionsModal";
import useModals from "hooks/UseModals";
import AlertModal from "components/general/AlertModal";
import { LoadingAnimation } from "styles/globalstyle";
import usePostActions from "./hooks/usePostActions";
import MobileSubHeader from "components/general/MobileSubHeader";
import { formatPostCommentDate } from "utils/FormatUtil";
import PostImageSwiper from "./components/PostImageSwiper";
import CommentList from "./components/CommentList";
import CommentWriter from "./components/CommentWriter";
import { useEffect } from "react";
import useCommentActions from "./hooks/useCommentActions";

export default function Post({ boardId, postId }: { boardId: number; postId: number }) {
  const router = useRouter();
  const { openModal } = useModals();

  const { post, isError, fetchLike, removePost, reportPost, updatePost } = usePostActions(
    boardId,
    postId,
  );
  const { comments, addComment, fetchComments, deleteComment, toggleLike } = useCommentActions(
    boardId,
    postId,
  );

  useEffect(() => {
    if (post?.available === false)
      openModal(AlertModal, {
        title: "신고 누적 게시글",
        message: "신고가 누적되어 숨겨진 게시글입니다.",
        onClose: () => router.push(`/community/boards/${boardId}/`),
      });
  }, [post, openModal, router, boardId]);

  if (!post || post.available === false)
    return (
      <>
        <MobileSubHeader selectedBoardId={boardId} handleBack={router.back} />
        <ErrorContainer>{isError ? "포스트를 찾을 수 없어요" : ""}</ErrorContainer>
      </>
    );

  const actions: ModalAction[] = post.isMine
    ? [
        { name: "수정", handleClick: () => updatePost(post.id) },
        { name: "삭제", handleClick: () => removePost(post.id) },
      ]
    : [{ name: "신고", handleClick: () => reportPost(post.id) }];

  const onClickMoreActions = (actions: ModalAction[]) => {
    openModal(MobileActionsModal, { actions: actions, onClose: () => {} });
  };

  // 신고로 인해 제한되지 않은 경우만 게시물을 보여줍니다.
  return (
    <>
      <MobileSubHeader selectedBoardId={Number(boardId) ?? 1} handleBack={router.back} />
      <Container>
        <Header>
          <WriterInfoContainer>
            <ProfileImage src={post.profileUrl ?? "/img/default-profile.svg"} alt="프로필 이미지" />
            <div>
              <Nickname>{post.anonymous ? "익명" : post.nickname}</Nickname>
              <PostDate>
                {formatPostCommentDate(post.updatedAt ? post.updatedAt : post.createdAt)}
              </PostDate>
            </div>
          </WriterInfoContainer>
          <DesktopPostActions>
            {actions.map((action) => (
              <DesktopActionButton key={action.name} onClick={action.handleClick}>
                {action.name}
              </DesktopActionButton>
            ))}
          </DesktopPostActions>
          <MobileMoreActionsButton
            src="/img/etc.svg"
            onClick={() => onClickMoreActions(actions)}
            alt="더보기"
          />
        </Header>
        <Content>
          <Title>{post.title}</Title>
          <Text>{post.content}</Text>
          {post.images && <PostImageSwiper images={post.images} />}
        </Content>
        <LikesAndComments>
          <Likes>
            <Icon
              src={post.isLiked ? "/img/post-like-fill.svg" : "/img/post-like.svg"}
              alt="좋아요"
            />
            {post.likeCount}
          </Likes>
          <Comments>
            <Icon src="/img/post-comment.svg" alt="댓글" />
            {post.commentCount}
          </Comments>
        </LikesAndComments>
        <Footer>
          <LikeButton onClick={fetchLike} isLiked={post.isLiked}>
            <LikeButtonIcon
              src={post.isLiked ? "/img/post-like-white.svg" : "/img/post-like.svg"}
              isLiked={post.isLiked}
              alt="공감"
            />
            공감
          </LikeButton>
          <BackToBoardButton
            onClick={() => {
              router.push(`/community/boards/${boardId}`);
            }}
          >
            <FooterIcon src="/img/posts-orange.svg" alt="목록보기" />
            목록보기
          </BackToBoardButton>
        </Footer>
        <CommentContainer>
          <CommentList
            comments={comments}
            fetchComments={fetchComments}
            deleteComment={deleteComment}
            toggleLike={toggleLike}
          />
          <CommentWriter addComment={addComment} postId={postId} />
        </CommentContainer>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  padding-top: 18.83px;
  @media (max-width: 768px) {
    padding-top: 16px;
    padding-bottom: 54.21px; // CommentWriter 높이
  }
`;

const ErrorContainer = styled.div`
  ${LoadingAnimation}
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

  @media (max-width: 768px) {
    height: calc(100dvh - 60px);
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`;
const WriterInfoContainer = styled.div`
  display: flex;
  & > div {
    margin-left: 12px;
  }
`;
const ProfileImage = styled.img`
  width: 43px;
  height: 43px;
  border-radius: 50%;
  object-fit: cover;
  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
  }
`;
const Nickname = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  margin-bottom: 5px;
  @media (max-width: 768px) {
    font-weight: 700;
    font-size: 11px;
    line-height: 12.5px;
  }
`;
const PostDate = styled.div`
  color: var(--Color-Foundation-gray-600);
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  @media (max-width: 768px) {
    font-size: 10px;
    line-height: 11.3px;
  }
`;
const DesktopPostActions = styled.div`
  display: flex;
  margin: 0;
  padding: 0;

  & div {
    margin: 0 8px;
  }
  & div:first-child {
    margin-left: 0;
  }
  & div:last-child {
    margin-right: 0;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;
const DesktopActionButton = styled.div`
  background-color: transparent;
  border: none;
  padding: 0;

  color: var(--Color-Foundation-gray-500);
  font-weight: 400;
  font-size: 12px;
  cursor: pointer;
`;
const MobileMoreActionsButton = styled.img`
  display: none;
  cursor: pointer;
  @media (max-width: 768px) {
    display: inherit;
  }
`;

const Content = styled.div`
  margin-bottom: 15.5px;
  word-wrap: break-word;
`;
const Title = styled.div`
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 30px;
  width: 100%;
  white-space: pre-wrap;
  word-wrap: break-word;

  @media (max-width: 768px) {
    font-weight: 800;
    font-size: 16px;
    margin-bottom: 12px;
  }
`;
const Text = styled.div`
  font-weight: 400;
  font-size: 16px;
  margin-bottom: 20px;
  word-wrap: break-word;
  white-space: pre-wrap;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const LikesAndComments = styled.div`
  display: flex;
  gap: 12px;
  font-size: 12px;
  margin-bottom: 14px;
`;
const Likes = styled.div`
  display: flex;
  align-items: center;
  color: var(--Color-Foundation-orange-500);
`;
const Comments = styled.div`
  display: flex;
  align-items: center;
  color: #797979;
`;
const Icon = styled.img`
  margin-right: 4px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 17.7px;
  border-bottom: 1px solid var(--SemanticColor-Border-Primary);
  @media (max-width: 768px) {
    border-color: var(--SemanticColor-Border-Primary);
    padding-bottom: 12.5px;
  }
`;
const FooterButton = styled.button`
  display: flex;
  align-items: center;
  border: 1px solid var(--Color-Foundation-orange-500);
  border-radius: 8px;
  background-color: var(--Color-Foundation-base-white);
  color: var(--Color-Foundation-orange-500);
  font-weight: 700;
  font-size: 13px;
  line-height: 14.75px;
  cursor: pointer;
  @media (max-width: 768px) {
    font-size: 10px;
    line-height: 11.35px;
    border-radius: 6px;
  }
`;
const LikeButton = styled(FooterButton)<{ isLiked?: boolean | null }>`
  padding: 8.5px 12.4px;
  background-color: ${(props) =>
    props.isLiked ? "var(--Color-Foundation-orange-500)" : "var(--Color-Foundation-base-white)"};
  border-color: ${(props) =>
    props.isLiked ? "var(--Color-Foundation-base-white)" : "var(--Color-Foundation-orange-500)"};
  color: ${(props) =>
    props.isLiked ? "var(--Color-Foundation-base-white)" : "var(--Color-Foundation-orange-500)"};
  @media (max-width: 768px) {
    padding: 6.5px 8.25px;
  }
`;
const BackToBoardButton = styled(FooterButton)`
  padding: 8.5px 10.5px;
  @media (max-width: 768px) {
    padding: 6.5px 8.25px;
  }
`;
const FooterIcon = styled.img`
  width: 13px;
  height: 12.5px;
  margin-right: 4px;
  @media (max-width: 768px) {
    width: 11.5px;
    height: 11px;
  }
`;
const LikeButtonIcon = styled(FooterIcon)<{ isLiked?: boolean | null }>`
  background-color: ${(props) =>
    props.isLiked ? "var(--Color-Foundation-orange-500)" : "var(--Color-Foundation-base-white)"};
`;

const CommentContainer = styled.div``;
