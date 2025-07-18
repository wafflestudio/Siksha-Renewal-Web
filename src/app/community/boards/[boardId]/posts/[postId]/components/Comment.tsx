import styled from "styled-components";
import { Comment as CommentType } from "types";
import { formatPostCommentDate } from "utils/FormatUtil";
import MobileActionsModal, { ModalAction } from "./MobileActionsModal";
import { ReportModal } from "./ReportModal";
import useModals from "hooks/UseModals";
import DeleteModal from "./DeleteModal";
import useAuth from "hooks/UseAuth";

interface CommentProps {
  comment: CommentType;
  deleteComment: (id: number) => Promise<void>;
  toggleLike: (id: number, isLiked: boolean) => Promise<void>;
}

export default function Comment({ comment, deleteComment, toggleLike }: CommentProps) {
  const { nickname, content, createdAt, updatedAt, id, profileUrl, available, isLiked, likeCount } =
    comment;

  const { authStatus } = useAuth();
  const { openModal, openLoginModal } = useModals();

  const onClickReport = () => {
    if (authStatus === "logout") openLoginModal();
    else
      openModal(ReportModal, {
        type: "comment",
        targetID: id,
        onClose: () => {},
        onSubmit: () => {},
      });
  };

  const onClickMoreActions = () => {
    openModal(MobileActionsModal, { actions: actions, onClose: () => {} });
  };

  const onClickDelete = () => {
    if (authStatus === "logout") openLoginModal();
    else
      openModal(DeleteModal, {
        type: "comment",
        onClose: () => {},
        onSubmit: () => deleteComment(id),
      });
  };

  if (!available)
    return (
      <NotAvailableContainer>
        <NotAvailableMessage>신고가 누적되어 숨겨진 댓글입니다</NotAvailableMessage>
      </NotAvailableContainer>
    );

  const actions: ModalAction[] = [
    { name: "공감", handleClick: () => toggleLike(id, isLiked) },
    comment.isMine
      ? { name: "삭제", handleClick: onClickDelete }
      : {
          name: "신고",
          handleClick: onClickReport,
        },
  ];

  return (
    <Container>
      <div>
        <Header>
          <WriterInfoContainer>
            <ProfileImage src={profileUrl ?? "/img/default-profile.svg"} alt="프로필 이미지" />
            <Nickname>{comment.anonymous ? "익명" : nickname}</Nickname>
          </WriterInfoContainer>
          <MobileCommentDate>
            {formatPostCommentDate(updatedAt ? updatedAt : createdAt)}
          </MobileCommentDate>
          <DesktopCommentActions>
            {actions.map((action, i) => (
              <DesktopActionButton key={i} onClick={action.handleClick}>
                {action.name}
              </DesktopActionButton>
            ))}
          </DesktopCommentActions>
        </Header>
        <Content>{content}</Content>
        <Footer>
          <MobileMoreActionsButton
            src="/img/etc.svg"
            onClick={onClickMoreActions}
            alt="기타 옵션"
          />
          <DesktopCommentDate>
            {formatPostCommentDate(updatedAt ? updatedAt : createdAt)}
          </DesktopCommentDate>
          {likeCount > 0 && (
            <DesktopLikeContainer>
              <DesktopLikeIcon src="/img/post-like.svg" alt="좋아요" />
              <DesktopLikes>{likeCount}</DesktopLikes>
            </DesktopLikeContainer>
          )}
        </Footer>
      </div>
      <MobileLikeButton
        onClick={(e) => {
          toggleLike(id, isLiked);
          e.preventDefault();
        }}
      >
        <MobileLikeIcon
          src={isLiked ? "/img/post-like-fill.svg" : "/img/post-like.svg"}
          alt="좋아요"
        />
        <MobileLikes>{likeCount}</MobileLikes>
      </MobileLikeButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--SemanticColor-Border-Primary);
  margin: 0;

  & > div {
    padding-top: 14px;
    flex-grow: 1;
    @media (max-width: 768px) {
      padding-top: 10px;
    }
  }
  @media (max-width: 768px) {
    border-color: var(--SemanticColor-Border-Primary);
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
  border-radius: 50%;
  object-fit: cover;
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
  color: var(--Color-Foundation-base-black);
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
  color: var(--Color-Foundation-gray-500);
  font-weight: 400;
  font-size: 12px;
  cursor: pointer;
`;

const Content = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 19.3px;
  color: var(--Color-Foundation-base-black);
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
    background: var(--SemanticColor-Element-Chip);
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
  color: var(--Color-Foundation-orange-500);
  font-weight: 400;
  font-size: 10px;
  margin-top: 8px;
`;

const Footer = styled.div`
  display: flex;
  margin-top: 14.73px;
  @media (max-width: 768px) {
    margin-top: 0;
  }
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
  color: var(--Color-Foundation-gray-500);
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
  color: var(--Color-Foundation-orange-500);
  font-weight: 400;
  font-size: 12px;
  margin-left: 4px;
`;

const NotAvailableContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 60px;
  padding: 0 20px;
  border-bottom: 1px solid var(--SemanticColor-Border-Primary);
`;
const NotAvailableMessage = styled.div`
  font-size: 12px;
  color: var(--Color-Foundation-gray-500);
`;
