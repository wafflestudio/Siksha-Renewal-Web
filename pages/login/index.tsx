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
      <Container>
        <LoginTitle>로그인</LoginTitle>
        <SocialKakao
          onClick={() => {
            handleKakaoLogin();
          }}
        >
          <KakaoUnion src={"/img/kakaoUnion.svg"}></KakaoUnion>
          Login with Kakao
        </SocialKakao>
        <SocialGoogle>Login with Google</SocialGoogle>
      </Container>
    </>
  );
}
const Container = styled.div`
  text-align: center;
`;

const LoginTitle = styled.div`
  font-family: NanumSquare;
  font-weight: 400;
  font-size: 20px;
  color: #ff9522;
  padding-top: 139px;
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
  background-color: #ff9522;
  margin: auto;
  margin-top: 18px;
  vertical-align: center;
  line-height: 45px;
  font-family: NanumSquare;
  font-size: 14px;
  color: #ffffff;
`;
