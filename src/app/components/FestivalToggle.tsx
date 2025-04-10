"use client";

import useFestival from "hooks/UseFestival";
import UseFilter from "hooks/UseFilter";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function FestivalToggle() {
  const [active, setActive] = useState(false);
  const { isFestivalDate } = useFestival();
  const { changeFilterOption } = UseFilter();

  useEffect(() => {
    changeFilterOption({ isFestival: active });
  }, [active]);

  return (
    isFestivalDate && 
    <ToggleWrapper onClick={() => setActive(!active)}>
      <ToggleContainer active={active}>
        <ToggleCircle />
      </ToggleContainer>
      <ToggleText active={active}>축제</ToggleText>
    </ToggleWrapper>
  );
}

const ToggleWrapper = styled.div`
  display: flex;
  position: absolute;
  height: fit-content;
  right: 24px;
`;

const ToggleContainer = styled.div<{ active: boolean }>`
  width: 80.206px;
  height: 34.864px;
  box-sizing: border-box;
  border-radius: 17.432px;
  background-color: ${({ active }) => (active ? `var(--Color-Foundation-orange-500, #FF9522)` : `var(--Grey-3, #B7B7B7)`)}; // 주황색 / 회색
  display: flex;
  align-items: center;
  justify-content: ${({ active }) => (active ? 'flex-end' : 'flex-start')};
  padding: 2.14px 2.49px 2.14px 2.88px;
  cursor: pointer;
`;

const ToggleText = styled.span<{ active: boolean }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  margin-left: ${({ active }) => (active ? '11.7px' : '39.28px')};

  color: #FFF;
  text-align: center;
  font-feature-settings: 'liga' off, 'clig' off;
  font-family: NanumSquareOTF;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.54px;
  cursor: pointer;
`;

const ToggleCircle = styled.div`
  width: 30.59px;
  height: 30.59px;
  border-radius: 50%;
  background-color: white;
  z-index: 1;

  fill: var(--Main-White, #FFF);
  filter: drop-shadow(0px 0px 7.198px rgba(0, 0, 0, 0.15));
`;