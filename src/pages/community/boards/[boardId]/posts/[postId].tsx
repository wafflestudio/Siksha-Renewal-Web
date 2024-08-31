import { useRouter } from "next/router";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Post as PostType, Comment as CommentType, RawComment, RawPost } from "types";
import Board from "../../index";
import CommentList from "components/Community/CommentList";
import CommentWriter from "components/Community/CommentWriter";
import { formatPostCommentDate } from "utils/FormatUtil";
import PostImageSwiper from "components/Community/PostImageSwiper";
import MobileActionsModal, { ModalAction } from "components/Community/MobileActionsModal";
import { commentParser, postParser } from "utils/DataUtil";
import {
  deletePost,
  getCommentList,
  getPost,
  setPostLike,
  setPostUnlike,
} from "utils/api/community";
import { ReportModal } from "components/Community/ReportModal";
import MobileSubHeader from "components/MobileSubHeader";
import DeleteModal from "components/Community/DeleteModal";
import useModals from "hooks/UseModals";
import useAuth from "hooks/UseAuth";
import AlertModal from "components/general/AlertModal";
import { LoadingAnimation } from "styles/globalstyle";
import useIsMobile from "hooks/UseIsMobile";

export default function Post() {
  const router = useRouter();
  const { boardId, postId } = router.query;
  const { authStatus, getAccessToken, checkAccessToken } = useAuth();
  const { openModal, openLoginModal } = useModals();

  const [post, setPost] = useState<PostType | null>(null);
  const [comments, setComments] = useState<CommentType[]>([]);

  const [isError, setIsError] = useState<boolean>(false);

  const isMobile = useIsMobile();

  const fetchPost = () => {
    return checkAccessToken()
      .then((result: string | null) => getPost(Number(postId), result ?? undefined))
      .then((data) => setPost(postParser(data)))
      .catch((e) => {
        console.error(e);
        setIsError(true);
      });
  };

  const fetchComments = (size: number, page: number) => {
    return checkAccessToken()
      .then((result: string | null) =>
        getCommentList(Number(postId), result ?? undefined, size, page),
      )
      .then(({ result, hasNext }) => {
        const newComments = result.map(commentParser);
        setComments((prev) => [...prev, ...newComments]);
        return hasNext;
      })
      .catch((e) => {
        console.error(e);
        setIsError(true);
      });
  };

  const addComment = (rawComment: RawComment) => {
    setComments((prev) => [...prev, commentParser(rawComment)]);
  };
  const deleteComment = (id: number) => {
    setComments((prev) => prev.filter((comment) => comment.id !== id));
  };

  const fetchLike = () => {
    if (authStatus === "logout") openLoginModal();
    else if (post) {
      const handleLikeAction = post.isLiked ? setPostUnlike : setPostLike;
      getAccessToken()
        .then((accessToken) => handleLikeAction(post.id, accessToken))
        .then(({ isLiked, likeCount }) => {
          setPost({
            ...post,
            isLiked: isLiked,
            likeCount: likeCount,
          });
        })
        .catch((e) => {
          console.error(e);
          setIsError(true);
        });
    }
  };

  const removePost = (postId: number) => {
    if (authStatus === "logout") openLoginModal();
    else
      openModal(DeleteModal, {
        type: "post",
        onClose: () => {},
        onSubmit: () =>
          getAccessToken()
            .then((accessToken) => deletePost(postId, accessToken))
            .then(() => router.back())
            .catch((e) => console.error(e)),
      });
  };

  const reportPost = (postId: number) => {
    if (authStatus === "logout") openLoginModal();
    else openModal(ReportModal, { type: "post", targetID: postId, onClose: () => {} });
  };

  const updatePost = (postId: number) => {
    router.push(`/community/write/?postId=${postId}`);
  };

  const onClickMoreActions = (actions: ModalAction[]) => {
    openModal(MobileActionsModal, { actions: actions, onClose: () => {} });
  };

  useEffect(() => {
    if (boardId && postId) {
      setComments((prev) => []);
      fetchPost();
    }
  }, [boardId, postId]);

  if (post) {
    const isLikedImg = post.isLiked ? "/img/post-like-fill.svg" : "/img/post-like.svg";
    const likeButtonIcon = post.isLiked ? "/img/post-like-white.svg" : "/img/post-like.svg";
    const profileImg = post.profileUrl || "/img/default-profile.svg";

    const actions: ModalAction[] = post.isMine
      ? [
          {
            name: "수정",
            handleClick: () => updatePost(post.id),
          },
          {
            name: "삭제",
            handleClick: () => removePost(post.id),
          },
        ]
      : [
          {
            name: "신고",
            handleClick: () => reportPost(post.id),
          },
        ];
    // availiable 여부에 따라 게시물을 보여줄지 보여주지 않을지 결정합니다.
    if (post.available === false)
      openModal(AlertModal, {
        title: "신고 누적 게시글",
        message: "신고가 누적되어 숨겨진 게시글입니다.",
        onClose: () => router.push(`/community/boards/${boardId}/`),
      });
    // available한 경우만 게시물을 보여줍니다.
    else if (post.available === true)
      return (
        <>
          <MobileSubHeader selectedBoardId={Number(boardId) ?? 1} handleBack={router.back} />
          <Board selectedBoardId={Number(boardId) ?? 1} showBoardMenu={!isMobile}>
            <Container>
              <Header>
                <WriterInfoContainer>
                  <ProfileImage src={profileImg} alt="프로필 이미지" />
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
                  <Icon src={isLikedImg} alt="좋아요" />
                  {post.likeCount}
                </Likes>
                <Comments>
                  <Icon src="/img/post-comment.svg" alt="댓글" />
                  {post.commentCount}
                </Comments>
              </LikesAndComments>
              <Footer>
                <LikeButton onClick={fetchLike} isLiked={post.isLiked}>
                  <LikeButtonIcon src={likeButtonIcon} isLiked={post.isLiked} alt="공감" />
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
                <CommentList comments={comments} update={deleteComment} fetch={fetchComments} />
                <CommentWriter postId={post.id} update={addComment} />
              </CommentContainer>
            </Container>
          </Board>
        </>
      );
  } else {
    return (
      <>
        <MobileSubHeader selectedBoardId={Number(boardId) ?? 1} handleBack={router.back} />
        <Board selectedBoardId={Number(boardId) ?? 1} showBoardMenu={!isMobile}>
          <ErrorContainer>{isError ? "포스트를 찾을 수 없어요" : ""}</ErrorContainer>
        </Board>
      </>
    );
  }
}

const Container = styled.div`
  width: 100%;
  padding-top: 18.83px;
  @media (max-width: 768px) {
    padding-top: 16px;
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
const EmptyText = styled.div``;

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
  color: #b7b7b7;
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

  color: #b7b7b7;
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
  margin-bottom: 23px;
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
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 17.7px;
  border-bottom: 1px solid #eeeeee;
  @media (max-width: 768px) {
    border-color: #f0f0f0;
    padding-bottom: 12.5px;
  }
`;
const FooterButton = styled.button`
  display: flex;
  align-items: center;
  border: 1px solid #ff9522;
  border-radius: 8px;
  background-color: #ffffff;
  color: #ff9522;
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
  background-color: ${(props) => (props.isLiked ? "#ff9522" : "#fff")};
  border-color: ${(props) => (props.isLiked ? "#fff" : "#ff9522")};
  color: ${(props) => (props.isLiked ? "#fff" : "#ff9522")};
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
  background-color: ${(props) => (props.isLiked ? "#ff9522" : "#fff")};
`;

const CommentContainer = styled.div``;
