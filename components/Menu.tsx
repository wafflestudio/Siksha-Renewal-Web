import styled from "styled-components";
import { formatPrice } from "../utils/FormatUtil";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Menu({ menu }) {
  const [hasPrice, setHasPrice] = useState(true);
  const [score, setScore] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (!menu.price) setHasPrice(false);
  }, [menu.price]);

  useEffect(() => {
    if (menu.score) {
      if (menu.score >= 4) setScore("high");
      else if (menu.score > 3) setScore("middle");
      else setScore("low");
    }
  }, [menu.score]);

  return (
    <Container
      onClick={() => {
        router.push(`/menu/${menu.id}`);
      }}
    >
      <MenuName>
        {menu.name_kr}
        {menu.etc && menu.etc.find((e) => e == "No meat") && <NoMeat src={"/img/no-meat.svg"} />}
      </MenuName>
      <MenuInfo>
        <Dots>.........</Dots>
        <Price hasPrice={hasPrice}>{menu.price ? formatPrice(menu.price) : "-"}</Price>
        <Rate type={score}>{menu.score ? menu.score.toFixed(1) : "-"}</Rate>
      </MenuInfo>
    </Container>
  );
}

const Container = styled.div`
  padding: 8px 0 8px 0;
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    background: #f5f5f5;
  }
  @media (max-width: 768px) {
    padding: 0 0 10px 0;
  }
`;

const MenuName = styled.div`
  font-weight: 400;
  font-size: 16px;
  color: black;
  flex: 1;
  letter-spacing: -0.3px;
  line-height: 23px;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 21px;
    padding-right: 7px;
    padding-top: 2px;
    align-items: flex-start;
    font-weight: 400;
  }
`;

const MenuInfo = styled.div`
  display: flex;
  align-items: center;
`;

const Dots = styled.div`
  font-size: 12px;
  line-height: 14px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.3);
  letter-spacing: 2px;
  padding-left: 10px;
  padding-right: 7px;

  @media (max-width: 768px) {
    padding: 0 8px 4px 0;
  }

  -ms-user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
`;

const Price = styled.div`
  font-size: 16px;
  line-height: 18px;
  font-weight: 400;
  width: 48px;
  display: flex;
  justify-content: ${(props) => (props.hasPrice ? "flex-end" : "center")};
  padding-right: 26px;

  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 16px;
    width: 45px;
    padding-right: 12px;
    padding-top: 1px;
    font-weight: 400;
  }
`;

const Rate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 20px;
  border-radius: 20px;
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  color: ${(props) => (props.type ? "white" : "black")};
  background: ${(props) =>
    props.type
      ? props.type == "high"
        ? "#F47156"
        : props.type == "middle"
        ? "#F58625"
        : "#F5B52C"
      : "white"};

  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 16px;
    width: 42px;
    height: 17.5px;
  }
`;

const NoMeat = styled.img`
  width: 19px;
  padding-left: 8px;
  padding-bottom: 2px;

  @media (max-width: 768px) {
    padding-left: 5px;
    padding-bottom: 0;
  }
`;
