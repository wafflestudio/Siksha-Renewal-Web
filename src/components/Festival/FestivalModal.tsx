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
        <InfoBox>
          <CloseIcon
            src={"/img/close.svg"}
            onClick={isIgnore ? oncloseWithDisablePopup : onclose}
            alt="닫기"
          />
          <a href="https://linktr.ee/snu_festival" target="_blank">
            <Banner src="/img/festival/banner.png" alt="축제 배너" />
          </a>
          <Option onClick={() => setIsIgnore(!isIgnore)}>
            <Icon src={checkBoxImg} alt="오늘 하루 보지않기" />
            <span>오늘 하루 보지않기</span>
          </Option>
        </InfoBox>
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
  transform: translate(-50%, -40%);
`;

const InfoBox = styled.div`
  background: white;
  width: 90vw;
  max-width: 1000px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  border-radius: 15px;
`;

const CloseIcon = styled.img`
  width: 25px;
  height: 25px;
  padding-top: 16px;
  padding-right: 16px;
  right: 0;
  align-self: flex-end;
  cursor: pointer;
`;

const Banner = styled.img`
  width: 100%;
  object-fit: cover;
  padding: 16px 0;
`;

const Option = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  margin-left: 36px;
  margin-bottom: 16px;
`;

const Icon = styled.img``;
