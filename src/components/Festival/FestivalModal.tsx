import styled from "styled-components";
import BackClickable from "components/general/BackClickable";
import { useState } from "react";

export default function FestivalModal({
  onclose,
  oncloseWithDisablePopup,
}: {
  onclose: () => void;
  oncloseWithDisablePopup: () => void;
}) {
  const [isIgnore, setIsIgnore] = useState(false);

  const checkBoxImg = isIgnore ? "/img/radio-full.svg" : "/img/radio-empty.svg";

  return (
    <BackClickable onClickBackground={isIgnore ? oncloseWithDisablePopup : onclose}>
      <Container>
        <CloseIcon
          src={"/img/close-white.svg"}
          onClick={isIgnore ? oncloseWithDisablePopup : onclose}
          alt="닫기"
        />
        <a style={{"lineHeight": "0", "width": "100%"}} href="https://linktr.ee/snu_festival" target="_blank">
          <Banner src="/img/festival/banner.png" alt="축제 배너" />
        </a>
        <MoreInfoButton href="https://linktr.ee/snu_festival" target="_blank">자세히 보러가기</MoreInfoButton>
        <Option onClick={() => setIsIgnore(!isIgnore)}>
          <Icon src={checkBoxImg} alt="오늘 하루 보지않기" />
          <IsIgnoreLabel>오늘 하루 보지않기</IsIgnoreLabel>
        </Option>
      </Container>
    </BackClickable>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 50%;
  top: 40%;
  width: 90vw;
  max-width: 1450px;
  max-height: 245px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  transform: translate(-50%, -40%);
`;

const CloseIcon = styled.img`
  position: absolute;
  width: 18.4px;
  height: 18.4px;
  top: 18.1px;
  right: 18.58px;
  align-self: flex-end;
  cursor: pointer;
`;

const Banner = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 15px;
`;

const MoreInfoButton = styled.a`
  position: absolute;
  bottom: 15px;

  background-color: white;
  border: none;
  border-radius: 80px;

  padding: 11px 32px 10px 32px;
  justify-content: center;
  align-items: center;

  color: #8B6EB8;
  text-align: center;
  font-feature-settings: 'liga' off, 'clig' off;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.3px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Option = styled.div`
  position: absolute;
  bottom: -27.5px;

  display: flex;
  align-items: flex-start;
  width: 100%;
`;

const Icon = styled.img`
  height: 16px;
  margin-right: 8px;
  cursor: pointer;
`;

const IsIgnoreLabel = styled.span`
  color: white;
  font-feature-settings: 'liga' off, 'clig' off;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.3px;

  cursor: pointer;
`;
