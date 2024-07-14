import BackClickable from "components/general/BackClickable";
import UseAccessToken from "hooks/UseAccessToken";
import { useState } from "react";
import styled from "styled-components";
import { reportComment, reportPost } from "utils/api/community";

interface ReporyModalProps {
  type: "post" | "comment";
  targetID: number;
  setReportModal: (value: boolean) => void;
}

export function ReportModal({ type, targetID, setReportModal }: ReporyModalProps) {
  const [reason, setReason] = useState("");
  const { checkAccessToken } = UseAccessToken();

  const isValid = reason.length >= 1;

  function report() {
    if (isValid) {
      if (type === "post") {
        checkAccessToken().then((res) =>
          reportPost(targetID, reason, res).then(() => {
            setReason("");
            setReportModal(false);
          }),
        );
      } else if (type === "comment") {
        checkAccessToken().then((res) =>
          reportComment(targetID, reason, res).then(() => {
            setReason("");
            setReportModal(false);
          }),
        );
      }
    }
  }

  return (
    <BackClickable onClickBackground={() => setReportModal(false)}>
      <MainContainer>
        <Header>
          <Title>{type === "post" ? "게시물" : "댓글"} 신고</Title>
          <CloseButton onClick={() => setReportModal(false)}>
            <Image src="/img/modal-close.svg" alt="닫기" />
          </CloseButton>
        </Header>
        <InputBox placeholder="이유" value={reason} onChange={(e) => setReason(e.target.value)} />
        <Footer>
          <CancelButton onClick={() => setReportModal(false)}>취소</CancelButton>
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
  width: 497px;
  height: 230px;
  box-sizing: border-box;
  background: white;
  border-radius: 13px;
  flex-shrink: 0;
  padding: 27px 30px 30px 33.5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Title = styled.h3`
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -0.3px;
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
const InputBox = styled.input`
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-radius: 13px;
  outline: none;
  background-color: #fafafa;
`;
const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const Button = styled.button`
  background: none;
  border: none;
  outline: none;
  width: 80px;
  height: 46px;
  font-size: 16px;
  border-radius: 8px;
  margin-left: 17px;
  cursor: pointer;
`;
const CancelButton = styled(Button)`
  color: #8e8e8e;
  background-color: #eee;
`;
const ReportButton = styled(Button)`
  color: ${(props) => (props.disabled ? "#8e8e8e" : "white")};
  background-color: ${(props) => (props.disabled ? "#eee" : "#ff9522")};
`;
