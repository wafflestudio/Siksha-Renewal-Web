import styled from "styled-components";
import BackClickable from "./BackClickable";
import useIsMobile from "hooks/UseIsMobile";
import { useRouter } from "next/navigation";

interface ErrorModalProps {
  code: number;
  message: string;
  onClose: () => void;
  onRetry?: () => void;
}

export default function ErrorModal({ code, message, onClose, onRetry }: ErrorModalProps) {
  const isMobile = useIsMobile();
  const router = useRouter();

  if (!isMobile)
    return (
      <BackClickable onClickBackground={onClose}>
        <DesktopContainer>
          <Header>
            <Title>System Message</Title>
            <CloseButton onClick={onClose}>
              <Icon src="/img/modal-close.svg" alt="닫기" />
            </CloseButton>
          </Header>
          <Message>{message}</Message>
          <Footer>
            <CancelButton onClick={onClose}>이전으로</CancelButton>
            <RetryButton
              hidden={code < 500}
              onClick={code >= 500 ? onRetry : () => router.push("/")}
            >
              {code >= 500 ? "다시시도" : "처음으로"}
            </RetryButton>
          </Footer>
        </DesktopContainer>
      </BackClickable>
    );
  else
    return (
      <BackClickable onClickBackground={onClose}>
        <MobileContainer>
          <MobileHeader>
            <MobileTitle>System Message</MobileTitle>
          </MobileHeader>
          <MobileMessage>{message}</MobileMessage>
          <MobileFooter>
            <MobileCancelButton onClick={onClose} isServerError={code >= 500}>
              이전으로
            </MobileCancelButton>
            <MobileRetryButton onClick={code >= 500 ? () => onRetry : () => router.push("/")}>
              {code >= 500 ? "다시시도" : "처음으로"}
            </MobileRetryButton>
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
  background-color: var(--Color-Foundation-base-white);
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
const RetryButton = styled(Button)`
  background-color: var(--Color-Foundation-orange-500);
  color: var(--Color-Foundation-base-white);
`;

const MobileContainer = styled(Container)`
  gap: 11px 17px;
  width: calc(100% - 60px);
  height: 130px;
  padding-top: 20px;
  border-radius: 26px;
  background-color: var(--Color-Foundation-base-white);
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
  border-top: 1px solid var(--Color-Foundation-gray-200);
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

const MobileRetryButton = styled(MobileButton)`
  color: var(--Color-Foundation-orange-500);
  border-left: 1px solid var(--Color-Foundation-gray-200);
`;
const MobileCancelButton = styled(MobileButton)<{ isServerError: boolean }>`
  width: ${({ isServerError }) => (isServerError ? "50%" : "100%")};
  color: #797979;
`;
