import styled from "styled-components";

interface PicketProps {
  bodyPos?: number;
  tailPos?: number;
  text: string;
  ref?: React.RefObject<HTMLDivElement>;
}

export default function MobilePicket({ bodyPos, tailPos, text, ref }: PicketProps) {
  return (
    <>
      <PicketBox left={bodyPos ?? 0} ref={ref}>
        <PicketText>{text}</PicketText>
      </PicketBox>
      <PicketBottom left={tailPos ?? 0} src={"/img/picket-bottom.svg"} />
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
  top: -40px;
`;

const PicketText = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 6px;
  align-items: center;
  gap: 10px;
  border-radius: 2px;
  background: var(--Color-Foundation-gray-100, var(--Color-Foundation-gray-100));
  color: var(--Color-Foundation-gray-800, #707070);

  text-align: center;
  font-size: var(--Font-size-12, 12px);
  font-weight: var(--Font-weight-bold, 700);
  line-height: 140%; /* 15.4px */

  white-space: nowrap;
  height: 25px;
`;

const PicketBottom = styled.img<{ left: number }>`
  position: absolute;
  left: ${(props) => `${props.left}%`}; // hardcoded 3px to center the image
  transform: translateX(-50%);
  top: -15px;
  width: 6px;
  height: 5px;
  fill: var(--Color-Foundation-gray-100, var(--Color-Foundation-gray-100));
`;
