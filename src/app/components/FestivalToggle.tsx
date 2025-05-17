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
    isFestivalDate && (
      <ToggleWrapper onClick={() => setActive(!active)}>
        <ToggleContainer active={active}>
          <ToggleCircle />
        </ToggleContainer>
        <ToggleText active={active}>축제</ToggleText>
      </ToggleWrapper>
    )
  );
}

const ToggleWrapper = styled.div`
  display: flex;
  position: absolute;
  height: fit-content;
  right: 24px;

  @media (max-width: 768px) {
    right: 17px;
  }
`;

const ToggleContainer = styled.div<{ active: boolean }>`
  width: 80.206px;
  height: 34.864px;
  box-sizing: border-box;
  border-radius: 17.432px;
  background-color: ${({ active }) =>
    active
      ? `var(--Color-Foundation-orange-500, #FF9522)`
      : `var(--Grey-3, var(--Color-Foundation-gray-500))`}; // 주황색 / 회색
  display: flex;
  align-items: center;
  justify-content: ${({ active }) => (active ? "flex-end" : "flex-start")};
  padding: 2.14px 2.49px 2.14px 2.88px;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 44.573px;
    height: 19.375px;
    border-radius: 9.688px;
    padding: 1.19px 1.38px 1.19px 1.6px;
  }
`;

const ToggleText = styled.span<{ active: boolean }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  margin-left: ${({ active }) => (active ? "11.7px" : "39.28px")};

  color: var(--Color-Foundation-base-white);
  text-align: center;
  font-feature-settings: "liga" off, "clig" off;
  font-family: NanumSquareOTF;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.54px;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 9px;
    letter-spacing: -0.3px;
    margin-left: ${({ active }) => (active ? "6.5px" : "21.83px")};
  }
`;

const ToggleCircle = styled.div`
  width: 30.59px;
  height: 30.59px;
  border-radius: 50%;
  background-color: var(--Color-Foundation-base-white);
  z-index: 1;

  fill: var(--Main-White, var(--Color-Foundation-base-white));
  filter: drop-shadow(0px 0px 7.198px rgba(0, 0, 0, 0.15));

  @media (max-width: 768px) {
    width: 17px;
    height: 17px;
    filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.15));
  }
`;
