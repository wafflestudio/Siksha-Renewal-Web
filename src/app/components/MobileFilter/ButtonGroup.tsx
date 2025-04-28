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
  border: 1px solid hsla(0, 0%, 88%, 1);
`;

const ButtonItem = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  height: 34px;
  color: black;
  width: 100%;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
`;

const SelectedButtonItem = styled(ButtonItem)`
  background-color: #ffe8ce;
  border: 1px solid #ff9522;
`;
