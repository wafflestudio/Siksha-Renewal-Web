import styled from "styled-components";

interface PicketProps {
  left?: number;
  text: string;
  ref?: React.RefObject<HTMLDivElement>;
}

export default function WebPicket({ left, text, ref }: PicketProps) {
  return (
    <PicketBox left={left ?? 0} ref={ref}>
      <PicketText>{text}</PicketText>
      <PicketBottom src={"/img/picket-bottom.svg"} />
    </PicketBox>
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
  background: var(--Color-Foundation-gray-100, #f2f3f4);
  color: var(--Color-Foundation-gray-800, #4c4d50);

  text-align: center;
  font-size: var(--Font-size-11, 11px);
  font-weight: var(--Font-weight-bold, 700);
  line-height: 140%; /* 15.4px */

  /* white-space: nowrap;
  height: 25px; */
`;

const PicketBottom = styled.img`
  width: 6px;
  height: 5px;
  fill: var(--Color-Foundation-gray-100, #f0f0f0);
`;
