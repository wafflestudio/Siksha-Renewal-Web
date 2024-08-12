import BackClickable from "components/general/BackClickable";
import UseAccessToken from "hooks/UseAccessToken";
import UseProfile from "hooks/UseProfile";
import { useState } from "react";
import styled from "styled-components";
import { setReportComment, setReportPost } from "utils/api/community";

interface ReporyModalProps {
  type: "post" | "comment";
  targetID: number;
  onClose: () => void;
  onSubmit?: () => void;
}

export function ReportModal({ type, targetID, onClose, onSubmit }: ReporyModalProps) {
  const [reason, setReason] = useState("");
  const { userInfo } = UseProfile();
  const { checkAccessToken } = UseAccessToken();

  const isValid = reason.length >= 1;

  const reportFunction = type === "post" ? setReportPost : setReportComment;

  function report() {
    if (isValid) {
      checkAccessToken().then((res) =>
        reportFunction(targetID, reason, res).then(() => {
          setReason("");
          onSubmit?.();
        }),
      );
    }
  }

  const profileImg = "/img/default-profile.svg";

  return (
    <BackClickable onClickBackground={onClose}>
      <MainContainer>
        <Header>
          <Title>신고하기</Title>
          <CloseButton onClick={onClose}>
            <Image src="/img/modal-close.svg" alt="닫기" />
          </CloseButton>
        </Header>
        <WriterBox>
          <WriterInfoContainer>
            <ProfileImage src={profileImg} />
            <Nickname>{!userInfo?.nickname ? `ID ${userInfo?.id}` : userInfo.nickname}</Nickname>
          </WriterInfoContainer>
        </WriterBox>
        <InputContainer>
          <InputBox
            placeholder="어떤 이유로 신고하시나요?"
            value={reason}
            onChange={(e) => {
              if (e.target.value.length <= 500) {
                setReason(e.target.value);
              }
            }}
          />
          <WordCnt>{`${reason.length} / 500자`}</WordCnt>
        </InputContainer>
        <Footer>
          <CancelButton onClick={onClose}>취소</CancelButton>
          <ReportButton disabled={!isValid} onClick={report}>
            신고
          </ReportButton>
        </Footer>
      </MainContainer>
    </BackClickable>
  );
}

const MainContainer = styled.div`
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translateX(-50%);
  width: 701px;
  height: 623.49px;
  box-sizing: border-box;
  background: white;
  border-radius: 5px;
  flex-shrink: 0;
  //padding: 27px 30px 30px 33.5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
  }
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin: 27px 30px 0 30px;
  width: 658px;

  @media (max-width: 768px) {
  }
`;
const Title = styled.h3`
  font-size: 20px;
  font-weight: 700;
  line-height: 23px;
  letter-spacing: -0.3px;
  margin-top: 0;
  color: #ff9522;

  @media (max-width: 768px) {
  }
`;
const Image = styled.img``;
const CloseButton = styled.button`
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  width: 27px;
  height: 30px;

  @media (max-width: 768px) {
  }
`;

const WriterBox = styled.div`
  margin: 0 30px 0 30px;
  width: 658px;

  @media (max-width: 768px) {
  }
`;
const WriterInfoContainer = styled.div`
  display: flex;
  align-items: center;
`;
const ProfileImage = styled.img`
  width: 23px;
  height: 23px;
  @media (max-width: 768px) {
    width: 16px;
    height: 16px;
  }
`;
const Nickname = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  margin-left: 5px;
  @media (max-width: 768px) {
    font-weight: 700;
    font-size: 11px;
    line-height: 12.5px;
  }
`;
const InputContainer = styled.div``;
const InputBox = styled.textarea`
  resize: none;
  width: 658px;
  box-sizing: border-box;
  border: none;
  border-radius: 13px;
  outline: none;
  background-color: #fafafa;
  height: 378.11px;
  padding: 15px;
  font-size: 16px;
  margin: 0 30px 0 30px;

  ::placeholder,
  ::-webkit-input-placeholder {
    color: #8a8a8a;
  }
  :-ms-input-placeholder {
    color: #8a8a8a;
  }

  @media (max-width: 768px) {
  }
`;
const WordCnt = styled.div`
  width: 650px;
  margin-top: -26.46px;
  margin-left: 20px;
  text-align: right;
  font-size: 11px;
  font-weight: 400;
  line-height: 12.48px;
  color: #707070;
`;
const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin-bottom: 27px;
  width: 95%;

  @media (max-width: 768px) {
  }
`;
const Button = styled.button`
  background: none;
  border: none;
  outline: none;
  width: 324px;
  height: 46px;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;

  @media (max-width: 768px) {
  }
`;
const CancelButton = styled(Button)`
  color: #8e8e8e;
  background-color: #eee;
`;
const ReportButton = styled(Button)`
  color: ${(props) => (props.disabled ? "#8e8e8e" : "white")};
  background-color: ${(props) => (props.disabled ? "#eee" : "#ff9522")};
`;
