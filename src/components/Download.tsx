import Link from "next/link";
import styled from "styled-components";

const Download = () => {
  return (
    <Container>
      <Link href={"https://wafflestudio.com/"}>
        <Waffle src={"/img/waffle.svg"} alt="waffle studio" />
      </Link>
      <DownloadLink>
        <Link href={"https://play.google.com/store/apps/details?id=com.wafflestudio.siksha2"}>
          <Flexbox>
            <DownloadImg src={"/img/google-play.svg"} alt="google play store" />
            <StoreText>Google Play</StoreText>
          </Flexbox>
        </Link>
        <Divider />
        <Link href={"https://apps.apple.com/kr/app/id1032700617"}>
          <Flexbox>
            <DownloadImg src={"/img/app-store.svg"} alt="apple store" />
            <StoreText>App Store</StoreText>
          </Flexbox>
        </Link>
      </DownloadLink>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0 30px;

  @media (max-width: 768px) {
    padding: 10px 0 25px;
  }
`;

const DownloadImg = styled.img`
  width: 16px;
  padding-right: 8px;
`;

const DownloadLink = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    padding-top: 5px;
    opacity: 0.75;
  }
`;

const StoreText = styled.div`
  font-size: 14px;
  font-weight: 700;
`;

const Divider = styled.div`
  width: 1px;
  height: 70%;
  margin: 0 16px;
  background: #ececec;
`;

const Flexbox = styled.div`
  display: flex;
  align-items: center;
`;

const Waffle = styled.img`
  opacity: 0.7;
  width: 260px;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 223px;
  }
`;

export default Download;
