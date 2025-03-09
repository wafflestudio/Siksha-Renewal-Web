import styled from "styled-components";

interface PicketProps {
  left?: number;
  text: string;
}

export default function MobilePicket({ left, text }: PicketProps) {
  return (
    <PicketBox left={left ?? 0}>
      <PicketText>{text}</PicketText>
      <PicketBottom src={"/img/picket-bottom.svg"} />
    </PicketBox>
  );
}

const PicketBox = styled.div<{ left: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* position: absolute;
  left: ${({ left }) => `${left}px`};
  top: -10px; */
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
`;

const PicketBottom = styled.img`
  width: 6px;
  height: 5px;
  fill: var(--Color-Foundation-gray-100, #f0f0f0);
`;
