import styled from "styled-components";
import { Comment as CommentType } from "../../types";
import { useDispatchContext, useStateContext } from "../../hooks/ContextProvider";
import axios from "axios";
import APIendpoint from "../../constants/constants";
import { useState } from "react";
import { formatPostCommentDate } from "../../utils/FormatUtil";

interface CommentProps {
  comment: CommentType;
  refetch: () => Promise<void>;
}

export default function Comment({ comment, refetch }: CommentProps) {
  const { nickname, content, createdAt, updatedAt, id } = comment;

  const { userInfo } = useStateContext();
  const dispatch = useDispatchContext();

  const [isLiked, setIsLiked] = useState<boolean>(comment.isLiked);
  const [likeCount, setLikeCount] = useState<number>(comment.likeCount);

  const isLikedImg = isLiked ? "/img/post-like-fill.svg" : "/img/post-like.svg";
  const profileImg = "/img/default-profile.svg";

  async function isLikeToggle() {
    if (!userInfo.id) {
      dispatch({ type: "SET_LOGINMODAL", isLoginModal: true });
    } else {
      const apiUrl = isLiked
        ? `${APIendpoint()}/community/comments/${id}/unlike`
        : `${APIendpoint()}/community/comments/${id}/like`;
      try {
        await axios
          .post(
            apiUrl,
            {},
            {
              headers: { "authorization-token": `Bearer ${localStorage.getItem("access_token")}` },
            },
          )
          .then((res) => {
            setIsLiked(res.data.is_liked);
            setLikeCount(res.data.like_cnt);
          });
      } catch (e) {
        console.error(e);
      }
    }
  }

  async function deleteComment() {
    if (!userInfo.id) {
      dispatch({ type: "SET_LOGINMODAL", isLoginModal: true });
    } else if (confirm("이 댓글을 삭제하시겠습니까?")) {
      try {
        await axios
          .delete(
            `${APIendpoint()}/community/comments/${id}`,
            {
              headers: { "authorization-token": `Bearer ${localStorage.getItem("access_token")}` },
            },
          )
          .then(() => {refetch()});
      } catch (e) {
        console.error(e);
      }
    }
  }

  return (
    <Container>
      <Header>
        <WriterInfoContainer>
          <ProfileImage src={profileImg} />
          <Nickname>{comment.anonymous ? "익명" : nickname}</Nickname>
        </WriterInfoContainer>
        <DesktopCommentActions>
          <DesktopActionButton onClick={(e) => {}}>댓글</DesktopActionButton>
          <DesktopActionButton
            onClick={(e) => {
              isLikeToggle();
              e.preventDefault();
            }}
          >
            공감
          </DesktopActionButton>
          {comment.isMine ? (
            <DesktopActionButton onClick={deleteComment}>삭제</DesktopActionButton>
          ) : (
            <DesktopActionButton onClick={(e) => {}}>신고</DesktopActionButton>
          )}
        </DesktopCommentActions>
      </Header>
      <Content>{content}</Content>
      <Footer>
        <CommentDate>{formatPostCommentDate(updatedAt ? updatedAt : createdAt)}</CommentDate>
        <MobileLikeButton
          onClick={(e) => {
            isLikeToggle();
            e.preventDefault();
          }}
        >
          <MobileLikeIcon src={isLikedImg} />
          <MobileLikes>{likeCount}</MobileLikes>
        </MobileLikeButton>
        {likeCount > 0 && (
          <DesktopLikeContainer>
            <DesktopLikeIcon src="/img/post-like.svg" />
            <DesktopLikes>{likeCount}</DesktopLikes>
          </DesktopLikeContainer>
        )}
      </Footer>
      <HLine />
    </Container>
  );
}

const Container = styled.div``;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const WriterInfoContainer = styled.div`
  display: flex;
  align-items: center;
`;
const ProfileImage = styled.img`
  width: 23px;
  height: 23px;
`;
const Nickname = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  margin-left: 9px;
`;
const DesktopCommentActions = styled.ul`
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
  & li {
    margin: 0 8px;
  }
  & li:first-child {
    margin-left: 0;
  }
  & li:last-child {
    margin-right: 0;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;
const DesktopActionButton = styled.li`
  color: #b7b7b7;
  font-weight: 400;
  font-size: 12px;
  cursor: pointer;
`;

const Content = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 19.3px;
`;

const MobileLikeButton = styled.div`
  display: none;
  @media (max-width: 768px) {
    background: #f8f8f8;
    width: 35.6px;
    height: 53px;
    border-radius: 6px;
    padding: 14px 11px;
    cursor: pointer;
  }
`;
const MobileLikeIcon = styled.img`
  width: 13.6px;
  height: 13px;
`;
const MobileLikes = styled.div`
  color: #ff9522;
  font-weight: 400;
  font-size: 10px;
  margin-top: 8px;
`;

const Footer = styled.div`
  display: flex;
  margin-top: 7px;
`;
const CommentDate = styled.div`
  color: #b7b7b7;
  font-weight: 400;
  font-size: 12px;
`;
const DesktopLikeContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 20px;
  @media (max-width: 768px) {
    display: none;
  }
`;
const DesktopLikeIcon = styled.img`
  width: 13px;
  height: 13px;
`;
const DesktopLikes = styled.div`
  color: #ff9522;
  font-weight: 400;
  font-size: 12px;
  margin-left: 4px;
`;

const HLine = styled.div`
  height: 1px;
  background: #eeeeee;
  margin: 14px 0;

  @media (max-width: 768px) {
    background: #f0f0f0;
  }
`;
