import BackClickable from "components/general/BackClickable";
import styled from "styled-components";

export interface ModalAction {
  name: string;
  handleClick: () => void;
}

export default function MobileActionsModal({
  actions,
  onClose,
  onSubmit,
}: {
  actions: ModalAction[];
  onClose: () => void;
  onSubmit?: () => void;
}) {
  return (
    <BackClickable onClickBackground={onClose}>
      <MainContainer>
        {actions.map(
          (action, i) =>
            action.name !== "공감" && (
              <ActionWrapper
                key={i}
                onClick={() => {
                  action.handleClick();
                  onSubmit?.();
                }}
              >
                {action.name + "하기"}
              </ActionWrapper>
            ),
        )}
        <CancelWrapper onClick={onClose}>취소</CancelWrapper>
      </MainContainer>
    </BackClickable>
  );
}

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
