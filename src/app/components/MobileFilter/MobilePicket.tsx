import styled from "styled-components";

interface PicketProps {
  left?: number;
  text: string;
  ref?: React.RefObject<HTMLDivElement>;
}

export default function MobilePicket({ left, text, ref }: PicketProps) {
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
  top: -50px;
`;

const PicketText = styled.div`
  display: flex;
  padding: 6px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 4px;
  background: var(--Color-Foundation-gray-100, #f0f0f0);
  color: var(--Color-Foundation-gray-800, #707070);

  text-align: center;
  font-size: var(--Font-size-12, 12px);
  font-weight: var(--Font-weight-bold, 700);
  line-height: 140%; /* 15.4px */

  white-space: nowrap;
`;

const PicketBottom = styled.img`
  width: 6px;
  height: 5px;
  fill: var(--Color-Foundation-gray-100, #f0f0f0);
`;
