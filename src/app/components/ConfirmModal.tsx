import BackClickable from "components/general/BackClickable";
import styled from "styled-components";

interface ConfirmModalProps {
  type: "submit" | "edit" | "delete";
  onClose: () => void;
}

export default function ConfirmModal({ type, onClose }: ConfirmModalProps) {
  const action = type === "submit" ? "등록" : type === "edit" ? "수정" : "삭제";

  return (
    <BackClickable onClickBackground={onClose}>
      <MobileContainer>
        <MobileMessage>평가가 {action}되었습니다.</MobileMessage>
        <MobileFooter>
          <MobileCloseButton onClick={onClose}>확인</MobileCloseButton>
        </MobileFooter>
      </MobileContainer>
    </BackClickable>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  box-sizing: border-box;
`;

const MobileContainer = styled(Container)`
  top: 50%;
  transform: translate(-50%, -50%);
  width: 315px;

  border-radius: 26px;
  background-color: #fff;
`;
const MobileMessage = styled.div`
  display: flex;
  justify-content: center;

  padding: 19px 62px 14px 62px;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  align-self: stretch;

  color: var(--Color-Foundation-base-black, #000);
  text-align: center;

  /* text-16/Bold */
  font-family: var(--Font-family-sans, NanumSquare);
  font-size: var(--Font-size-16, 16px);
  font-style: normal;
  font-weight: var(--Font-weight-bold, 700);
  line-height: 140%; /* 22.4px */
`;
const MobileFooter = styled.div`
  border-top: 1px solid #e3e3e3;
  flex: 1;
`;
const MobileCloseButton = styled.button`
  display: flex;
  height: 49px;
  padding: 13px 27px;
  justify-content: center;
  align-items: center;

<<<<<<< HEAD
  color: var(--Color-Foundation-orange-500, #ff9522);
=======
  color: var(--Color-Foundation-orange-500, #FF9522);
>>>>>>> origin
  text-align: center;

  /* text-16/ExtraBold */
  font-family: var(--Font-family-sans, NanumSquare);
  font-size: var(--Font-size-16, 16px);
  font-style: normal;
  font-weight: var(--Font-weight-extrabold, 800);
  line-height: 140%; /* 22.4px */

  width: 100%;
  border: none;
  outline: none;
  cursor: pointer;
`;
