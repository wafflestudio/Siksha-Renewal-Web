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
    <ButtonGroupWrapper count={items.length}>
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

const ButtonGroupWrapper = styled.div<{ count: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.count}, 1fr);
  gap: 10px;
  height: 34px;
  border-radius: 30px;
  box-shadow: inset 0 0 0 1px var(--Color-Foundation-gray-200, #E5E6E9);
  box-sizing: content-box;
  align-content: center;
`;

const ButtonItem = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  height: 34px;
  color: black;
  width: 100%;
  background-color: transparent;
  box-sizing: border-box;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
`;

const SelectedButtonItem = styled(ButtonItem)`
  background: var(--Color-Foundation-orange-100, #FFEAD3);
  box-shadow: inset 0 0 0 1px var(--Color-Foundation-orange-500, #ff9522);
`;
