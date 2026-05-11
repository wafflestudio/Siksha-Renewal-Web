"use client";

import UseFilter from "hooks/UseFilter";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useStateContext } from "providers/ContextProvider";

export default function FestivalToggle() {
  const { isFestivalDate } = useStateContext();
  const { changeFilterOption, filterList } = UseFilter();

  const [active, setActive] = useState(filterList.isFestival);

  useEffect(() => {
    setActive(filterList.isFestival);
  }, [filterList.isFestival]);

  return (
    isFestivalDate && (
      <ToggleWrapper
        onClick={() => {
          const next = !active;
          setActive(next);
          changeFilterOption({ isFestival: next });
        }}
      >
        <ToggleContainer $active={active}>
          <ToggleCircle $active={active} />
        </ToggleContainer>
        <ToggleText $active={active}>축제</ToggleText>
      </ToggleWrapper>
    )
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

const ToggleContainer = styled.div<{ $active: boolean }>`
  position: relative;
  width: 63px;
  height: 28px;
  box-sizing: border-box;
  border-radius: 90.323px;
  background-color: ${({ $active }) =>
    $active
      ? `var(--Color-Foundation-orange-500, #FF9522)`
      : `var(--Grey-3, var(--Color-Foundation-gray-500))`}; // 주황색 / 회색
  cursor: pointer;
  overflow: hidden;
  transition: background-color 0.3s ease-out;

  &::before {
    content: "";
    border-radius: inherit;
    position: absolute;
    inset: 0;
    background: linear-gradient(270deg, #ff9da4 40%, #ff9522 100%);
    opacity: ${({ $active }) => ($active ? 1 : 0)};
    transition: opacity 0.3s ease-out;
    z-index: 1;
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 24px;
    border-radius: 64.516px;
  }
`;

const ToggleText = styled.span<{ $active: boolean }>`
  position: absolute;
  top: calc(50% - 0.5px);
  left: ${({ $active }) => ($active ? "19.5px" : "43.5px")};
  transform: translate(-50%, -50%);

  color: var(--Color-Foundation-base-white);
  text-align: center;
  font-feature-settings: "liga" off, "clig" off;
  font-family: NanumSquare;
  font-size: 12.6px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.3px;
  white-space: nowrap;
  z-index: 2;
  cursor: pointer;

  transition: left 0.3s ease-out;

  @media (max-width: 768px) {
    font-size: 10px;
    left: ${({ $active }) => ($active ? "15px" : "35px")};
  }
`;

const ToggleCircle = styled.div<{ $active: boolean }>`
  position: absolute;
  top: 50%;
  right: ${({ $active }) => ($active ? "2.1px" : "37.1px")};
  width: 23.8px;
  height: 23.8px;
  border-radius: 50%;
  background-color: var(--Color-Foundation-base-white);
  transform: translateY(-50%);
  z-index: 2;
  transition: right 0.3s ease-out;

  filter: drop-shadow(0px 0px 7.198px rgba(0, 0, 0, 0.15));

  @media (max-width: 768px) {
    width: 20px;
    height: 20px;
    right: ${({ $active }) => ($active ? "2px" : "28px")};
    box-shadow: 0px 0px 0px 0.702px rgba(0, 0, 0, 0.04), 0px 2.105px 5.614px 0px rgba(0, 0, 0, 0.15),
      0px 2.105px 0.702px 0px rgba(0, 0, 0, 0.06);
  }
`;
