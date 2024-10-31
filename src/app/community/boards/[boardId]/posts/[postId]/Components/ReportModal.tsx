import AlertModal from "components/general/AlertModal";
import BackClickable from "components/general/BackClickable";
import MobileSubHeader from "components/general/MobileSubHeader";
import UseAuth from "hooks/UseAuth";
import useModals from "hooks/UseModals";
import UseProfile from "hooks/UseProfile";
import { useState } from "react";
import styled from "styled-components";
import { setReportComment, setReportPost } from "utils/api/community";

interface ReportModalProps {
  type: "post" | "comment";
  targetID: number;
  onClose: () => void;
  onSubmit?: () => void;
}

export function ReportModal({ type, targetID, onClose, onSubmit }: ReportModalProps) {
  const [reason, setReason] = useState("");
  const { userInfo } = UseProfile();
  const { getAccessToken } = UseAuth();
  const { openModal } = useModals();

  const isValid = reason.length >= 1;

  const reportFunction = type === "post" ? setReportPost : setReportComment;

  function report() {
    if (isValid) {
      getAccessToken().then((accessToken) =>
        reportFunction(targetID, reason, accessToken)
          .then(() => {
            setReason("");
            onSubmit?.();
            openModal(AlertModal, {
              title: "신고 완료",
              message: "신고가 접수되었습니다",
              onClose: () => {},
            });
          })
          .catch((err) => {
            const { response } = err;
            if (!response) console.log(err);
            else {
              const {
                status,
                data: { message },
              } = err.response;
              // 이전 신고한 이력이 있을 때
              if (status === 409) {
                onClose();
                openModal(AlertModal, {
                  title: "이미 신고한 글",
                  message: message,
                  onClose: () => {},
                });
              } else {
                console.log(err);
              }
            }
          }),
      );
    }
  }

  const profileImg = "/img/default-profile.svg";

  return (
    <BackClickable onClickBackground={onClose}>
      <>
        <MobileSubHeader title="신고하기" handleBack={onClose} />
        <MainContainer>
          <Header>
            <Title>신고하기</Title>
            <CloseButton onClick={onClose}>
              <Image src="/img/modal-close.svg" alt="닫기" />
            </CloseButton>
          </Header>
          <MobileBox>
            <Icon src="/img/comment.svg" alt="comment" />
            <Description>어떤 이유로 신고하시나요?</Description>
          </MobileBox>
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
      </>
    </BackClickable>
  );
}

const MainContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
    top: 0;
    left: 0;
    transform: none;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    border: 0;
  }
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin: 27px 30px 0 30px;
  width: 658px;

  @media (max-width: 768px) {
    display: none;
  }
`;
const Title = styled.h3`
  font-size: 20px;
  font-weight: 700;
  line-height: 23px;
  margin-top: 0;
  color: #ff9522;
`;
const Image = styled.img``;
const CloseButton = styled.button`
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  width: 27px;
  height: 30px;
`;

const MobileBox = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 104px;
    margin-bottom: 35px;
  }
`;
const Icon = styled.img`
  width: 18px;
  height: 18px;
`;
const Description = styled.p`
  text-align: center;
  margin-left: 10px;
  font-size: 20px;
  font-weight: 700;
`;

const WriterBox = styled.div`
  margin: 0 30px 0 30px;
  width: 658px;

  @media (max-width: 768px) {
    width: 100%;
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
    margin-left: 28px;
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
const InputContainer = styled.div`
  @media (max-width: 768px) {
    width: calc(100% - 56px);
    margin-left: 28px;
    margin-right: 28px;
    height: 280px;
    margin-top: 13px;
  }
`;
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
    width: 100%;
    margin: 0;
    height: 280px;

    ::placeholder {
      color: transparent;
    }
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

  @media (max-width: 768px) {
    width: 100%;
    margin-left: 16px;
    margin-right: 16px;
    position: absolute;
    right: 23px;
  }
`;
const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin-bottom: 27px;
  width: 95%;

  @media (max-width: 768px) {
    margin-top: auto;
    padding: 0 16px;
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
`;
const CancelButton = styled(Button)`
  color: #8e8e8e;
  background-color: #eee;

  @media (max-width: 768px) {
    display: none;
  }
`;
const ReportButton = styled(Button)`
  color: ${(props) => (props.disabled ? "#8e8e8e" : "white")};
  background-color: ${(props) => (props.disabled ? "#eee" : "#ff9522")};

  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0;
    margin-bottom: 32px;
    height: 56px;
  }
`;
