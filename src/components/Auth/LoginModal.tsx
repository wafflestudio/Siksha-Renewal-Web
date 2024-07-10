import styled from "styled-components";
import { useDispatchContext } from "../../hooks/ContextProvider";
import React, { useCallback } from "react";
import { useRouter } from "next/router";

export default function LoginModal() {
  const router = useRouter();

  const handleKakaoLogin = () => {
    const restApiKey = process.env.NEXT_PUBLIC_KAKAO_RESTAPI;
    const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECTURI;
    const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${restApiKey}&redirect_uri=${redirectUri}`;

    window.location.href = kakaoUrl;
  };

  const handleGoogleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENTID;
    const redirectUri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECTURI;
    const googleUrl = `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.email&response_type=code&redirect_uri=${redirectUri}&client_id=${clientId}`;
    window.location.href = googleUrl;
  };

  const handleAppleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_APPLE_CLIENTID!;
    const redirectUri = process.env.NEXT_PUBLIC_APPLE_REDIRECTURI!;

    window.AppleID.auth.init({
      clientId: clientId,
      scope: "email",
      redirectURI: redirectUri,
      state: "[STATE]",
      nonce: "[NONCE]",
      usePopup: true,
    });

    const signIn = () =>
      new Promise(async (resolve, reject) => {
        try {
          const response = await window.AppleID.auth.signIn();
          resolve(response);
        } catch (error) {
          reject(error);
        }
      });

    signIn()
      .then((res: SigninResponse) => {
        const { code, id_token } = res.authorization;
        router.push(`/auth/apple?code=${code}&id_token=${id_token}`);
      })
      .catch((error: SigninError) => {
        console.error(error);
      });
  };

  const dispatch = useDispatchContext();

  const closeModal = useCallback(() => dispatch.setLoginModal(false), [dispatch]);

  return (
    <Background>
      <MainContainer>
        <TopContainer>
          <LoginTitle>로그인</LoginTitle>
          <CloseButton src={"/img/close-auth.svg"} onClick={() => closeModal()} />
        </TopContainer>
        <SikshaLogo src={"/img/siksha-typo.svg"} />
        <SocialContainer>
          <SocialButton provider="kakao" onClick={handleKakaoLogin}>
            <SocialUnion
              width={19}
              height={17}
              left={14}
              right={74}
              src={"/img/kakaoUnion.svg"}
            ></SocialUnion>
            Login with Kakao
          </SocialButton>
          <SocialButton provider="google" onClick={handleGoogleLogin}>
            <SocialUnion
              width={23}
              height={41}
              left={10.5}
              right={74}
              src={"/img/googleUnion.svg"}
            ></SocialUnion>
            Login with Google
          </SocialButton>
          <SocialButton provider="apple" onClick={handleAppleLogin}>
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
  z-index: 99;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  overflow: hidden;

  @media (max-width: 768px) {
    overflow: scroll;
  }
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

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100dvh;
    border-radius: 0px;
  }
`;

const TopContainer = styled.span`
  display: flex;
  justify-content: space-between;
  width: 100%;

  @media (max-width: 768px) {
    flex-grow: 222;
  }
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
  width: 110.5px;
  height: 63.97px;
  margin-top: 60.91px;
  margin-left: 50%;
  transform: translateX(-50%);

  @media (max-width: 768px) {
    margin-top: 0px;
    flex-grow: 144.5;
    width: 85px;
    height: 49.5px;
    transform: translate(-50%, -50%);
  }
`;

const SocialContainer = styled.div`
  margin-top: 75.26px;
  @media (max-width: 768px) {
    margin-top: 0;
    flex-grow: 95;
  }
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
  width: 191px;
  height: 16px;

  margin-top: 72px;
  margin-left: 50%;
  transform: translateX(-50%);

  @media (max-width: 768px) {
    margin-top: 0px;
    margin-bottom: 87px;
  }
`;
