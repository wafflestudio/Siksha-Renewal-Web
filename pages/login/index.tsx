import styled from "styled-components";
import Header from "../../components/Header";
import { GlobalStyle } from "../../styles/globalstyle";

export default function Login() {
  const handleKakaoLogin = () => {
    const restApiKey: string = process.env.NEXT_PUBLIC_KAKAO_RESTAPI;
    const redirectUri: string = process.env.NEXT_PUBLIC_REDIRECTURI;
    const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${restApiKey}&redirect_uri=${redirectUri}`;

    window.location.href = kakaoUrl;
    console.log(restApiKey);
  };

  return (
    <>
      <GlobalStyle />
      <Header />
      <SocialKakao
        onClick={() => {
          handleKakaoLogin();
        }}
      >
        Login with Kakao
      </SocialKakao>
      <SocialGoogle>Login with Google</SocialGoogle>
    </>
  );
}

const LoginButton = styled.div`
  display: inline;
  font-size: 20px;
  font-weight: 400;
  line-height: 22.7px;
  width: 84px;
  height: 23px;
  text-align: center;
  color: #ff9522;
  top: 17%;
  position: absolute;
`;

const SocialKakao = styled.div`
  width: 300px;
  height: 45px;
  background-color: #fee500;
`;
const SocialGoogle = styled.div`
  width: 300px;
  height: 45px;
  background-color: #ff9522;
`;
