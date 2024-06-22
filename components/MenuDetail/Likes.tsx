import axios from "axios";
import APIendpoint from "../../constants/constants";
import { useStateContext } from "../../hooks/ContextProvider";
import { useState } from "react";
import router from "next/router";
import styled from "styled-components";

export default function Likes({ menu }) {
  const [isLiked, setIsLiked] = useState<boolean>(menu?.is_liked);
  const [likeCount, setLikeCount] = useState<number>(menu.like_cnt);

  const isLikedImg = isLiked ? "/img/heart-on.svg" : "/img/heart-off.svg";

  const state = useStateContext();
  const { loginStatus } = state;

  const isLikedToggle = async () => {
    if (loginStatus === false) {
      router.push("/login");
    } else {
      const access_token = localStorage.getItem("access_token");
      if (isLiked === false) {
        await axios
          .post(
            `${APIendpoint()}/menus/${menu!!.id}/like`,
            {},
            { headers: { "authorization-token": `Bearer ${access_token}` } },
          )
          .then((res) => {
            setIsLiked(res.data.is_liked);
            setLikeCount(res.data.like_cnt);
          })
          .catch((res) => {
            console.log(res);
          });
      } else {
        await axios
          .post(
            `${APIendpoint()}/menus/${menu!!.id}/unlike`,
            {},
            { headers: { "authorization-token": `Bearer ${access_token}` } },
          )
          .then((res) => {
            setIsLiked(res.data.is_liked);
            setLikeCount(res.data.like_cnt);
          })
          .catch((res) => {
            console.log(res);
          });
      }
    }
  };

  return (
    <Container>
      <HeartIcon
        src={isLikedImg}
        onClick={(e) => {
          isLikedToggle();
          e.stopPropagation();
        }}
      />
      <LikesText>좋아요 {likeCount}개</LikesText>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
    margin-right: 0;
    margin-top: 12px;
  }
`;

const HeartIcon = styled.img`
  width: 21px;
  height: 21px;
  padding-left: 12px;
  cursor: pointer;
  z-index: 0;
  @media (max-width: 768px) {
    padding-left: 0;
    padding-bottom: 9px;
  }
`;

const LikesText = styled.div`
  width: max-content;
  font-size: 15px;
  line-height: 17px;
  font-weight: 400;
  display: flex;
  padding-left: 12px;
  color: #797979;

  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 16px;
    font-weight: 400;
    padding-left: 0;
    color: #000000;
  }
`;
