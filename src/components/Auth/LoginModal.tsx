import styled from "styled-components";
import { useDispatchContext } from "../../hooks/ContextProvider";
import React, { useCallback } from "react";

export default function LoginModal() {
  const handleKakaoLogin = () => {
    const restApiKey = process.env.NEXT_PUBLIC_KAKAO_RESTAPI;
    const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECTURI;
    const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${restApiKey}&redirect_uri=${redirectUri}`;

    window.location.href = kakaoUrl;
  };

  const { setLoginModal } = useDispatchContext();

  return (
    <Background>
      <MainContainer>
        <TopContainer>
          <LoginTitle>로그인</LoginTitle>
          <CloseButton src={"/img/close-auth.svg"} onClick={() => setLoginModal(false)} />
        </TopContainer>
        <SikshaLogo src={"/img/siksha-typo.svg"} />
        <SocialContainer>
          <SocialButton
            provider="kakao"
            onClick={() => {
              handleKakaoLogin();
            }}
          >
            <SocialUnion
              width={19}
              height={17}
              left={14}
              right={74}
              src={"/img/kakaoUnion.svg"}
            ></SocialUnion>
            Login with Kakao
          </SocialButton>
          <SocialButton provider="google">
            <SocialUnion
              width={23}
              height={41}
              left={10.5}
              right={74}
              src={"/img/googleUnion.svg"}
            ></SocialUnion>
            Login with Google
          </SocialButton>
          <SocialButton provider="google">
            <SocialUnion
              width={17}
              height={18}
              left={16.5}
              right={77}
              src={"/img/appleUnion.svg"}
            ></SocialUnion>
            Login with Apple
          </SocialButton>
        </SocialContainer>
        <WaffleLogo src={"/img/waffle-typo.svg"} />
      </MainContainer>
    </Background>
  );
}

const Background = styled.div`
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  overflow: hidden;
`;

const MainContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 497px;
  height: 565px;
  transform: translate(-50%, -50%);
  background: #ff9522;
  border-radius: 13px;
`;

const TopContainer = styled.span`
  display: flex;
  justify-content: space-between;
`;

const LoginTitle = styled.p`
  margin-top: 35px;
  margin-left: 50%;
  margin-bottom: 0px;
  transform: translateX(-50%);
  width: 55px;
  height: 23px;
  font-family: NanumSquare;
  font-weight: 800;
  font-size: 20px;
  color: #ffffff;
`;

const CloseButton = styled.img`
  margin-top: 27px;
  margin-right: 30.14px;
  padding: 5.77px;
  width: 26.77px;
  height: 26.77px;
  background: transparent;
  cursor: pointer;
`;

const SikshaLogo = styled.img`
  margin-top: 60.91px;
  margin-left: 50%;
  transform: translateX(-50%);
`;

const SocialContainer = styled.div`
  margin-top: 75.26px;
`;

const SocialButton = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 300px;
  height: 45px;
  margin: auto;
  margin-top: 18px;
  line-height: 45px;
  font-family: NanumSquare;
  font-size: 14px;
  background-color: ${(props: { provider: "kakao" | "google" | "apple" }) =>
    props.provider === "kakao" ? "#fee500" : "#ffffff"};
  color: ${(props: { provider: "kakao" | "google" | "apple" }) =>
    props.provider === "kakao" ? "#181600" : "#393939"};

  border-radius: 6px;
  position: relative;
  cursor: pointer;
`;

const SocialUnion = styled.img`
  width: ${(props: { width: number; height: number; left: number; right: number }) =>
    props.width}px;
  height: ${(props) => props.height}px;
  margin-left: ${(props) => props.left}px;
  margin-right: ${(props) => props.right}px;
`;

const WaffleLogo = styled.img`
  margin-top: 72px;
  margin-left: 50%;
  transform: translateX(-50%);
`;
