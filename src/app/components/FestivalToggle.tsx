"use client";

import useFestival from "hooks/UseFestival";
import UseFilter from "hooks/UseFilter";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function FestivalToggle() {
  const { isFestivalDate } = useFestival();
  const { changeFilterOption, filterList } = UseFilter();

  const [active, setActive] = useState(filterList.isFestival);

  useEffect(() => {
    setActive(filterList.isFestival);
  }, [filterList.isFestival]);

  const handleClick = () => {
    setActive(!filterList.isFestival);
    changeFilterOption({ isFestival: !filterList.isFestival });
  };

  return (
    isFestivalDate && 
    <ToggleWrapper onClick={handleClick}>
      <ToggleContainer active={active}>
        <ToggleCircle active={active} />
      </ToggleContainer>
      <ToggleText active={active}>축제</ToggleText>
    </ToggleWrapper>
  );
}

const ToggleWrapper = styled.div`
  display: flex;
  position: absolute;
  width: 63px;
  height: 28px;
  justify-content: center;
  align-items: center;
  right: 16px;
  top: 11px;

  @media (max-width: 768px) {
    width: 50px;
    height: 24px;
    right: 14px;
    top: 20px;
  }
`;

const ToggleContainer = styled.div<{ active: boolean }>`
  width: 100%;
  height: 100%;
  padding: 2.1px;
  gap: 6.1px;
  border-radius: 90.323px;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  box-sizing: border-box;
  background: var(--Grey-3, #B7B7B7); 
  cursor: pointer;

  &::before {
    content: "";
    border-radius: 90.323px;
    position: absolute;
    inset: 0;
    background: linear-gradient(270deg, #FF9DA4 40%, #FF9522 100%);
    opacity: ${({ active }) => (active ? 1 : 0)};
    transition: opacity 300ms ease-out;
    z-index: 1;
  }

  @media (max-width: 768px) {
    padding: 2px;
    gap: 2px;
    border-radius: 64.526px;
  }
`;

const ToggleText = styled.span<{ active: boolean }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: ${({ active }) => (active ? '8px' : 'calc(100% - 31px)')};
  z-index: 1;

  width: 23px;

  color: #FFF;
  text-align: center;
  font-feature-settings: 'liga' off, 'clig' off;
  font-family: NanumSquare;
  font-size: 12.6px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;
  
  transition: left 0.3s ease-out;

  @media (max-width: 768px) {
    left: ${({ active }) => (active ? '6px' : 'calc(100% - 24px)')};
    width: 18px;
    font-size: 10px;
  }
`;

const ToggleCircle = styled.div<{ active: boolean }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: ${({ active }) => (active ? "calc(100% - 25.9px)" : '2.1px')};

  width: 23.8px;
  height: 23.8px;
  background-color: white;
  z-index: 1;

  border-radius: 100%;
  background: #FFF;
  box-shadow: 0px 0px 0px 0.881px rgba(0, 0, 0, 0.04), 0px 2.644px 7.052px 0px rgba(0, 0, 0, 0.15), 0px 2.644px 0.881px 0px rgba(0, 0, 0, 0.06);

  transition: left 0.3s ease-out;

  @media (max-width: 768px) {
    left: ${({ active }) => (active ? "calc(100% - 22px)" : '2px')};
    width: 20px;
    height: 20px;
    box-shadow: 0px 0px 0px 0.702px rgba(0, 0, 0, 0.04), 0px 2.105px 5.614px 0px rgba(0, 0, 0, 0.15), 0px 2.105px 0.702px 0px rgba(0, 0, 0, 0.06);
  }
`;