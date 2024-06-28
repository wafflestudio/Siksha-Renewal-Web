import styled from "styled-components";
import { Action, Comment as CommentType } from "types";
import { useDispatchContext, useStateContext } from "hooks/ContextProvider";
import axios from "axios";
import APIendpoint from "constants/constants";
import { useState } from "react";
import { formatPostCommentDate } from "utils/FormatUtil";
import MobileActionsModal, { ModalAction } from "./MobileActionsModal";

interface CommentProps {
  comment: CommentType;
  refetch: () => Promise<void>;
}

export default function Comment({ comment, refetch }: CommentProps) {
  const { nickname, content, createdAt, updatedAt, id } = comment;

  const { userInfo } = useStateContext();
  const { setLoginModal } = useDispatchContext();

  const [isLiked, setIsLiked] = useState<boolean>(comment.isLiked);
  const [likeCount, setLikeCount] = useState<number>(comment.likeCount);

  const [actionsModal, setActionsModal] = useState<boolean>(false);

  const isLikedImg = isLiked ? "/img/post-like-fill.svg" : "/img/post-like.svg";
  const profileImg = "/img/default-profile.svg";

  const actions: ModalAction[] = [
    { name: "공감", handleClick: isLikeToggle },
    comment.isMine
      ? { name: "삭제", handleClick: deleteComment }
      : { name: "신고", handleClick: () => {} },
  ];

  async function isLikeToggle() {
    if (!userInfo.id) {
      setLoginModal(true);
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
      setLoginModal(true);
    } else if (confirm("이 댓글을 삭제하시겠습니까?")) {
      try {
        await axios
          .delete(`${APIendpoint()}/community/comments/${id}`, {
            headers: { "authorization-token": `Bearer ${localStorage.getItem("access_token")}` },
          })
          .then(refetch);
      } catch (e) {
        console.error(e);
      }
    }
  }

  return (
    <>
      <Container>
        <div>
          <Header>
            <WriterInfoContainer>
              <ProfileImage src={profileImg} />
              <Nickname>{comment.anonymous ? "익명" : nickname}</Nickname>
            </WriterInfoContainer>
            <MobileCommentDate>
              {formatPostCommentDate(updatedAt ? updatedAt : createdAt)}
            </MobileCommentDate>
            <DesktopCommentActions>
              {actions.map((action) => (
                <DesktopActionButton onClick={action.handleClick}>{action.name}</DesktopActionButton>
              ))}
            </DesktopCommentActions>
          </Header>
          <Content>{content}</Content>
          <Footer>
            <MobileMoreActionsButton src="/img/etc.svg" onClick={()=>setActionsModal(true)} />
            { actionsModal && <MobileActionsModal actions={actions} setActionsModal={setActionsModal}/> }
            <DesktopCommentDate>
              {formatPostCommentDate(updatedAt ? updatedAt : createdAt)}
            </DesktopCommentDate>
            {likeCount > 0 && (
              <DesktopLikeContainer>
                <DesktopLikeIcon src="/img/post-like.svg" />
                <DesktopLikes>{likeCount}</DesktopLikes>
              </DesktopLikeContainer>
            )}
          </Footer>
        </div>
        <MobileLikeButton
          onClick={(e) => {
            isLikeToggle();
            e.preventDefault();
          }}
        >
          <MobileLikeIcon src={isLikedImg} />
          <MobileLikes>{likeCount}</MobileLikes>
        </MobileLikeButton>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 14px;
  border-bottom: 1px solid #eeeeee;
  margin: 0;

  & > div {
    padding-top: 14px;
    flex-grow: 1;
    @media (max-width: 768px) {
      padding-top: 10px;
    }
  }
  @media (max-width: 768px) {
    border-color: #f0f0f0;
    padding-bottom: 0;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14.73px;
  @media (max-width: 768px) {
    justify-content: inherit;
    margin-bottom: 7.4px;
  }
`;
const WriterInfoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 8.2px;
`;
const ProfileImage = styled.img`
  width: 23px;
  height: 23px;
  @media (max-width: 768px) {
    width: 16px;
    height: 16px;
  }
`;
const Nickname = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  margin-left: 9px;
  @media (max-width: 768px) {
    font-weight: 700;
    font-size: 11px;
    line-height: 12.5px;
  }
`;
const DesktopCommentActions = styled.div`
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
  color: #b7b7b7;
  font-weight: 400;
  font-size: 12px;
  cursor: pointer;
`;

const Content = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 19.3px;
  @media (max-width: 768px) {
    font-size: 12px;
    line-height: 18px;
  }
`;

const MobileLikeButton = styled.button`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #f8f8f8;
    width: 35.6px;
    height: 53px;
    border: none;
    border-radius: 6px;
    padding: 14px 11px;
    box-sizing: border-box;
    cursor: pointer;
  }
`;
const MobileLikeIcon = styled.img`
  width: 11.5px;
  height: 11px;
`;
const MobileLikes = styled.div`
  color: #ff9522;
  font-weight: 400;
  font-size: 10px;
  margin-top: 8px;
`;

const Footer = styled.div`
  display: flex;
  margin-top: 14.73px;
`;
const MobileMoreActionsButton = styled.img`
  display: none;
  cursor: pointer;
  @media (max-width: 768px) {
    display: inherit;
    padding: 10.4px 0;
  }
`;

const CommentDate = styled.div`
  color: #b7b7b7;
  font-weight: 400;
  font-size: 12px;
`;
const MobileCommentDate = styled(CommentDate)`
  display: none;
  @media (max-width: 768px) {
    display: inherit;
    font-size: 10px;
  }
`;
const DesktopCommentDate = styled(CommentDate)`
  @media (max-width: 768px) {
    display: none;
  }
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
