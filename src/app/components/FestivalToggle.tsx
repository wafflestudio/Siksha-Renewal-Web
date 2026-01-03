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
      <ToggleWrapper onClick={() => setActive(!active)}>
        <ToggleContainer $active={active}>
          <ToggleCircle />
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
  width: 80.206px;
  height: 34.864px;
  box-sizing: border-box;
  border-radius: 17.432px;
  background-color: ${({ $active }) =>
    $active
      ? `var(--Color-Foundation-orange-500, #FF9522)`
      : `var(--Grey-3, var(--Color-Foundation-gray-500))`}; // 주황색 / 회색
  display: flex;
  justify-content: flex-end;
  align-items: center;
  justify-content: ${({ $active }) => ($active ? "flex-end" : "flex-start")};
  padding: 2.14px 2.49px 2.14px 2.88px;
  cursor: pointer;

  &::before {
    content: "";
    border-radius: 90.323px;
    position: absolute;
    inset: 0;
    background: linear-gradient(270deg, #ff9da4 40%, #ff9522 100%);
    opacity: ${({ $active }) => ($active ? 1 : 0)};
    transition: opacity 300ms ease-out;
    z-index: 1;
  }

  @media (max-width: 768px) {
    padding: 2px;
    gap: 2px;
    border-radius: 64.526px;
  }
`;

const ToggleText = styled.span<{ $active: boolean }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  margin-left: ${({ $active }) => ($active ? "11.7px" : "39.28px")};

  color: var(--Color-Foundation-base-white);
  text-align: center;
  font-feature-settings: "liga" off, "clig" off;
  font-family: NanumSquareOTF;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;

  transition: left 0.3s ease-out;

  @media (max-width: 768px) {
    font-size: 9px;
    letter-spacing: -0.3px;
    margin-left: ${({ $active }) => ($active ? "6.5px" : "21.83px")};
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
    left: ${({ active }) => (active ? "calc(100% - 22px)" : "2px")};
    width: 20px;
    height: 20px;
    box-shadow: 0px 0px 0px 0.702px rgba(0, 0, 0, 0.04), 0px 2.105px 5.614px 0px rgba(0, 0, 0, 0.15),
      0px 2.105px 0.702px 0px rgba(0, 0, 0, 0.06);
  }
`;
