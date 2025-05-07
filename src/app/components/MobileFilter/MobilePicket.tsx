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
  background: var(--Color-Foundation-gray-100, #F2F3F4);
  color: var(--Color-Foundation-gray-700, #727478);
  text-align: center;

  /* text-12/Bold */
  font-family: var(--Font-family-sans);
  font-size: var(--Font-size-12, 12px);
  font-style: normal;
  font-weight: var(--Font-weight-bold, 700);
  line-height: 140%; /* 16.8px */

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
  fill: var(--Color-Foundation-gray-100, #F2F3F4);
`;
