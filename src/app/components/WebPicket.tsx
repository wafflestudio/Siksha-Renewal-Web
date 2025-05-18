import styled from "styled-components";
import PicketBottomIcon from "assets/icons/picket-bottom.svg";

interface PicketProps {
  bodyPos?: number;
  tailPos?: number;
  text: string;
  ref?: React.RefObject<HTMLDivElement>;
}

export default function WebPicket({ bodyPos, tailPos, text, ref }: PicketProps) {
  return (
    <>
      <PicketBox left={bodyPos ?? 0} ref={ref}>
        <PicketText>{text}</PicketText>
      </PicketBox>
      <StyledPicketBottom left={tailPos ?? 0} />
    </>
  );
}

const PicketBox = styled.div<{ left: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  left: ${(props) => `${props.left}%`};
  transform: translateX(-50%);
  top: -30px;
`;

const PicketText = styled.div`
  display: flex;
  justify-content: center;
  padding: 2px 4px;
  align-items: center;
  gap: 10px;
  border-radius: 4px;
  background: var(--Color-Foundation-gray-100-4);
  color: var(--Color-Foundation-gray-700);

  text-align: center;
  font-size: var(--Font-size-11, 11px);
  font-weight: var(--Font-weight-bold, 700);
  line-height: 140%; /* 15.4px */

  white-space: nowrap;
`;

const StyledPicketBottom = styled(PicketBottomIcon)<{ left: number }>`
  position: absolute;
  left: ${(props) => `${props.left}%`}; // hardcoded 3px to center the image
  transform: translateX(-50%);
  top: -11.5px;
  width: 6px;
  height: 5px;
  color: var(--Color-Foundation-gray-100-4);
`;
