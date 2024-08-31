import styled from "styled-components";
import BackClickable from "./BackClickable";
import useIsMobile from "hooks/UseIsMobile";

interface MessageModalProps {
  title: string;
  message: string;
  onClose: () => void;
}

export default function AlertModal({ title, message, onClose }: MessageModalProps) {
  const isMobile = useIsMobile();

  if (!isMobile)
    return (
      <BackClickable onClickBackground={onClose}>
        <DesktopContainer>
          <Header>
            <Title>{title}</Title>
            <CloseButton onClick={onClose}>
              <Icon src="/img/modal-close.svg" alt="닫기" />
            </CloseButton>
          </Header>
          <Message>{message}</Message>
          <Footer>
            <Button onClick={onClose}>확인</Button>
          </Footer>
        </DesktopContainer>
      </BackClickable>
    );
  else
    return (
      <BackClickable onClickBackground={onClose}>
        <MobileContainer>
          <MobileHeader>
            <MobileTitle>{title}</MobileTitle>
          </MobileHeader>
          <MobileMessage>{message}</MobileMessage>
          <MobileFooter>
            <MobileCancelButton onClick={onClose}>확인</MobileCancelButton>
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
  top: 423px;
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
`;

const Button = styled.button`
  border: none;
  width: 80px;
  height: 46px;
  box-sizing: border-box;
  border-radius: 13px;
  cursor: pointer;
  background-color: #ff9522;
  color: white;
`;

const MobileContainer = styled(Container)`
  top: 50%;
  transform: translate(-50%, -50%);
  gap: 11px 17px;
  width: calc(100% - 60px);
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
  font-weight: 600;
  line-height: 19px;
`;
const MobileMessage = styled.div`
  display: flex;
  justify-content: center;
  font-size: 12px;
  line-height: 15px;
`;
const MobileFooter = styled.div`
  border-top: 1px solid #e3e3e3;
  flex: 1;
`;
const MobileButton = styled.button`
  width: 100%;
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
