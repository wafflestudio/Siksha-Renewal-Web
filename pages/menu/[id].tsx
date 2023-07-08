import Header from "../../components/Header";
import styled from "styled-components";
import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

interface MenuType {
  id: number;
  restaurant_id: number;
  code: string;
  date: string;
  type: string;
  name_kr: string;
  name_en: string;
  price: number;
  etc: string[];
  created_at: string;
  updated_at: string;
  score: number;
  review_cnt: number;
}

interface ReviewType {
  id: number;
  menu_id: number;
  user_id: number;
  score: number;
  comment: string;
  etc: {};
  created_at: string;
  updated_at: string;
}

export default function Menu() {
  const router = useRouter();
  const { id } = router.query;
  const [isLoading, setLoading] = useState(false);
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [menu, setMenu] = useState<MenuType>();

  useEffect(() => {
    if (!id) {
      return;
    }

    async function fetchMenu() {
      setLoading(true);
      try {
        const res = await axios
          .get(`https://siksha-api.wafflestudio.com/menus/${id}`)
          .then((res) => {
            setMenu(res.data);
          });
      } catch (e) {
        console.log(e);
        router.push("/");
      }
      setLoading(false);
    }
    async function fetchReviews() {
      setLoading(true);
      try {
        const res = await axios
          .get(`https://siksha-api.wafflestudio.com/reviews/?menu_id=${id}&page=1&per_page=5`)
          .then((res) => {
            setReviews(res.data.result);
          });
      } catch (e) {
        console.log(e);
        router.push("/");
      }
      setLoading(false);
    }
    fetchMenu().then(() => {
      fetchReviews();
    });
  }, [id, setLoading]);

  console.log(isLoading, menu, reviews);

  return (
    <>
      {!isLoading && !!menu && (
        <Info>
          <div>
            {menu.name_kr}

            {reviews.map((review) => (
              <div key={review.id}>
                {review.comment} | {review.score}
              </div>
            ))}
          </div>
          <div>
            <div>평점: {menu.score.toFixed(1)}</div>
            <div>리뷰 수: {menu.review_cnt}</div>
          </div>
        </Info>
      )}
    </>
  );
}

const Info = styled.div`
  display: flex;
  z-index: 100;
  color: "#FF9522";
`;

const DesktopContainer = styled.div`
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileContainer = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
