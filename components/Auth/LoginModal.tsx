import styled from "styled-components";

export default function LoginModal() {
  const CloseSvg = (
    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M20.4291 1.50138C21.0816 2.15559 21.0802 3.21487 20.426 3.86736L13.3203 10.9545L20.3917 18.0258C21.045 18.6792 21.045 19.7384 20.3917 20.3918C19.7383 21.0451 18.679 21.0451 18.0257 20.3918L10.9512 13.3173L3.84243 20.4075C3.18823 21.06 2.12894 21.0586 1.47645 20.4044C0.823961 19.7502 0.825349 18.6909 1.47955 18.0385L8.58525 10.9514L1.46381 3.82991C0.810458 3.17656 0.810458 2.11728 1.46381 1.46393C2.11715 0.810581 3.17644 0.81058 3.82979 1.46393L10.9543 8.58847L18.0631 1.49828C18.7173 0.845791 19.7766 0.84718 20.4291 1.50138Z"
        fill="white"
      />
    </svg>
  );

  const handleKakaoLogin = () => {
    const restApiKey = process.env.NEXT_PUBLIC_KAKAO_RESTAPI;
    const redirectUri = process.env.NEXT_PUBLIC_REDIRECTURI;
    const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${restApiKey}&redirect_uri=${redirectUri}`;

    window.location.href = kakaoUrl;
  };

  return (
    <Background>
      <MainContainer>
        <TopContainer>
          <LoginTitle>로그인</LoginTitle>
          <CloseButton>{CloseSvg}</CloseButton>
        </TopContainer>
        <p>식샤</p>
        <SocialKakao
          onClick={() => {
            handleKakaoLogin();
          }}
        >
          <KakaoUnion src={"/img/kakaoUnion.svg"}></KakaoUnion>
          Login with Kakao
        </SocialKakao>
        <SocialGoogle>
          <GoogleUnion src={"/img/googleUnion.svg"}></GoogleUnion>
          Login with Google
        </SocialGoogle>
        <p>WAFFLE STUDIO</p>
      </MainContainer>
    </Background>
  );
}

const Background = styled.div`
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
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
  transform: translateX(-50%);
  width: 55px;
  height: 23px;
  font-family: NanumSquare;
  font-weight: 800;
  font-size: 20px;
  color: #ffffff;
`;

const CloseButton = styled.button`
  margin-top: 27px;
  margin-right: 30.14px;
  padding: 0;
  border: 0;
  outline: 0;
  width: 37.86px;
  height: 37.86px;
  background: transparent;
  border: none;
`;

const SocialKakao = styled.div`
  width: 300px;
  height: 45px;
  background-color: #fee500;
  margin: auto;
  margin-top: 128px;
  vertical-align: center;
  line-height: 45px;
  font-family: NanumSquare;
  font-size: 14px;
  color: #181600;
  position: relative;
  cursor: pointer;
  border-radius: 6px;
`;
const KakaoUnion = styled.img`
  width: 19px;
  height: 17px;
  position: absolute;
  top: 14px;
  left: 14px;
`;
const SocialGoogle = styled.div`
  width: 300px;
  height: 45px;
  margin: auto;
  margin-top: 18px;
  vertical-align: center;
  line-height: 45px;
  font-family: NanumSquare;
  font-size: 14px;
  color: #393939;
  border-radius: 6px;
  border: 1px solid #b7b7b7;
  position: relative;
`;
const GoogleUnion = styled.img`
  width: 23px;
  height: 41px;
  position: absolute;
  top: 2px;
  left: 10.5px;
`;
