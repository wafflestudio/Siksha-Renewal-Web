import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

export interface ModalAction {
  name: string;
  handleClick: () => void;
}

export default function MobileActionsModal({
  actions,
  setActionsModal,
}: {
  actions: ModalAction[];
  setActionsModal: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Background onClick={()=>setActionsModal(false)}>
      <MainContainer>
        {actions.map((action) => action.name !== "공감" && (
          <ActionWrapper onClick={action.handleClick}>{action.name + "하기"}</ActionWrapper>
        ))}
        <CancelWrapper onClick={()=>setActionsModal(false)}>취소</CancelWrapper>
      </MainContainer>
    </Background>
  );
}

const Background = styled.div`
  z-index: 99;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  overflow: hidden;
`;

const MainContainer = styled.div`
  position: fixed;
  bottom: 40px;
  left: 50%;
  width: calc(100% - 60px);
  transform: translateX(-50%);
  background: white;
  border-radius: 26px;
`;

const ActionWrapper = styled.div`
  text-align: center;
  padding: 18px 0;
  border-bottom: 1px solid #e3e3e3;
  font-weight: 400;
  font-size: 16px;
  cursor: pointer;
`;

const CancelWrapper = styled.div`
  text-align: center;
  padding: 18px 0;
  color: #ff9522;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
`;