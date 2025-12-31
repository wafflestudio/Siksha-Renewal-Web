import BackClickable from "components/general/BackClickable";
import useIsMobile from "hooks/UseIsMobile";
import styled from "styled-components";
import { getParticle } from "utils/FormatUtil";

interface DeleteModalProps {
  type: "post" | "comment" | "review";
  onClose: () => void;
  onSubmit: () => void;
}

export default function DeleteModal({ type, onClose, onSubmit }: DeleteModalProps) {
  const isMobile = useIsMobile();

  const target = type === "post" ? "게시물" : type === "comment" ? "댓글" : "평가";
  const particle = getParticle(target, ["을", "를"]);

  if (!isMobile)
    return (
      <BackClickable onClickBackground={onClose}>
        <DesktopContainer>
          <Header>
            <Title>{target} 삭제</Title>
            <CloseButton onClick={onClose}>
              <Icon src="/img/modal-close.svg" alt="닫기" />
            </CloseButton>
          </Header>
          <Message>
            해당 {target}
            {particle} 삭제하시겠습니까?
          </Message>
          <Footer>
            <CancelButton onClick={onClose}>취소</CancelButton>
            <DeleteButton onClick={onSubmit}>삭제</DeleteButton>
          </Footer>
        </DesktopContainer>
      </BackClickable>
    );
  else
    return (
      <BackClickable onClickBackground={onClose}>
        <MobileContainer>
          <MobileHeader>
            <MobileTitle>{target} 삭제</MobileTitle>
          </MobileHeader>
          <MobileMessage>
            {target === "평가" && "해당 "}
            {target}
            {particle} 정말 삭제하시겠습니까?
          </MobileMessage>
          <MobileFooter>
            <MobileCancelButton onClick={onClose}>취소</MobileCancelButton>
            <MobileDeleteButton onClick={onSubmit}>삭제</MobileDeleteButton>
          </MobileFooter>
        </MobileContainer>
      </BackClickable>
    );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
`;

const DesktopContainer = styled(Container)`
  gap: 47px 30px;
  width: 497px;
  height: 230px;
  border-radius: 13px;
  padding: 27px 30px 30px 33px;
  background-color: white;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Title = styled.div`
  font-size: 20px;
  font-weight: 800;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
`;
const Icon = styled.img``;
const Message = styled.div``;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 17px;
`;
const Button = styled.button`
  border: none;
  width: 80px;
  height: 46px;
  box-sizing: border-box;
  border-radius: 13px;
  cursor: pointer;
`;
const CancelButton = styled(Button)`
  background-color: #eeeeee;
  color: #8e8e8e;
`;
const DeleteButton = styled(Button)`
  background-color: #ff9522;
  color: white;
`;

const MobileContainer = styled(Container)`
  top: 50%;
  transform: translate(-50%, -50%);
  gap: 11px 17px;
  width: 315px;
  height: 130px;
  padding-top: 20px;
  border-radius: 26px;
  background-color: #fff;
`;
const MobileHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const MobileTitle = styled.div`
  font-size: 16px;
  font-weight: 800;
  line-height: 19px;
`;
const MobileMessage = styled.div`
  display: flex;
  justify-content: center;

  color: var(--Color-Foundation-base-black, #000);
  text-align: center;

  /* text-13/Regular */
  font-family: var(--Font-family-sans, NanumSquare);
  font-size: var(--Font-size-13, 13px);
  font-style: normal;
  font-weight: var(--Font-weight-regular, 400);
  line-height: 140%; /* 18.2px */
`;
const MobileFooter = styled.div`
  border-top: 1px solid #e3e3e3;
  flex: 1;
`;
const MobileButton = styled.button`
  width: 50%;
  height: 100%;
  background-color: inherit;
  border: none;
  outline: none;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
`;
const MobileCancelButton = styled(MobileButton)`
  color: #ff9522;
  border-right: 1px solid #e3e3e3;
`;
const MobileDeleteButton = styled(MobileButton)`
  color: #797979;
`;
