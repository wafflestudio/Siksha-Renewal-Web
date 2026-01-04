import { ReactNode } from "react";
import styled from "styled-components";

interface ButtonGroupProps {
  items: Array<{
    label: ReactNode;
    id: string;
  }>;
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function ButtonGroup({ items, onSelect, selectedId }: ButtonGroupProps) {
  return (
    <ButtonGroupWrapper $count={items.length}>
      {items.map((item) => {
        const isSelected = item.id === selectedId;
        return isSelected ? (
          <SelectedButtonItem key={item.id} onClick={() => onSelect(item.id)}>
            {item.label}
          </SelectedButtonItem>
        ) : (
          <ButtonItem key={item.id} onClick={() => onSelect(item.id)}>
            {item.label}
          </ButtonItem>
        );
      })}
    </ButtonGroupWrapper>
  );
}

const ButtonGroupWrapper = styled.div<{ $count: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.$count}, 1fr);
  gap: 10px;
  height: 34px;
  border-radius: 30px;
  border: 1px solid var(--SemanticColor-Border-Primary);
`;
const ButtonItem = styled.button`
  display: flex;
  border-radius: 30px;
  height: 34px;
  color: var(--SemanticColor-Text-GNB);
  width: 100%;
  background-color: transparent;
  box-sizing: border-box;
  border: none;
  cursor: pointer;

  color: var(--Color-Foundation-base-black, #000);
  text-align: center;
  justify-content: center;
  align-items: center;

  /* text-14/Bold */
  font-family: var(--Font-family-sans, NanumSquare);
  font-size: var(--Font-size-14, 14px);
  font-style: normal;
  font-weight: var(--Font-weight-bold, 700);
  line-height: 150%; /* 21px */
  letter-spacing: var(--Font-letter-spacing-0, -0.3px);
`;

const SelectedButtonItem = styled(ButtonItem)`
  background-color: var(--Color-Foundation-Tint-orange);
  border: 1px solid var(--Color-Foundation-orange-500);
`;
