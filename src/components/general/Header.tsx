import styled from "styled-components";
import { useRouter } from "next/navigation";
import NavigationBar from "components/general/NavigationBar";
import useModals from "hooks/UseModals";
import useAuth from "hooks/UseAuth";
import TwoColumnLayout from "styles/layouts/TwoColumnLayout";
import Image from "next/image";

export default function Header() {
  const router = useRouter();

  const { authStatus, logout } = useAuth();
  const { openLoginModal } = useModals();

  return (
    <Background>
      <DesktopContainer>
        <Left>
          <Image
            src="/manifest/desktop-icon.png"
            height={50}
            width={50}
            onClick={() => router.push("/")}
            alt="식샤 아이콘"
          />
          <TitleContainer>
            <Image
              src="/img/sikshaSplash.svg"
              height={31}
              width={53}
              onClick={() => router.push("/")}
              alt="식샤 로고"
            />
            <Title onClick={() => router.push("/")}>서울대학교 식단 알리미</Title>
          </TitleContainer>
        </Left>
        <Right>
          <NavigationBar />
          {authStatus === "login" ? (
            <LoginButton onClick={logout}>로그아웃</LoginButton>
          ) : (
            <LoginButton onClick={() => openLoginModal()}>로그인</LoginButton>
          )}
        </Right>
      </DesktopContainer>
      <MobileContainer>
        <Image
          src="/img/sikshaSplash.svg"
          height={25}
          width={50}
          onClick={() => router.push("/")}
          alt="식샤 로고"
        />
        {authStatus === "login" ? (
          <LoginButton onClick={logout}>로그아웃</LoginButton>
        ) : (
          <LoginButton onClick={() => openLoginModal()}>로그인</LoginButton>
        )}
      </MobileContainer>
    </Background>
  );
}

const Background = styled.div`
  background: var(--Color-Foundation-orange-500, #ff9522);
`;

const DesktopContainer = styled(TwoColumnLayout.Container)`
  height: 70px;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  align-self: stretch;
  margin-top: 0;
`;

const MobileContainer = styled.div`
  display: none;
  @media (max-width: 768px) {
    position: relative;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background: var(--Color-Foundation-orange-500);
    height: 44px;
    width: auto;
    z-index: 1;
  }
`;

const Left = styled(TwoColumnLayout.Left)`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
`;

const TitleContainer = styled.div`
  display: flex;
  width: 200px;
  padding-top: 6px;
  align-items: flex-end;
  gap: 15px;
`;

const Title = styled.span`
  margin: 2px 0;
  color: var(--Color-Foundation-base-white, #fff);
  font-size: 14px;
  font-weight: 400;
  white-space: nowrap;
  cursor: pointer;
`;

const Right = styled(TwoColumnLayout.Right)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LoginButton = styled.button`
  padding: 8px 10px;
  border-radius: 8px;
  background: var(--Color-Foundation-orange-400, #ffaa4e);
  color: var(--Color-Foundation-base-var(--Color-Foundation-base-white), #fff);
  font-size: 15px;
  font-weight: 700;
  white-space: nowrap;
  cursor: pointer;

  @media (max-width: 768px) {
    position: absolute;
    right: 5vw;
    padding: 0;
    background: none;
    font-size: 16px;
    font-weight: 400;
  }
`;
